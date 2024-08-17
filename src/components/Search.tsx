import React, { useState, useEffect } from 'react';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import { GroupBase } from 'react-select';
import { GEO_API_URL, geoOptions } from '../cityApi.ts';

interface SearchProps {
  onSearch: (data: { label: string; value: string }) => void;
}

interface CityOption {
  label: string;
  value: string;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [search, setSearch] = useState<CityOption | null>(null);
  const [currentLocation, setCurrentLocation] = useState<CityOption | null>(
    null
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({
        label: 'Current location',
        value: `${latitude} ${longitude}`,
      });
    });
  }, []);

  const handleChange = (data: CityOption | null) => {
    setSearch(data);
    if (data) onSearch(data);
  };

  const loadOptions: LoadOptions<CityOption, GroupBase<CityOption>, void> = (
    inputValue
  ) => {
    return fetch(
      `${GEO_API_URL}/cities?namePrefix=${inputValue}&countryIds=TR`,
      geoOptions
    )
      .then((response) => response.json())
      .then((response) => {
        if (!Array.isArray(response.data)) {
          console.error('Error: response.data is not an array');
          return { options: [] };
        }
        const options = response.data.map((city: any) => ({
          label: city.city,
          value: `${city.latitude} ${city.longitude}`,
        }));

        if (currentLocation) {
          options.unshift(currentLocation);
        }
        return { options };
      })
      .catch((error) => {
        console.error('Error:', error);
        return { options: [] };
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <AsyncPaginate
        placeholder='Search for a location'
        debounceTimeout={600}
        loadOptions={loadOptions}
        value={search}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
