export default function getError(error?: Error | any) {
  if (error) {
    if (typeof error === "string") return error;
    if (typeof error?.response?.data === "string") return error?.response?.data;
    if (
      error &&
      error.response &&
      error.response.errors &&
      error.response.errors[0] &&
      error.response.errors[0].message
    ) {
      return error.response.errors[0].message;
    }
  }

  return "متاسفانه خطایی رخ داد.";
}
