import React from "react";

const PlantGuideSection = () => {
  return (
    <section className=" py-5 px-5">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-3">
          🌱 The Ultimate Plant Guide 🌱
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          Discover fascinating facts, growing tips, and expert advice on every
          type of plant — from tiny succulents to towering trees.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="card bg-white shadow-md hover:shadow-lg transition rounded-xl overflow-hidden">
            <img
              src="https://i.ibb.co.com/HLGQhHHp/indoor-Plant.jpg"
              alt="Plant Guide"
              className="h-52 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-2xl font-semibold text-green-700">
                Master Indoor Plant Care
              </h3>
              <p className="text-gray-600 mt-2">
                Learn how to keep your indoor plants happy, healthy, and green
                all year round.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-white shadow-md hover:shadow-lg transition rounded-xl overflow-hidden">
            <img
              src="https://i.ibb.co.com/HDK6sb5x/kitchen.jpg"
              alt="Herbs"
              className="h-52 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-2xl font-semibold text-green-700">
                Grow Fresh Kitchen Herbs
              </h3>
              <p className="text-gray-600 mt-2">
                Turn your windowsill into a mini herb garden with these easy
                growing tips.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-white shadow-md hover:shadow-lg transition rounded-xl overflow-hidden">
            <img
              src="https://i.ibb.co.com/jk7vLDHz/stunning-Garden.jpg"
              alt="Garden Design"
              className="h-52 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-2xl font-semibold text-green-700">
                Design a Stunning Garden
              </h3>
              <p className="text-gray-600 mt-2">
                Get inspired by creative layouts and plant combinations that
                bring your garden to life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlantGuideSection;
