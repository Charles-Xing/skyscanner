import Image from "next/image";
import CityPicker from "./CityPicker";
import weatherCodeToString, { WeatherCode } from "@/lib/weatherCodeToString";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

interface InformationPanelProps {
  city: string;
  lat: string;
  long: string;
  results: Root;
}

const InformationPanel: React.FC<InformationPanelProps> = ({
  city,
  lat,
  long,
  results,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#394F68] to-[#183B7E] p-10 text-white">
      <div className="pb-5">
        <h1 className="text-6xl font-bold">{decodeURI(city)}</h1>
        <p className="my-3 text-xs text-gray-400">
          Long/Lat: {long}, {lat}
        </p>
      </div>
      <div className="text-black">
        <CityPicker />
      </div>
      <hr className="my-10" />
      <div className="flex items-center justify-between mt-5 space-x-10">
        <div>
          <p className="text-xl">
            {new Date().toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="font-extralight">
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>
        <p className="text-xl font-bold uppercase">
          {new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
      </div>
      <hr className="mt-10 mb-5" />
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${
              weatherCodeToString(
                results.current_weather.weathercode as WeatherCode
              )?.icon
            }.png`}
            alt={
              weatherCodeToString(
                results.current_weather.weathercode as WeatherCode
              )!.label
            }
            width={75}
            height={75}
          />
          <p className="font-extralight">
            {
              weatherCodeToString(
                results.current_weather.weathercode as WeatherCode
              )?.label
            }
          </p>
          <p className="mt-8 text-6xl font-semibold">
            {results.current_weather.temperature.toFixed(1)}°C
          </p>
        </div>
        <Image
          alt="cartoon people"
          src={
            results.current_weather.temperature < 10
              ? "/picture04.png"
              : results.current_weather.temperature < 20
              ? "/picture03.png"
              : results.current_weather.temperature < 30
              ? "/picture01.png"
              : "/picture02.png"
          }
          height={75}
          width={150}
        />
      </div>
      <div className="py-5 space-y-2">
        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
          <SunIcon className="w-10 h-10 text-gray-400" />
          <div className="flex items-center justify-between flex-1">
            <p className="font-extralight">Sunrise</p>
            <p className="text-2xl uppercase">
              {new Date(results.daily.sunrise[0]).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
          <MoonIcon className="w-10 h-10 text-gray-400" />
          <div className="flex items-center justify-between flex-1">
            <p className="font-extralight">Sunset</p>
            <p className="text-2xl uppercase">
              {new Date(results.daily.sunset[0]).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationPanel;
