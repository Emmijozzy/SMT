import { useState, useCallback } from "react";
import { ValidationError } from "yup";
import { InReviewUpdateData, InReviewFeedBackData } from "../../subtaskInterface";
import { InReviewFeedBackDataSchema } from "../../subtaskSchema/InReviewFeedBackDataSchema";
import { InReviewUpdateDataSchema } from "../../subtaskSchema/InReviewUpdateDataSchema";

export const useValidation = (isTeamMember: boolean) => {
  const [error, setError] = useState<string | null>(null);

  const validateData = useCallback(
    (data: InReviewUpdateData | InReviewFeedBackData) => {
      const schema = isTeamMember ? InReviewUpdateDataSchema : InReviewFeedBackDataSchema;
      schema
        .validate(data)
        .then(() => setError(""))
        .catch((err: ValidationError) => setError(String(err.errors)));
    },
    [isTeamMember],
  );

  return { error, setError, validateData };
};
