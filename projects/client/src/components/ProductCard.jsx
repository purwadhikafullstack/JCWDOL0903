import { Link } from "react-router-dom";
import ProductNotFound from "../components/ProductNotFound";
import { numToIDRCurrency } from "../helper/currency";
import BrokenImg from "../assets/broken-img.png";

export default function ProductCard({ products = [] }) {
  if (!products.length) return <ProductNotFound />;

  return (
    <div className="mb-8 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <Link key={product.id} to={`/products/${product.id}`}>
          <div className="shadow-md rounded-md border p-4">
            <div>
              <div className="relative h-72 w-full overflow-hidden rounded-lg">
                <img
                  src={product.image_url || BrokenImg}
                  alt="product"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="relative mt-4">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </h3>
              </div>
              <p className="relative text-lg font-semibold text-red-400 truncate">
                {numToIDRCurrency(product.price)}
              </p>
            </div>
            <div className="mt-6 mb-4">
              <button
                className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                onClick={(e) => e.preventDefault()}
              >
                Add to cart<span className="sr-only">, {product.name}</span>
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
