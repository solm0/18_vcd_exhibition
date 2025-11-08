import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Type for Cloudinary resource array
interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  folder: string;
}

interface CloudinaryFolder {
  name: string;
  path: string;
  // other optional props
}

/**
 * Read all assets for a team ID, sorted by work_x naming
 */
export async function readAssets(id: string): Promise<string[]> {
  const folder = id.toLowerCase();

  const resourceTypes: Array<'image' | 'video' | 'raw'> = ['image', 'video', 'raw'];

  // 각각의 타입별로 Cloudinary API 호출
  const results = await Promise.all(
    resourceTypes.map((type) =>
      cloudinary.api.resources({
        type: 'upload',
        resource_type: type,
        prefix: folder + '/',
        max_results: 500,
      })
    )
  );

  // 모든 리소스 합치기
  const allResources = results.flatMap((r) => r.resources as CloudinaryResource[]);

  // work_x 파일만 필터링하고 정렬
  const workAssets = allResources
    .filter((res) => {
      const filename = res.public_id.split('/').pop() || '';
      return filename.startsWith('work_');
    })
    .sort((a, b) => {
      const nameA = a.public_id.split('/').pop() || '';
      const nameB = b.public_id.split('/').pop() || '';
      const numA = parseInt(nameA.replace(/^work_/, '').split('.')[0]);
      const numB = parseInt(nameB.replace(/^work_/, '').split('.')[0]);
      return numA - numB;
    })
    .map((res) => res.secure_url);

  return workAssets;
}

/**
 * List subfolders in a team folder
 */
export async function readFolders(id: string): Promise<string[]> {
  const folder = id.toLowerCase();

  const result = await cloudinary.api.sub_folders(folder);
  const folders: CloudinaryFolder[] = result.folders;

  return folders.map((f) => f.name);
}

/**
 * Read assets in a specific book/subfolder
 */
export async function readAssetsInBook(id: string, book: string): Promise<string[]> {
  const folder = `${id.toLowerCase()}/${book}`;

  const resources = await cloudinary.api.resources({
    type: "upload",
    prefix: folder + "/",
    resource_type: "image",
    max_results: 500,
  });

  return (resources.resources as CloudinaryResource[]).map((res) => res.secure_url);
}