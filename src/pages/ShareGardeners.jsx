import React from "react";

const ShareGardeners = () => {
  const handleShareTips = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newShareTips = Object.fromEntries(formData.entries());
    console.log(newShareTips);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-green-200 p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-700">
            🌿 Share Your Garden Tip 🌿
          </h2>
          <p className="text-green-600 text-sm mt-2">
            Inspire other garden lovers with your best plant care ideas.
          </p>
        </div>

        <form onSubmit={handleShareTips} className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-text text-green-700 font-semibold">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="input input-bordered w-full focus:border-green-500 focus:ring-green-400"
                placeholder="Title of your garden tip"
              />
            </div>

            <div>
              <label className="label-text text-green-700 font-semibold">
                Plant Topic
              </label>
              <input
                type="text"
                name="topic"
                className="input input-bordered w-full focus:border-green-500 focus:ring-green-400"
                placeholder="e.g. Indoor Plants, Herbs"
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
                defaultValue=""
                name="level"
                className="select select-bordered w-full focus:border-green-500 focus:ring-green-400"
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
                defaultValue=""
                name="category"
                className="select select-bordered w-full focus:border-green-500 focus:ring-green-400"
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
              className="textarea textarea-bordered w-full focus:border-green-500 focus:ring-green-400"
              rows="3"
              placeholder="Describe your tip..."
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
                className="input input-bordered w-full focus:border-green-500 focus:ring-green-400"
                placeholder="Enter image URL"
              />
            </div>

            <div>
              <label className="label-text text-green-700 font-semibold">
                Availability
              </label>
              <select
                defaultValue=""
                name="availability"
                className="select select-bordered w-full focus:border-green-500 focus:ring-green-400"
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
                placeholder="Your email"
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
                placeholder="Your name"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full mt-6 bg-green-500 hover:bg-green-600 text-white border-none transition-all duration-200 shadow-md"
          >
            🌼 Share Tip 🌼
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShareGardeners;
