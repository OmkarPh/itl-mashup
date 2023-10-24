import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import { getTouristPlaces } from "./apis/touristPlaces";
import TouristPlaceList from "./TouristPlacesList";

const App = () => {
  const [touristPlaces, setTouristPlaces] = useState(null);

  function updatePlace(place) {
    console.log("Find surrounding spots around ", place);
    getTouristPlaces(place.latitude, place.longitude, place.name).then((places) => {
      console.log(places);
      setTouristPlaces(places);
    });
  }
  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="grid max-w-screen-xl px-2 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-6">
          {touristPlaces ? (
            <TouristPlaceList touristPlaces={touristPlaces} />
          ) : (
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Upload image {"->"}
            </h1>
          )}
        </div>
        <div className="hidden lg:mt-0 lg:col-span-6 lg:flex">
          <ImageUploader updatePlace={updatePlace} />
        </div>
      </div>
    </section>
  );
};

export default App;
