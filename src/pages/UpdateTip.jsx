import React from "react";
import { GrUpdate } from "react-icons/gr";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateTip = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  const {
    _id,
    availability,
    category,
    description,
    email,
    image,
    level,
    name,
    title,
    topic,
  } = data[0];

  const handleUpdateTip = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const updateTip = Object.fromEntries(formData.entries());
    console.log(updateTip);

    //update tips in db
    fetch(`http://localhost:3000/allTipsData/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateTip),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your tips have been successfully updated",
            showConfirmButton: false,
            timer: 1500,
          });

          //   navigate
          setTimeout(() => {
            navigate("/myTips");
          }, 1000);
        }
      });
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-green-200 p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-pink-600">
            🌿 Update Garden Tip 🌿
          </h2>
        </div>

        <form onSubmit={handleUpdateTip} className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-text text-green-700 font-semibold">
                Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={title}
                className="input input-bordered w-full focus:border-green-500 focus:ring-green-400"
                placeholder="Title of your garden tip"
                required
              />
            </div>

            <div>
              <label className="label-text text-green-700 font-semibold">
                Plant Topic
              </label>
              <input
                type="text"
                name="topic"
                defaultValue={topic}
                className="input input-bordered w-full focus:border-green-500 focus:ring-green-400"
                placeholder="e.g. Indoor Plants, Herbs"
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-text text-green-700 font-semibold">
                Difficulty Level
              </label>
              <select
                name="level"
                defaultValue={level}
                className="select select-bordered w-full focus:border-green-500 focus:ring-green-400"
                required
              >
                <option value="" disabled>
                  Choose difficulty
                </option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="label-text text-green-700 font-semibold">
                Category
              </label>
              <select
                name="category"
                defaultValue={category}
                className="select select-bordered w-full focus:border-green-500 focus:ring-green-400"
                required
              >
                <option value="" disabled>
                  Choose category
                </option>
                <option value="composting">Composting</option>
                <option value="plant-care">Plant Care</option>
                <option value="vertical-gardening">Vertical Gardening</option>
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div>
            <label className="label-text text-green-700 font-semibold">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={description}
              className="textarea textarea-bordered w-full focus:border-green-500 focus:ring-green-400"
              rows="3"
              placeholder="Describe your tip..."
              required
            ></textarea>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-text text-green-700 font-semibold">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                defaultValue={image}
                className="input input-bordered w-full focus:border-green-500 focus:ring-green-400"
                placeholder="Enter image URL"
                required
              />
            </div>

            <div>
              <label className="label-text text-green-700 font-semibold">
                Availability
              </label>
              <select
                name="availability"
                defaultValue={availability}
                className="select select-bordered w-full focus:border-green-500 focus:ring-green-400"
                required
              >
                <option value="" disabled>
                  Choose availability
                </option>
                <option value="public">Public</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-text text-green-700 font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full focus:border-green-500 focus:ring-green-400"
                defaultValue={email}
                readOnly
              />
            </div>

            <div>
              <label className="label-text text-green-700 font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full focus:border-green-500 focus:ring-green-400"
                readOnly
                defaultValue={name}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full mt-6 bg-pink-500 hover:bg-pink-700 text-white border-none transition-all duration-200 shadow-md font-bold"
          >
            <GrUpdate className="text-xl" /> Update Tip 🌼
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTip;
