/**
 * Image Optimization Script
 * Run this script to compress images in the public folder
 * Usage: bun run optimize:images
 */

import { existsSync, mkdirSync, readdirSync, statSync, renameSync } from "fs";
import { join, extname, dirname, relative } from "path";
import sharp from "sharp";

const PUBLIC_DIR = join(process.cwd(), "public");
const BACKUP_DIR = join(process.cwd(), ".image-backup");

// Supported image extensions
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

// Quality settings
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;

function getImageFiles(dir: string, files: string[] = []): string[] {
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (
      stat.isDirectory() &&
      item !== "fonts" &&
      item !== "favicon" &&
      item !== ".image-backup"
    ) {
      getImageFiles(fullPath, files);
    } else if (stat.isFile()) {
      const ext = extname(item).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

async function optimizeImages() {
  console.log("🖼️  Image Optimization Script\n");
  console.log("Finding images to optimize...\n");

  const imageFiles = getImageFiles(PUBLIC_DIR);

  if (imageFiles.length === 0) {
    console.log("No images found to optimize.");
    return;
  }

  console.log(`Found ${imageFiles.length} images to optimize:\n`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const imagePath of imageFiles) {
    const ext = extname(imagePath).toLowerCase();
    const originalSize = statSync(imagePath).size;
    totalOriginalSize += originalSize;

    console.log(`Processing: ${relative(PUBLIC_DIR, imagePath)}`);
    console.log(`  Original size: ${formatBytes(originalSize)}`);

    try {
      let optimizedBuffer: Buffer;

      if (ext === ".jpg" || ext === ".jpeg") {
        optimizedBuffer = await sharp(imagePath)
          .jpeg({ quality: JPEG_QUALITY, progressive: true })
          .toBuffer();
      } else if (ext === ".png") {
        optimizedBuffer = await sharp(imagePath)
          .png({ quality: PNG_QUALITY, compressionLevel: 9 })
          .toBuffer();
      } else {
        console.log(`  ⏭️  Skipped (unsupported format)`);
        continue;
      }

      const optimizedSize = optimizedBuffer.length;
      totalOptimizedSize += optimizedSize;

      // Only save if we actually reduced the size
      if (optimizedSize < originalSize) {
        // Create backup directory structure
        const relativePath = relative(PUBLIC_DIR, imagePath);
        const backupPath = join(BACKUP_DIR, relativePath);
        const backupDir = dirname(backupPath);

        if (!existsSync(backupDir)) {
          mkdirSync(backupDir, { recursive: true });
        }

        // Backup original
        renameSync(imagePath, backupPath);

        // Write optimized file
        await sharp(optimizedBuffer).toFile(imagePath);

        const savings = (
          ((originalSize - optimizedSize) / originalSize) *
          100
        ).toFixed(1);
        console.log(
          `  Optimized size: ${formatBytes(
            optimizedSize
          )} (${savings}% smaller)`
        );
        console.log(`  ✅ Optimized successfully`);
      } else {
        totalOptimizedSize = totalOptimizedSize - optimizedSize + originalSize;
        console.log(`  ⏭️  Skipped (already optimized)`);
      }
    } catch (error) {
      console.error(`  ❌ Failed to optimize:`, error);
      totalOptimizedSize += originalSize;
    }

    console.log("");
  }

  console.log("═".repeat(50));
  console.log("📊 Summary:");
  console.log(`  Total original size: ${formatBytes(totalOriginalSize)}`);
  console.log(`  Total optimized size: ${formatBytes(totalOptimizedSize)}`);
  const totalSavings = (
    ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) *
    100
  ).toFixed(1);
  console.log(
    `  Total savings: ${formatBytes(
      totalOriginalSize - totalOptimizedSize
    )} (${totalSavings}%)`
  );
  console.log("");
  console.log("✨ Image optimization complete!");
  console.log(`📁 Original images backed up to: ${BACKUP_DIR}`);
}

optimizeImages();
