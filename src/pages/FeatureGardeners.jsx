import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import GardenerCard from "./GardenerCard";
import Loading from "../components/Loading";

const FeatureGardeners = () => {
  const Gardeners = useLoaderData();
  // console.log(Gardeners);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(Gardeners)) {
      setLoading(false);
    }
  }, [Gardeners]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 bg-gradient-to-b from-green-50 to-green-100">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
        <p className="text-green-700 font-semibold text-lg animate-pulse">
          Loading Green Data...
        </p>
      </div>
    );
  }

  if (!Array.isArray(Gardeners)) {
    return (
      <div className="text-center text-red-600">Failed to load gardeners</div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-5">
      {Gardeners.map((Gardener) => (
        <GardenerCard key={Gardener._id} Gardener={Gardener} />
      ))}
    </div>
  );
};

export default FeatureGardeners;
