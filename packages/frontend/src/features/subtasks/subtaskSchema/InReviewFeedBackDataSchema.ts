import * as Yup from "yup";

export const InReviewFeedBackDataSchema = Yup.object().shape({
  feedback: Yup.string().required("Feedback is required"),

  checkLists: Yup.array().of(
    Yup.object()
      .shape({
        id: Yup.string().required("Checklist ID is required"),
        checkItem: Yup.string().required("Check item is required"),
        isChecked: Yup.boolean().required("isChecked is required").oneOf([true], "isChecked must be true"),
        isApprove: Yup.boolean().required("isApprove is required"),
        isReject: Yup.boolean().required("isReject is required"),
      })
      .test(
        "approve-reject-validation",
        "isApprove and isReject cannot both be true",
        (value) => !(value.isApprove && value.isReject), // Ensure both are not true
      )
      .test(
        "one-must-be-true",
        "Checklist yet to be approved or rejected",
        (value) => value.isApprove || value.isReject, // Ensure at least one is true
      ),
  ),

  requiredFields: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required("Field ID is required"),
      field: Yup.string().required("Field name is required"),
      input: Yup.string().required("Input is required"),
      // eslint-disable-next-line prettier/prettier
      type: Yup.string().required("Type is required").oneOf(["text", "link"], "Type must be either \"text\" or \"link\"")
    }),
  ),
});
