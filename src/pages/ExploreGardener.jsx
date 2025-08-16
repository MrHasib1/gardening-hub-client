import React, { use } from "react";
import { useLoaderData } from "react-router";
import GardenerCard from "./GardenerCard";

const ExploreGardener = () => {
  const Gardeners = useLoaderData();
   

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {
      Gardeners.map((Gardener) => (
        <GardenerCard key={Gardener._id} Gardener={Gardener}></GardenerCard>
      ))}
    </div>
  );
};

export default ExploreGardener;
