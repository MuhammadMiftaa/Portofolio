import { isAscii } from "buffer";
import { Schema, model, models } from "mongoose";

const CertificateSchema = new Schema({
  title: String,
  program: String,
  date: String,
  validUntil: String,
  isActive: Boolean,
  image: String,
});

export const Certificate = models.Certificate || model("Certificate", CertificateSchema);