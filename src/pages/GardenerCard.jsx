import React from "react";
import { FaStar, FaMapMarkerAlt, FaLeaf } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const GardenerCard = ({ Gardener }) => {
  const { name, location, rating, specialty, status, image } = Gardener;

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border p-5 border-gray-200 rounded-xl">
      <figure className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        {status === "active" && (
          <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
            Active
          </span>
        )}
      </figure>

      <div className="card-body p-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          {name}
          {status === "active" && <MdVerified className="text-green-500" />}
        </h2>

        <p className="flex items-center   text-sm gap-2 mt-2">
          <FaMapMarkerAlt className="text-red-500" /> {location}
        </p>

        <p className="flex items-center   text-sm gap-2">
          <FaLeaf className="text-green-600" /> <span className="font-bold">Specialty:</span>{" "}
          <span className="font-medium text-green-500">{specialty}</span>
        </p>

        <div className="flex items-center gap-2 mt-3">
          <div className="badge badge-warning gap-1 text-white">
            <FaStar /> {rating}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenerCard;
