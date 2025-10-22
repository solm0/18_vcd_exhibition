import fs from "fs";
import path from "path";

export function readImages(id: string) {
  const dir = path.join(process.cwd(), "public", id.toLowerCase());

  let images: string[] = [];
  if (fs.existsSync(dir)) {
    images = fs
      .readdirSync(dir)
      .filter((file) => /\.(png|jpg|jpeg|gif|webp|avif)$/i.test(file))
      .map((file) => `/${id.toLowerCase()}/${file}`)
      .slice(0, 7)
  }

  return images;
}

export function readAssets(id: string) {
  const dir = path.join(process.cwd(), "public", id.toLowerCase());

  let images: string[] = [];
  if (fs.existsSync(dir)) {
    images = fs
      .readdirSync(dir)
      .filter((file) => /\.(png|jpg|jpeg|gif|webp|avif)$/i.test(file))
      .map((file) => `/${id.toLowerCase()}/${file}`)
      .slice(0, 7)
  }

  return images;
}