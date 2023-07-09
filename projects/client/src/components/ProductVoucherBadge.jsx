import { numToIDRCurrency } from "../helper/currency";
import Badge from "./Badge";

function ProductVoucherBadge({ product }) {
  const productVoucher = product?.Vouchers.find(
    (v) => v.voucher_type === "Produk"
  );
  const buyOneGetOneVoucher = product?.Vouchers.find(
    (v) => v.voucher_type === "Buy One Get One"
  );

  return (
    <div className="flex flex-col gap-y-1">
      {productVoucher &&
        (productVoucher.amount || productVoucher.percentage) && (
          <div className="flex items-center gap-2">
            <Badge>
              {productVoucher.amount
                ? numToIDRCurrency(productVoucher.amount)
                : `${productVoucher.percentage}%`}
            </Badge>
            <span className="text-xs text-gray-400 decoration-gray-400 line-through">
              {numToIDRCurrency(product.price)}
            </span>
          </div>
        )}
      {buyOneGetOneVoucher && <Badge>Buy One Get One</Badge>}
    </div>
  );
}

export default ProductVoucherBadge;
