import { Link } from "react-router-dom";
import { MapPinIcon } from "@heroicons/react/20/solid";
import ProductNotFound from "../components/ProductNotFound";
import { numToIDRCurrency } from "../helper/currency";
import { getProductDiscountAmount } from "../helper/voucher";
import BrokenImg from "../assets/broken-img.png";
import ProductVoucherBadge from "./ProductVoucherBadge";
import ProductListSkeleton from "./ProductListSkeleton";

export default function ProductCard({ products = [], isLoading = false }) {
  if (isLoading) return <ProductListSkeleton />;
  if (!products.length && !isLoading) return <ProductNotFound />;

  return (
    <div className="mb-8 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <Link key={product.id} to={`/products/${product.id}`}>
          <div className="shadow-md rounded-md border p-4 min-h-[460px] bg-white">
            <div>
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <img
                  src={
                    `${process.env.REACT_APP_PRODUCT_IMG_BASE_URL}/${product.image_url}` ||
                    BrokenImg
                  }
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = BrokenImg;
                  }}
                  alt="product"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="relative mt-4">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                  {product.name}
                </h3>
              </div>
              <p className="relative text-lg font-semibold text-red-400 truncate">
                {numToIDRCurrency(
                  product.price - getProductDiscountAmount(product.Vouchers)
                )}
              </p>
              <ProductVoucherBadge product={product} />
              <div className="flex gap-1 items-center mt-2">
                <MapPinIcon className="w-3 h-3 text-gray-400" />
                <p className="text-sm text-gray-900">
                  {product.Stocks?.[0]?.Branch?.kota}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
