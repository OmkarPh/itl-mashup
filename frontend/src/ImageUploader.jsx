import React, { useReducer, useRef, useState } from "react";
import { uploadImg } from "./apis/imageCDN";
import { detectPlace } from "./apis/detectPlace";

const ImageUploader = (props) => {
  const [file, setFile] = useState(null);
  const [placeName, setPlaceName] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const uploadInput = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setFile(file);
      setPlaceName(null);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // const cloudURL = "https://res.cloudinary.com/dp0ayty6p/image/upload/v1698141166/v5p50egpm2mhaudppzya.png";
      const cloudURL = await uploadImg(file);
      console.log(cloudURL);

      const newPlace = await detectPlace(cloudURL);
      console.log("New place");
      setPlaceName(newPlace.name);

      props?.updatePlace(newPlace);
    }
  };

  const handleUploadBtn = () => {
    uploadInput.current?.click();
  };

  return (
    <section className="container w-full mx-auto items-center py-32">
      <div
        className={
          (file ? "max-w-xl " : "max-w-sm ") +
          "mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center"
        }
      >
        <div className="px-4 py-6">
          <div
            id="image-preview"
            className={
              "max-w-sm p-6 mb-4 bg-gray-100 rounded-lg items-center mx-auto text-center cursor-pointer" +
              file
                ? "max-w-xl"
                : " border-dashed border-2 border-gray-400"
            }
          >
            <input
              id="upload"
              type="file"
              className="hidden"
              accept="image/*"
              ref={uploadInput}
              onChange={handleFileUpload}
            />
            {file ? (
              <>
                {placeName ? (
                  <h2 className="w-full text-center text-lg mb-5">
                    Detected Location - {placeName}
                  </h2>
                ) : (
                  <div role="status" className="w-full mb-2 text-center">
                    <span className="text-lg">Processing your query </span>
                    <svg
                      aria-hidden="true"
                      className="ml-2 w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 inline-block"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
                <img
                  src={imagePreview}
                  className="max-h-96 rounded-lg mx-auto mb-10"
                  alt="Uploaded "
                />
              </>
            ) : (
              <>
                <br />
                <label htmlFor="upload" className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-700 mx-auto mb-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                    Upload picture
                  </h5>
                  <p className="font-normal text-sm text-gray-400 md:px-6">
                    Choose photo size should be less than{" "}
                    <b className="text-gray-600">2mb</b>
                  </p>
                  <p className="font-normal text-sm text-gray-400 md:px-6">
                    and should be in{" "}
                    <b className="text-gray-600">JPG, PNG, or GIF</b> format.
                  </p>
                  <br />
                  <br />
                </label>
              </>
            )}
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full" onClick={handleUploadBtn}>
              <label className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
                <span className="text-center ml-2">Upload</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageUploader;
