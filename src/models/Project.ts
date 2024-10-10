import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
  title: String,
  description: String,
  techStack: [String],
  mobileView: String,
  desktopView: String,
  link: String,
  repository: String,
});

export const Project = models.Project || model("Project", ProjectSchema);