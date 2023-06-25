// Karena product bisa ada nested stocks, jdi ga bisa itung dari products.length doang :(
function countProducts(products = []) {
  let count = 0;
  products.forEach((p) => {
    p.Stocks.forEach(() => {
      count++;
    });
  });

  return count;
}

export { countProducts };
