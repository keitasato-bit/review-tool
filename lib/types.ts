export type ReviewOption = {
  id: string;
  label: string;
};

export type ReviewCategory = {
  id: string;
  label: string;
  options: ReviewOption[];
};

export type ShopBrand = {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoText: string;
};

export type ShopSettings = {
  tone: "polite";
  minLength: number;
  maxLength: number;
  allowFreeText: boolean;
};

export type ShopBusinessType = "seitai" | "houkan";

export type ShopData = {
  id: string;
  name: string;
  businessType: ShopBusinessType;
  reviewUrl: string;
  brand: ShopBrand;
  settings: ShopSettings;
  categories: ReviewCategory[];
};
