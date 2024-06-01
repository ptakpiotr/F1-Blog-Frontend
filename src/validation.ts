import * as yup from "yup";

export const registerUserSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
  isRobot: yup.boolean().required(),
});

export const rateRaceSchema = yup.object({
  raceId: yup.string().required(),
  rating: yup.number().min(0).max(5).required(),
});

export const addPostSchema = yup.object({
  content: yup.string().required(),
  title: yup.string().required(),
  photo: yup.string().url().required(),
});

export type RegisterUser = yup.InferType<typeof registerUserSchema>;
export type RaceRating = yup.InferType<typeof rateRaceSchema>;
