import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { FaSeedling, FaEye, FaFilter } from "react-icons/fa";

const BrowseTips = () => {
  const tipsData = useLoaderData();
  const navigate = useNavigate();

  const [tips, setTips] = useState(tipsData);

  const handleFilter = async (e) => {
    const level = e.target.value;
    console.log(level);

    let url = level
      ? `http://localhost:3000/browseTips?level=${level}`
      : "http://localhost:3000/browseTips";

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setTips(data);
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-200 min-h-screen py-10 px-5">
      {/* 🌼 Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-green-700 mb-3 flex justify-center items-center gap-2">
          <FaSeedling className="text-green-600" /> Browse Gardening Tips
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Discover valuable plant care tips shared by our gardening community.
          Only <span className="text-green-700 font-medium">public tips</span>{" "}
          are shown here. Filter garden tips by difficulty level if you want to
          see click and shortcut way to see tips.
        </p>
      </div>

      <div className="flex justify-center items-center text-center gap-2 mb-5">
        <label className="label-text font-semibold">Select an difficulty</label>
        <FaFilter className="text-2xl"></FaFilter>
        <fieldset className="fieldset">
          <select
            onChange={handleFilter}
            defaultValue=""
            name="level"
            className="select select-bordered w-full focus:border-green-500"
          >
            <option value="" disabled>
              All Levels
            </option>
            <option value="easy">Easy</option>
            <option value="medium ">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </fieldset>
      </div>

      {/* 🌿 Table Section */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-green-200">
        <table className="table w-full">
          {/* Table Header */}
          <thead className="bg-cyan-300 text-green-800">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Level</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-pink-100">
            {tips.length > 0 ? (
              tips.map((tip, index) => (
                <tr
                  key={tip._id}
                  className="hover:bg-gray-200 transition-all duration-200"
                >
                  <td className="font-medium">{index + 1}</td>

                  {/* Image */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask rounded-2xl h218 w-28">
                          <img
                            src={tip.image}
                            alt={tip.title}
                            className="hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Title */}
                  <td className="font-semibold text-green-800">{tip.title}</td>

                  {/* Category */}
                  <td className="capitalize text-gray-700">{tip.category}</td>

                  {/* Level */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        tip.level === "easy"
                          ? "bg-green-200 text-green-700"
                          : tip.level === "medium"
                          ? "bg-yellow-200 text-yellow-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {tip.level}
                    </span>
                  </td>

                  {/* Action Button */}
                  <td>
                    <button
                      onClick={() => navigate(`/tips-Details/${tip._id}`)}
                      className="btn btn-sm bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                    >
                      <FaEye className="text-base" /> Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-5 text-gray-500">
                  No public tips available yet 🌱
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrowseTips;
