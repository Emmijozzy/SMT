import { IPaginationOptions } from "../../utils/getPaginationOptions";
import { ITask, Task } from "./model/task";

export class TaskRepository {
  public async create(taskData: Partial<ITask>) {
    return await Task.create(taskData);
  }

  // Populate options for responsibleTeam and another item
  // const populateOptions = [
  //   { path: "responsibleTeam", model: "Team", select: "name teamId" },
  //   { path: "anotherItem", model: "AnotherModel", select: "field1 field2" }
  // ];

  public async findById(taskId: string, populateOptions?: { path: string; model: string; select: string }[]) {
    let query = Task.findOne({ taskId }).lean();

    if (populateOptions && populateOptions.length > 0) {
      populateOptions.forEach((option) => {
        query = query.populate(option) as typeof query;
      });
    }

    return await query.exec();
  }

  public async findAll(
    filter: Record<string, string | number | RegExp>,
    paginationOption: IPaginationOptions,
    populateOptions?: { path: string; model: string; select: string }[]
  ) {
    const { limit, sortField, skip, sortOrder } = paginationOption;
    const sort = { [sortField]: sortOrder };

    let query = Task.find(filter).limit(limit).skip(skip).sort(sort).lean();

    if (populateOptions && populateOptions.length > 0) {
      populateOptions.forEach((option) => {
        query = query.populate(option) as typeof query;
      });
    }

    return await query.exec();
  }

  public async updateById(taskId: string, data: Partial<ITask>) {
    return await Task.findOneAndUpdate({ taskId }, data, { new: true })
      .populate({
        path: "responsibleTeam",
        model: "Team",
        foreignField: "teamId",
        select: "name teamId"
      })
      .lean()
      .exec();
  }

  public async deleteById(taskId: string) {
    return await Task.findOneAndUpdate({ taskId }, { del_flg: true }, { new: true }).lean().exec();
  }

  public async restoreById(taskId: string) {
    return await Task.findOneAndUpdate({ taskId }, { del_flg: false }, { new: true }).lean().exec();
  }

  public async outrightDeleteById(taskId: string) {
    return await Task.findOneAndDelete({ taskId }).exec();
  }
}
