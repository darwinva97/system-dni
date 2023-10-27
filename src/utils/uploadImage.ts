export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "systemdni");
  const uploadedImageData = (await fetch(
    "https://api.cloudinary.com/v1_1/dpcglvg6o/image/upload",
    {
      method: "POST",
      body: formData,
    },
  ).then((r) => r.json())) as { secure_url: string };
  return uploadedImageData.secure_url;
};
