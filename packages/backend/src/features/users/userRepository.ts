import { IPaginationOptions } from "utils/getPaginationOptions";
import { IUser, User } from "../../features/auth/authModel";

export class UserRepository {
  public async create(userData: Partial<IUser>) {
    return await User.create(userData);
  }

  public async findById(userId: string) {
    return await User.findOne({ userId }).select("-password").lean().exec();
  }

  public async findUserWithPasswordById(userId: string) {
    return await User.findOne({ userId }).lean().exec();
  }

  public async findByEmail(email: string) {
    return await User.findOne({ email }).select("-password").lean().exec();
  }

  public async findAll(filter: Record<string, string | number | RegExp>, paginationOption: IPaginationOptions) {
    const { limit, sortField, skip, sortOrder } = paginationOption;
    const sort = { [sortField]: sortOrder };
    return await User.find(filter).limit(limit).skip(skip).sort(sort).select("-password").lean().exec();
  }

  public async updateById(userId: string, data: IUser | Record<string, string | object>) {
    return await User.findOneAndUpdate({ userId }, data, { new: true }).select("-password").lean().exec();
  }

  public async deleteById(userId: string) {
    return await User.findOneAndUpdate({ userId }, { del_flg: true }, { new: true }).select("-password").lean().exec();
  }

  public async restoreById(userId: string) {
    return await User.findOneAndUpdate({ userId }, { del_flg: false }, { new: true }).select("-password").lean().exec();
  }

  public async outrightDeleteById(userId: string) {
    return await User.findOneAndDelete({ userId }).exec();
  }
}
