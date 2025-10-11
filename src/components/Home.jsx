import React from "react";
import Banner from "./Banner";
import FeatureGardeners from "../pages/FeatureGardeners";
import TrendingTips from "../pages/TrendingTips";
import PlantGuideSection from "../pages/PlantGuideSection";
import FlowerGarden from "./FlowerGarden";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="bg-green-50 py-5">
        <h1 className="text-3xl md:text-4xl font-bold text-center  text-green-700 my-2">
          🌿 Feature Gardeners 🌿
        </h1>
        <FeatureGardeners></FeatureGardeners>
        <h1 className="text-3xl md:text-4xl font-bold text-center my-5 text-green-700">
          🌿 Top Trending Tips 🌿
        </h1>

        <TrendingTips></TrendingTips>

        {/* extra section */}
        <PlantGuideSection></PlantGuideSection>

        <FlowerGarden></FlowerGarden>
      </div>
    </div>
  );
};

export default Home;
