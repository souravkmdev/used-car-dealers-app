export interface ApiErrorDetail {
  message?: string;
  error?: string;
  [key: string]: any;
}

export interface ErrorResponse {
  status: number | string;
  data?: ApiErrorDetail;
  message?: string;
}
