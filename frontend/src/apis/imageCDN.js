import axios from "axios";

export async function uploadImg(file) {
  console.log("File", file);
  // const fileExtension = file.name.split('.').pop() || "jpg";
  // const randFileName = uuidv4() + '.' + fileExtension;

  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", "nftmarketplace");
  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dp0ayty6p/image/upload",
    body
  );
  return res.data.secure_url;
}
