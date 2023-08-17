import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import HumidityChart from "@/components/HumidityChart";
import InformationPanel from "@/components/InformationPanel";
import RainChart from "@/components/RainChart";
import StatCard from "@/components/StatCard";
import TempChart from "@/components/TempChart";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQuery";

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
    daily: string;
    hourly: string;
  };
};

const WeatherPage = async ({
  params: { city, lat, long, daily, hourly },
}: Props) => {
  const client = getClient();
  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: "GMT",
      daily: daily,
      hourly: hourly,
    },
  });
  const results: Root = data.myQuery;

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <InformationPanel city={city} lat={lat} long={long} results={results} />
      <div className="flex-1 p-5 lg:p-10">
        <div className="p-4">
          <div className="pb-5">
            <h2 className="text-xl font-bold">
              <span className="text-3xl text-sky-700">More</span> awaits you to discover...
            </h2>
            <p className="text-sm text-gray-400">
              Last Updated at:{""}
              {new Date(results.current_weather.time).toLocaleString()} (
              {results.timezone})
            </p>
          </div>

          <div className="m-2 mb-10">
            <CalloutCard message={"Hey! Welcome to SkyScanner!"} />
          </div>
          <div className="grid grid-cols-1 gap-5 m-2 xl:grid-cols-2">
            <StatCard
              title="Maximum Temperature"
              metric={`${results.daily.apparent_temperature_max[0].toFixed(
                1
              )}°`}
              color="yellow"
            />

            <StatCard
              title="Minimum Temperature"
              metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°`}
              color="green"
            />

            <div>
              <StatCard
                title="UV Index"
                metric={results.daily.uv_index_max[0].toFixed(1)}
                color="rose"
              />
              {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  message="High UV Index. Please wear sunscreen."
                  warning
                />
              )}
            </div>

            <div className="flex space-x-3">
              <StatCard
                title="Wind Speed"
                metric={`${results.current_weather.windspeed.toFixed(1)}m/s`}
                color="cyan"
              />
              <StatCard
                title="Wind Direction"
                metric={`${results.current_weather.winddirection.toFixed(1)}°`}
                color="violet"
              />
            </div>
          </div>
          <hr className="my-5" />
          <div className="space-y-3">
            <TempChart results={results} />
            <RainChart results={results} />
            <HumidityChart results={results} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
