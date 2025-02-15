/* eslint-disable indent */
import * as Yup from "yup";

export const InReviewUpdateDataSchema = Yup.object().shape({
  comment: Yup.string().required("Comment is required"),

  checkLists: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required("Checklist ID is required"),
      checkItem: Yup.string().required("Check item is required"),
      isChecked: Yup.boolean().required("isChecked is required").oneOf([true], "All checklists must be checked"),
      isApprove: Yup.boolean().required("isApprove is required"),
      isReject: Yup.boolean().required("isReject is required"),
    }),
  ),

  requiredFields: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required("Field ID is required"),
      field: Yup.string().required("Field name is required"),
      // eslint-disable-next-line prettier/prettier, func-names
        input: Yup.string().test("required-field", "", function(value) {
        return value
          ? true
          : this.createError({
              message: `"${(this.parent as { field: string }).field}" is yet to be filed`,
            });
      }),
      // eslint-disable-next-line prettier/prettier
        type: Yup.string().required("Type is required").oneOf(["text", "link"], "Type must be either \"text\" or \"link\"")
    }),
  ),
});
