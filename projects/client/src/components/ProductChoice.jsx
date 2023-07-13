import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import api from "../api/api";
import { useSelector } from "react-redux";

export default function ProductChoice({ className }) {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const branchGlobal = useSelector((state) => state.branch);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/products?branchId=${branchGlobal.selectedBranch.id}`)
      .then((res) => {
        setProducts(res.data.products.rows.slice(0, 4));
        setIsLoading(false);
      })
      .catch((err) => setIsLoading(false));
  }, [branchGlobal.selectedBranch.id]);

  return (
    <div className={`relative bg-gray-800 ${className}`}>
      <div className="py-24 container-screen">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.pexels.com/photos/443378/pexels-photo-443378.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <div
            className="absolute inset-0 bg-gray-800 mix-blend-multiply"
            aria-hidden="true"
          />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <h2 className="text-2xl sm:flex sm:items-center font-bold tracking-tight text-red-500 md:text-3xl lg:text-4xl sm:after:block sm:after:h-[1px] sm:after:bg-gray-200 sm:after:flex-grow sm:after:ml-4">
            Bangunin's Choice <span className="text-yellow-400">.</span>
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-gray-300">
            Our selected product just for you.
          </p>
        </div>
        <section className="relative mx-auto mt-8 max-w-7xl">
          <ProductCard products={products} isLoading={isLoading} />
        </section>
      </div>
    </div>
  );
}
