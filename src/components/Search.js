import React, { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoOptions } from "../cityApi";

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({
        label: "Current location",
        value: `${latitude} ${longitude}`,
      });
    });
  }, []);

  const handleChange = (data) => {
    setSearch(data);
    onSearch(data);
  };

  const loadOptions = (input) => {
    return fetch(
      `${GEO_API_URL}/cities?namePrefix=${input}&countryIds=TR`,
      geoOptions
    )
      .then((response) => response.json())
      .then((response) => {
        if (!Array.isArray(response.data)) {
          console.error("Error: response.data is not an array");
          return { options: [] };
        }
        console.log(response.data);
        const options = response.data.map((city) => {
          return {
            label: `${city.city}`,
            value: `${city.latitude} ${city.longitude}`,
          };
        });
        if (currentLocation) {
          options.unshift(currentLocation);
        }
        return { options };
      })
      .catch((error) => {
        console.error("Error:", error);
        return { options: [] };
      });
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <AsyncPaginate
        placeholder="Search for a location"
        debounceTimeout={600}
        loadOptions={loadOptions}
        value={search}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
