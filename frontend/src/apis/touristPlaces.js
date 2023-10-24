import axios from "axios";
import dummyTouristResponseBigBen from "./dummyTouristResponseBigBen.json";
import dummyTouristResponseTowerBridge from "./dummyTouristResponseTowerBridge.json";

// Axios request for above curl

export const getTouristPlaces = async (latitude, longitude, name) => {
  const accessToken = "IwOgNjiKMuT0shEo5nsks4uTOtC8";
  // const accessToken = await axios
  //   .post(
  //     "https://test.api.amadeus.com/v1/security/oauth2/token",
  //     {
  //       grant_type: "client_credentials",
  //       client_id: process.env.REACT_APP_AMADEUS_API_KEY,
  //       client_secret: process.env.REACT_APP_AMADEUS_SECRET_KEY,
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       params: {
  //         grant_type: "client_credentials",
  //         client_id: process.env.REACT_APP_AMADEUS_API_KEY,
  //         client_secret: process.env.REACT_APP_AMADEUS_SECRET_KEY,
  //       },
  //     }
  //   )
  //   .then((response) => response.data?.access_token)
  //   .catch(function (error) {
  //     console.log(error);
  //     return "J48EbAZTXo4thOAYWwdqaXtmeeAE";
  //   });

  if (!accessToken) return [];

  console.log("Access token", accessToken);

  const touristPlacesResponse = await axios
    .post(
      "https://test.api.amadeus.com/v1/reference-data/locations/pois",
      {
        latitude,
        longitude,
        radius: 5,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);

      return name === "Big Ben"
        ? dummyTouristResponseBigBen
        : dummyTouristResponseTowerBridge;
    });

  console.log(touristPlacesResponse);
  return touristPlacesResponse?.data || [];
};
