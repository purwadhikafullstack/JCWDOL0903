function numToIDRCurrency(num) {
  return num.toLocaleString("id", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
}

export { numToIDRCurrency };
