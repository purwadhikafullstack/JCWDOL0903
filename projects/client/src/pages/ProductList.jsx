import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import Dropdown from "../components/Dropdown";

import { fetchProducts } from "../reducers/productSlice";
import { fetchCategories } from "../reducers/categorySlice";

const sortOptions = [
  { value: "", label: "None" },
  { value: "name_asc", label: "Name (A - Z)" },
  { value: "name_desc", label: "Name (Z - A)" },
  { value: "price_asc", label: "Price (Low - High)" },
  { value: "price_desc", label: "Price (High - Low)" },
];

const categoryOptions = [{ value: "", label: "None" }];

function ProductList() {
  let [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  const dispatch = useDispatch();
  const productsGlobal = useSelector((state) => state.product);
  const categoriesGlobal = useSelector((state) => state.category);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortFilter, setSortFilter] = useState(sortOptions[0]);
  const [categoryFilter, setCategoryFilter] = useState(categoryOptions[0]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const newCategoryOptions = categoriesGlobal.categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));

    categoryOptions.splice(
      1,
      categoryOptions.length - 1,
      ...newCategoryOptions
    );
  }, [categoriesGlobal.categories]);

  useEffect(() => {
    let query = `page=${currentPage}`;
    if (searchQuery) query += `&q=${searchQuery}`;
    if (sortFilter.value) query += `&sort=${sortFilter.value}`;
    if (categoryFilter.value) query += `&categoryId=${categoryFilter.value}`;
    dispatch(fetchProducts(query));
  }, [
    dispatch,
    sortFilter.value,
    categoryFilter.value,
    currentPage,
    searchQuery,
  ]);

  return (
    <div className="container-screen">
      <Filter>
        <Dropdown
          label="Sort"
          options={sortOptions}
          selectedValue={sortFilter}
          onChange={setSortFilter}
          className="font-medium"
        />
        <Dropdown
          label="Category"
          options={categoryOptions}
          selectedValue={categoryFilter}
          onChange={setCategoryFilter}
          className="font-medium"
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
