import React from "react";
import { Link } from "react-router-dom";
import Building from "../assets/buildingMaterial.png";
import Doors from "../assets/doors_windows.png";
import Paint from "../assets/paint.png";
import Plumbing from "../assets/plumbing.png";

const selectedCategories = [
  {
    name: "Building Material",
    src: Building,
    id: 1,
  },
  {
    name: "Doors and Windows",
    src: Doors,
    id: 2,
  },
  {
    name: "Paint and Sundries",
    src: Paint,
    id: 3,
  },
  {
    name: "Plumbing",
    src: Plumbing,
    id: 4,
  },
];

const CategoryTab = ({ className }) => {
  return (
    <div className={`py-3 ${className}`}>
      <h2 className="my-8 sm:flex sm:items-center text-2xl tracking-tight md:text-3xl lg:text-4xl text-red-500 font-bold sm:after:block sm:after:h-[1px] sm:after:bg-gray-200 sm:after:flex-grow sm:after:ml-4">
        Selected Categories<span className="text-yellow-400">.</span>
      </h2>
      <div className="mt-4 flex snap-x gap-4 overflow-x-auto pb-5 justify-between">
        {selectedCategories.map((category, idx) => (
          <Link
            key={category.id}
            to={`/products${category.id ? `?categoryId=${category.id}` : ""}`}
            className="hover:-translate-y-1 transition-transform ease-in flex-shrink-0 group"
          >
            <div className="rounded-full flex flex-col items-center">
              <img
                className="object-cover object-center h-48 lg:h-64 snap-center"
                src={category.src}
                alt={category.name}
              />
              <h3 className="my-3 text-lg font-medium group-hover:text-red-500 transition-colors ease-in">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryTab;
