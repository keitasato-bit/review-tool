export type RatingValue =
  | "very_satisfied"
  | "satisfied"
  | "neutral"
  | "dissatisfied"
  | "very_dissatisfied";

export type ClinicRatingQuestion = {
  id: string;
  label: string;
};

export type ClinicBrand = {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoText: string;
};

export type ClinicSurveyData = {
  id: string;
  name: string;
  reviewUrl: string;
  brand: ClinicBrand;
  ratingQuestions: ClinicRatingQuestion[];
  freeTextLabel: string;
  freeTextPlaceholder: string;
};
