import { EHttpStatus } from "~/constant/statusCode";

export type TError = {
  statusCode: EHttpStatus;
  message: string;
  data: string | unknown[] | unknown | null;
};
