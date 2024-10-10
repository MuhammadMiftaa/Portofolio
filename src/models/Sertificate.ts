import { isAscii } from "buffer";
import { Schema, model, models } from "mongoose";

const SertificateSchema = new Schema({
  title: String,
  program: String,
  date: String,
  validUntil: String,
  isActive: Boolean,
  image: String,
});

export const Sertificate = models.Sertificate || model("Sertificate", SertificateSchema);