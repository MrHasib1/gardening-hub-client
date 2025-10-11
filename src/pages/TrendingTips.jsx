import React, { useEffect, useState } from "react";

const TrendingTips = () => {
  const [trendingTips, setTrendingTips] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/trendingTips")
      .then((res) => res.json())
      .then((data) => setTrendingTips(data))
      .catch((err) => console.error("Error fetching trending tips:", err));
  }, []);

  return (
    <div className="my-10">
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
              <p className="text-gray-600 text-sm">
                <span className="text-black font-bold">Category:</span>{" "}
                {tip.category}
              </p>
              <p className="text-gray-700 text-sm">{tip.description}</p>
              <div className="flex justify-between items-center mt-3">
                <p className="text-green-600 font-medium">
                  <span className="text-black font-bold">Level:</span>{" "}
                  {tip.difficulty}
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
