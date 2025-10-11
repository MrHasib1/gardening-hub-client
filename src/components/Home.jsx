import React from "react";
import Banner from "./Banner";
import FeatureGardeners from "../pages/FeatureGardeners";
import TrendingTips from "../pages/TrendingTips";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <h1 className="text-3xl md:text-4xl font-bold text-center my-5 text-green-700">🌿 Feature Gardeners 🌿</h1>
      <FeatureGardeners></FeatureGardeners>
      <h1 className="text-3xl md:text-4xl font-bold text-center my-5 text-green-700">🌿 Top Trending Tips 🌿</h1>
      
      <TrendingTips></TrendingTips>

    </div>
  );
};

export default Home;
