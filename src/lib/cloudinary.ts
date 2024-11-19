export async function uploadToCloudinary(file: File, folder?: string) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration is missing");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  if (folder) formData.append("folder", folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(
      `Cloudinary upload failed: ${JSON.stringify(errorDetails)}`
    );
  }

  return await response.json();
}
