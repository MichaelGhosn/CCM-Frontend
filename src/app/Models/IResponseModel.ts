export interface IResponseModel<T> {
  success: boolean;
  data: T;
  description: string;
}
