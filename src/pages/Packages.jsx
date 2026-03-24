// src/pages/Packages.js
import React from "react";

const Packages = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-8 max-w-7xl mx-auto text-center">
      <h1 className="font-headline text-5xl font-bold text-primary mb-6">
        Travel Packages
      </h1>
      <p className="text-on-surface-variant text-xl">
        Discover all-inclusive journeys crafted for every kind of traveler.
      </p>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface-container-high p-10 rounded-2xl">
          <h2 className="font-headline text-3xl font-bold">Coming Soon</h2>
          <p className="mt-4 text-on-surface-variant">
            New exclusive packages launching every season.
          </p>
        </div>
        <div className="bg-surface-container-high p-10 rounded-2xl">
          <h2 className="font-headline text-3xl font-bold">
            Custom Itineraries
          </h2>
          <p className="mt-4 text-on-surface-variant">
            Let our experts build your dream trip.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Packages;
