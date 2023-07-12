import ProductCardSkeleton from "./ProductCardSkeleton";

function ProductListSkeleton() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {Array(12)
        .fill(0)
        .map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
    </div>
  );
}

export default ProductListSkeleton;
