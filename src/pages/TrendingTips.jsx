import React, { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";

const TrendingTips = () => {
  const [trendingTips, setTrendingTips] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);

  //Fetch trending tips
  useEffect(() => {
    fetch("http://localhost:3000/trendingTips")
      .then((res) => res.json())
      .then((data) => setTrendingTips(data))
      .catch((err) => console.error("Error fetching trending tips:", err));
  }, []);

  //Fetch total likes from browseTips
  useEffect(() => {
    fetch("http://localhost:3000/browseTips")
      .then((res) => res.json())
      .then((data) => {
        //
        const total = data.reduce((sum, tip) => sum + (tip.totalLiked || 0), 0);
        setTotalLikes(total);
      })
      .catch((err) => console.error("Error fetching total likes:", err));
  }, []);

  return (
    <div className="my-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center my-5 text-green-700">
        🌿 Top Trending Tips 🌿
      </h1>

      {/* total Likes Display */}
      <div className="flex justify-center items-center gap-3 mb-8">
        <h2 className="text-2xl text-green-400">Total Likes from All Users:</h2>
        <div className="flex items-center gap-2 text-gray-600 text-2xl font-bold">
          <BiSolidLike className="text-3xl" />
          <span className="text-black"> {totalLikes}</span>
        </div>
      </div>

      {/* Trending Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
        {trendingTips.map((tip, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-xl border border-green-200 hover:shadow-2xl transition-all"
          >
            <figure>
              <img
                src={tip.image}
                alt={tip.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-green-700">{tip.title}</h2>
              <p className="  text-sm">
                <span className=" font-bold">Category:</span> {tip.category}
              </p>
              <p className="  text-sm">{tip.description}</p>
              <div className="flex justify-between items-center mt-3">
                <p>
                  <span className=" font-bold">Level:</span>{" "}
                  <span className="text-green-600 font-medium">
                    {tip.difficulty || tip.level}
                  </span>
                </p>
                <p className="text-green-600 font-medium">
                  ❤️ {tip.totalLiked}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTips;
