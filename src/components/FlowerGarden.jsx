import React from "react";

const FlowerGarden = () => {
  const flowerData = [
    {
      img: "https://i.ibb.co.com/CppwhfDH/lavendy.jpg",
      title: "Lavender Serenity",
      desc: "Calm your soul with lavender’s soothing fragrance and beauty.",
    },
    {
      img: "https://i.ibb.co.com/SDmVcRtb/daisy.jpg",
      title: "Daisy Delight",
      desc: "Fill your home with cheerful daisies — symbols of freshness.",
    },
    {
      img: "https://i.ibb.co.com/d4Z18mjb/orchid1.jpg",
      title: "Orchid Elegance",
      desc: "Add luxury to your rooms with graceful and exotic orchids.",
    },
  ];
  return (
    <section className="py-5 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-green-700 mb-3">
          🌸 Flower Garden 🌸
        </h2>
        <p className="text-gray-700 text-lg mb-10">
          Discover stunning flowers you can grow and use to decorate your home —
          turning simple spaces into natural beauty. 🌺
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {/* --- Big Feature Card 1 --- */}
          <div className="lg:col-span-2 bg-white shadow-md hover:shadow-lg transition rounded-xl overflow-hidden relative group">
            <img
              src="https://i.ibb.co.com/G3kRT0F7/roses2.jpg"
              alt="Rose Garden"
              className="h-80 w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end text-left p-6">
              <h3 className="text-3xl font-bold text-white">Rose Paradise</h3>
              <p className="text-gray-100 mt-2">
                Bring timeless beauty to your home with the elegance of red
                roses.
              </p>
            </div>
          </div>

          {/* --- Big Feature Card 2 --- */}
          <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl overflow-hidden relative group">
            <img
              src="https://i.ibb.co.com/0ps7cCnR/sunflower.jpg"
              alt="Sunflower Smiles"
              className="h-80 w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end text-left p-6">
              <h3 className="text-3xl font-bold text-white">Sunflower Bliss</h3>
              <p className="text-gray-100 mt-2">
                Spread joy and brightness with cheerful sunflowers blooming all
                year.
              </p>
            </div>
          </div>

          {/* --- Small Cards --- */}
          {flowerData.map((flower, index) => (
            <div
              key={index}
              className="card bg-white shadow-md hover:shadow-lg transition rounded-xl overflow-hidden"
            >
              <img
                src={flower.img}
                alt={flower.title}
                className="h-56 w-full object-cover hover:scale-105 "
              />
              <div className="p-5 text-left">
                <h3 className="text-2xl font-semibold text-green-700">
                  {flower.title}
                </h3>
                <p className="text-gray-600 mt-2">{flower.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlowerGarden;
