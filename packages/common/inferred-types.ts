import { z } from "zod";
// import { TrainModel, GenerateImage, GenerateImageFromPack } from "./types";
import {
  TrainModel,
  GenerateImage,
  GenerateImageFromPack,
  // TypeEnum,
  // EthnicityEnum,
  // EyeColorEnum,
} from "./types";

export type TrainModelInput = z.infer<typeof TrainModel>;
export type GenerateImageInput = z.infer<typeof GenerateImage>;
export type GenerateImageFromPackInput = z.infer<typeof GenerateImageFromPack>;

// // Infer enum types
// export type TypeOptions = z.infer<typeof TypeEnum>;
// export type EthnicityOptions = z.infer<typeof EthnicityEnum>;
// export type EyeColorOptions = z.infer<typeof EyeColorEnum>;

// // Export enum values for use in components
// export const TYPE_OPTIONS = TypeEnum.options;
// export const ETHNICITY_OPTIONS = EthnicityEnum.options;
// export const EYE_COLOR_OPTIONS = EyeColorEnum.options;
