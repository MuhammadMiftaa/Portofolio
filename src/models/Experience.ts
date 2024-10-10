import { Schema, model, models } from "mongoose";

const ExperienceSchema = new Schema({
  title: String,
  company: String,
  companyLogo: String,
  location: String,
  startDate: String,
  endDate: String,
  techStack: [String],
  jobdesk: [String],
});

export const Experience = models.Experience || model("Experience", ExperienceSchema);