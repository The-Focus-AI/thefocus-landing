const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "src", "images");

// Read all files in the images directory
fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error("Error reading images directory:", err);
    return;
  }

  // Process each image file
  files.forEach((file) => {
    // Skip files that already end with _small.jpg
    if (file.endsWith("_small.jpg")) {
      return;
    }

    console.log(`Processing ${file}`);

    const inputPath = path.join(imagesDir, file);

    // Generate output filename by inserting _small before extension
    const parsedFile = path.parse(file);
    const outputFile = `${parsedFile.name}_small.jpg`;
    const outputPath = path.join(imagesDir, outputFile);

    // Compress and convert to jpg
    sharp(inputPath)
      .jpeg({
        quality: 80, // Adjust quality (0-100)
        chromaSubsampling: "4:4:4",
      })
      .resize(1920, 1080, {
        fit: "inside", // Maintain aspect ratio
        withoutEnlargement: true, // Don't enlarge smaller images
      })
      .toFile(outputPath)
      .then(() => {
        console.log(`Compressed ${file} -> ${outputFile}`);
      })
      .catch((err) => {
        console.error(`Error processing ${file}:`, err);
      });
  });
});
