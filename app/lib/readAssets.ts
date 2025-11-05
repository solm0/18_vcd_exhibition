// import fs from "fs";
// import path from "path";

// export function readAssets(id: string) {
//   const dir = path.join(process.cwd(), "public", id.toLowerCase());

//   let images: string[] = [];
//   if (fs.existsSync(dir)) {
//     images = fs
//       .readdirSync(dir)
//       .sort((a, b) => {
//         const numA = parseInt(a.replace(/^work_/, "").split(".")[0]);
//         const numB = parseInt(b.replace(/^work_/, "").split(".")[0]);
//         return numA - numB;
//       })
//       .map((file) => `/${id.toLowerCase()}/${file}`)
//   }

//   return images;
// }

// export function readFolders(id: string) {
//   const dir = path.join(process.cwd(), "public", id.toLowerCase());

//   if (!fs.existsSync(dir)) return [];

//   const folders = fs
//     .readdirSync(dir, { withFileTypes: true })
//     .filter((entry) => entry.isDirectory()) // only folders
//     .map((entry) => entry.name);

//   return folders; // e.g. ['book1', 'book2', 'book3']
// }

// export function readAssetsInBook(id: string, book: string) {
//   const dir = path.join(process.cwd(), "public", id.toLowerCase(), book);

//   if (!fs.existsSync(dir)) return [];

//   return fs
//     .readdirSync(dir)
//     .map((file) => `/${id.toLowerCase()}/${book}/${file}`);
// }