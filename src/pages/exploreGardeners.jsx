import React from "react";
import {
  FaInfoCircle,
  FaLeaf,
  FaMapMarkerAlt,
  FaSeedling,
  FaUserAlt,
} from "react-icons/fa";
import { useLoaderData } from "react-router";

const ExploreGardeners = () => {
  const gardeners = useLoaderData();

  return (
    <div className="mx-auto px-4 py-5 bg-gradient-to-b from-green-50 to-green-200">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-green-700 mb-3 flex justify-center items-center gap-2 mt-2">
          <FaLeaf className="text-green-600" /> Explore Gardeners
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Meet our passionate gardening community members who are spreading
          green joy and sharing their experience to help others grow.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {gardeners.map((gardener, index) => (
          <div
            key={index}
            className="bg-white border border-green-100 rounded-xl shadow-md hover:shadow-xl 
                       transition-all duration-300 transform hover:-translate-y-2 
                       hover:bg-green-50 group"
          >
            {/* Gardener Image */}
            <div className="overflow-hidden rounded-t-xl">
              <img
                src={gardener.image}
                alt={gardener.name}
                className="h-60 w-full  rounded-t-xl transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Gardener Info */}
            <div className="p-5">
              {/* Name & Status */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-green-800">
                  {gardener.name}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    gardener.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {gardener.status.toUpperCase()}
                </span>
              </div>

              {/* Basic Info */}
              <div className="text-sm text-gray-700 space-y-1 mb-2">
                <p className="flex items-center gap-2">
                  <FaUserAlt className="text-green-600" /> {gardener.gender},{" "}
                  {gardener.age} years old
                </p>
                {gardener.location && (
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-green-600" />{" "}
                    {gardener.location}
                  </p>
                )}
              </div>

              {/* Experiences */}
              <div className="mb-3">
                <p className="font-medium text-green-700 flex items-center gap-2">
                  <FaSeedling /> Experiences:
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm ml-4 mt-1">
                  {gardener.experiences.map((exp, i) => (
                    <li key={i}>{exp}</li>
                  ))}
                </ul>
              </div>

              {/* Shared Tips & Bio */}
              <div className="mt-3 flex justify-between items-center">
                <p className="text-sm text-gray-700">
                  🌱 <span className="font-medium">Shared Tips:</span>{" "}
                  {gardener.totalSharedTips}
                </p>
                <button className="flex items-center gap-1 text-green-700 text-sm font-medium hover:text-green-900 transition cursor-pointer">
                  <FaInfoCircle /> View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreGardeners;
