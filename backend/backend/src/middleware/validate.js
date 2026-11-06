import { HttpError } from "../utils/httpError.js";

export function validate(_schema) {
  return (_request, _response, next) => {
    next(new HttpError(501, "Validation adapter is not configured yet"));
  };
}
