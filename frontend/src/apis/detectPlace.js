import axios from "axios";
import dummyResponse from "./dummyPlaceResponse.json";

const API_KEY = process.env.REACT_APP_EDEN_API_KEY;

export const detectPlace = async (imageUrl) => {
  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/image/landmark_detection",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    data: {
      show_original_response: false,
      providers: "google",
      fallback_providers: "microsoft",
      file_url: imageUrl,
    },
  };
  const response = await axios.request(options).catch((error) => {
    console.error(error);
  });
  // const response = { data: dummyResponse };
  console.log(response?.data);
  const placesDetected = (response?.data?.google || response?.data?.microsoft)
    .items;
  if (!placesDetected || !placesDetected?.length)
    return {
      name: "Not available in free tier dataset",
      imageUrl,
      latitude: 51.5074,
      longitude: -0.1278,
    };
    
  const bestMatchedPlace = placesDetected[0];

  return {
    name: bestMatchedPlace.description,
    imageUrl,
    latitude: Number(bestMatchedPlace.locations[0].lat_lng.latitude.toFixed(5)),
    longitude: Number(
      bestMatchedPlace.locations[0].lat_lng.longitude.toFixed(5)
    ),
  };
};
