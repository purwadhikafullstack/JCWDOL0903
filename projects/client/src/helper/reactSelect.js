import api from "../api/api";

const style = {
  control: (base, state) => ({
    ...base,
    boxShadow: state.isFocused ? "0 0 0 1px orange" : "none",
  }),
  input: (base) => ({
    ...base,
    "input:focus": {
      boxShadow: "none",
    },
  }),
};

async function loadProduct(productName = "") {
  const res = await api.get(`/products?q=${productName}`);
  if (res) return res.data.products.rows;
}

export { style, loadProduct };
