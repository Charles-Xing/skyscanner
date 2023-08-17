"use client";

import CityPicker from "@/components/CityPicker";
import { Card, Divider, Subtitle, Text } from "@tremor/react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#394F68] to-[#183B7E] p-10 flex flex-col justify-center">
      <Card className="max-w-4xl mx-auto bg-slate-50">
        <Text className="mb-10 text-5xl font-bold text-center">SkyScanner</Text>
        <Subtitle className="text-xl text-center">
          <p>Unveiling Weather Wonders:</p>
          <p>Witness the World, Perceive the Universe, Embrace the Earth</p>
        </Subtitle>
        <Divider className="my-10 bg-sky-500" />
        <Card className="bg-gradient-to-br from-[#394F68] to-[#183B7E] ">
          <CityPicker />
        </Card>
      </Card>
    </main>
  );
}
