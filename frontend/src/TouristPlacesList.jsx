import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TouristPlaceList = ({ touristPlaces }) => {
  const [placeImages, setPlaceImages] = useState({});

  // Function to fetch image URLs for places
  const fetchPlaceImages = async () => {
    const imagePromises = {};

    touristPlaces.forEach((place) => {
      const placeName = place.name;
      imagePromises[placeName] = axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: placeName,
          per_page: 1,
        },
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`
        },
      });
    });

    try {
      const responses = await Promise.all(Object.values(imagePromises));

      responses.forEach((response, index) => {
        const placeName = touristPlaces[index].name;
        const imageUrl = response.data.results[0]?.urls.full;
        console.log('Fetched image URL for', placeName, ':', imageUrl);
        setPlaceImages((prevImages) => ({
          ...prevImages,
          [placeName]: imageUrl,
        }));
      });
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchPlaceImages();
  }, [touristPlaces]);

  return (
    <div className="bg-gray-900 text-white px-4">
      <h2 className="text-3xl font-semibold mb-6 text-center">Tourist Places</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-h-[80vh] overflow-y-scroll">
        {touristPlaces.map((place) => (
          <div
            key={place.id}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition transform hover:scale-105"
          >
            <img
              src={placeImages[place.name] || 'default-image-url.jpg'} // Use the fetched image URL, or provide a default if not found
              alt={place.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
              <p className="text-gray-400 mb-2">Category: {place.category}</p>
              <p className="text-gray-400 mb-2">Rank: {place.rank}</p>
              <p className="text-gray-400 mb-2">Tags: {place.tags.join(', ')}</p>
              <a
                href={place.self.href}
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                More Info
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TouristPlaceList;
