import { model, models, Schema } from "mongoose";

const TechSchema = new Schema({
  name: String,
  logo: String,
});

export const Tech = models.Tech || model("Tech", TechSchema);
