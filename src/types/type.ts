export type StripeSessionState = {
  status: string;
  error: string;
  redirectUrl?: string;
};

export type GenerateImageState = {
  imageUrl?: string;
  keyword?: string;
};