import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
  title: String,
  description: String,
  techStack: [String],
  mobileViewImage: String,
  webViewImage: String,
  url: String,
  githubLink: String,
});

export const Project = models.Project || model("Project", ProjectSchema);