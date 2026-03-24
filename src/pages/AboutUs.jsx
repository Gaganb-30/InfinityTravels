// src/pages/AboutUs.js
import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-8 max-w-7xl mx-auto text-center">
      <h1 className="font-headline text-5xl font-bold text-primary mb-6">
        About Infinity Miles Travel
      </h1>
      <p className="text-on-surface-variant text-xl max-w-3xl mx-auto">
        We are a team of passionate travel experts dedicated to crafting
        unforgettable journeys. With local knowledge and a commitment to
        sustainable luxury, we turn wanderlust into reality.
      </p>
      <div className="mt-16 flex flex-wrap justify-center gap-8">
        <div className="bg-surface-container-low p-6 rounded-2xl w-64">
          <span className="material-symbols-outlined text-5xl text-primary">
            diversity_3
          </span>
          <h3 className="font-bold text-xl mt-4">50+ Experts</h3>
        </div>
        <div className="bg-surface-container-low p-6 rounded-2xl w-64">
          <span className="material-symbols-outlined text-5xl text-primary">
            globe
          </span>
          <h3 className="font-bold text-xl mt-4">35+ Countries</h3>
        </div>
        <div className="bg-surface-container-low p-6 rounded-2xl w-64">
          <span className="material-symbols-outlined text-5xl text-primary">
            favorite
          </span>
          <h3 className="font-bold text-xl mt-4">10k+ Happy Travelers</h3>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
