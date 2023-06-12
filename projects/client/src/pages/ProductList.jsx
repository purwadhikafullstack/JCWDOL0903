import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import FilterDropdown from "../components/FilterDropdown";

import { fetchProducts } from "../reducers/productSlice";
import { fetchCategories } from "../reducers/categorySlice";

const sortOptions = [
  { value: "", label: "None" },
  { value: "name_asc", label: "Name (A - Z)" },
  { value: "name_desc", label: "Name (Z - A)" },
  { value: "price_asc", label: "Price (Low - High)" },
  { value: "price_desc", label: "Price (High - Low)" },
];

function ProductList() {
  let [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  const dispatch = useDispatch();
  const productsGlobal = useSelector((state) => state.product);
  const categoriesGlobal = useSelector((state) => state.category);
  const [sortFilter, setSortFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    let query = `page=${currentPage}`;
    if (searchQuery) query += `&q=${searchQuery}`;
    if (sortFilter) query += `&sort=${sortFilter}`;
    if (categoryFilter) query += `&categoryId=${categoryFilter}`;
    dispatch(fetchProducts(query));
  }, [dispatch, sortFilter, categoryFilter, currentPage, searchQuery]);

  const categoryOptions = [{ value: "", label: "None" }];
  categoriesGlobal.forEach((category) => {
    categoryOptions.push({ value: category.id, label: category.name });
  });

  return (
    <div className="container-screen">
      <Filter>
        <FilterDropdown
          label="Sort"
          options={sortOptions}
          selected={sortFilter}
          setSelected={setSortFilter}
        />
        <FilterDropdown
          label="Category"
          options={categoryOptions}
          selected={categoryFilter}
          setSelected={setCategoryFilter}
        />
      </Filter>
      <ProductCard products={productsGlobal.products} />
      <Pagination
        itemsInPage={productsGlobal.products.length}
        totalItems={productsGlobal.totalItems}
        totalPages={productsGlobal.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default ProductList;
