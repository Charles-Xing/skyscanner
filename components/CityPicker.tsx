"use client";

import { useState } from "react";
//The useRouter hook should be imported from next/navigation and not next/router when using the App Router
import { useRouter } from "next/navigation";
import { Country, City } from "country-state-city";
import Select from "react-select";

import { GlobeIcon } from "@heroicons/react/solid";

type CountryOption = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

type CityOption = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
} | null;

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

const CityPicker = () => {
  // the state to track the user's input
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(null);
  const [selectedCity, setSelectedCity] = useState<CityOption>(null);

  const router = useRouter();

  const handleSelectedCountry = (option: CountryOption) => {
    setSelectedCountry(option);
    // Clear the selected city after reselecting the country
    setSelectedCity(null);
  };

  const handleSelectedCity = (option: CityOption) => {
    setSelectedCity(option);
    router.push(
      `/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-white/80">
          <GlobeIcon className="w-5 h-5 text-white" />
          <label htmlFor="country">Country</label>
        </div>
        <Select
          value={selectedCountry}
          onChange={handleSelectedCountry}
          options={options}
        />
      </div>

      {selectedCountry && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-white/80">
            <GlobeIcon className="w-5 h-5 text-white" />
            <label htmlFor="country">City</label>
          </div>
          <Select
            value={selectedCity}
            onChange={handleSelectedCity}
            options={City.getCitiesOfCountry(
              selectedCountry.value.isoCode
            )?.map((city) => ({
              value: {
                latitude: city.latitude!,
                longitude: city.longitude!,
                countryCode: city.countryCode,
                name: city.name,
                stateCode: city.stateCode,
              },
              label: city.name,
            }))}
          />
        </div>
      )}
    </div>
  );
};

export default CityPicker;
