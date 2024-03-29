import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import FilterProductList from "../components/FilterProductList";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import Dropdown from "../components/Dropdown";

import { fetchProducts } from "../reducers/productSlice";
import { fetchCategories } from "../reducers/categorySlice";
import { countProducts } from "../helper/products";

const sortOptions = [
  { value: "", label: "None" },
  { value: "name_asc", label: "Name (A - Z)" },
  { value: "name_desc", label: "Name (Z - A)" },
  { value: "price_asc", label: "Price (Low - High)" },
  { value: "price_desc", label: "Price (High - Low)" },
];

const categoryOptions = [{ value: 0, label: "None" }];

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  const dispatch = useDispatch();
  const productsGlobal = useSelector((state) => state.product);
  const categoriesGlobal = useSelector((state) => state.category);

  const branchesGlobal = useSelector((state) => state.branch);
  const branchId = branchesGlobal.selectedBranch.id;

  const [currentPage, setCurrentPage] = useState(1);

  const sortFilterInitial = sortOptions.findIndex(
    (s) => s.value === searchParams.get("sort")
  );
  const [sortFilter, setSortFilter] = useState(
    sortOptions[sortFilterInitial === -1 ? 0 : sortFilterInitial]
  );

  const initialCategoryIdRef = useRef(parseInt(searchParams.get("categoryId")));
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

    const initialCategoryIdx = categoryOptions.findIndex(
      (c) => c.value === initialCategoryIdRef.current
    );

    if (initialCategoryIdx > -1) {
      setCategoryFilter(categoryOptions[initialCategoryIdx]);
    }
  }, [categoriesGlobal.categories]);

  useEffect(() => {
    let query = `page=${currentPage}&showEmptyStock=false`;

    searchQuery ? searchParams.set("q", searchQuery) : searchParams.delete("q");
    branchId
      ? searchParams.set("branchId", branchId)
      : searchParams.delete("branchId");
    categoryFilter.value
      ? searchParams.set("categoryId", categoryFilter.value)
      : searchParams.delete("categoryId");
    sortFilter.value
      ? searchParams.set("sort", sortFilter.value)
      : searchParams.delete("sort");

    searchParams.sort();
    query += `&${searchParams.toString()}`;
    setSearchParams(searchParams);
    dispatch(fetchProducts(query));
  }, [
    dispatch,
    branchId,
    sortFilter.value,
    categoryFilter.value,
    currentPage,
    searchQuery,
    searchParams,
    setSearchParams,
  ]);

  return (
    <div className="container-screen">
      <FilterProductList>
        <Dropdown
          label="Sort"
          options={sortOptions}
          selectedValue={sortFilter}
          onChange={(s) => setSortFilter(s)}
          className="font-medium"
        />
        <Dropdown
          label="Category"
          options={categoryOptions}
          selectedValue={categoryFilter}
          onChange={(c) => setCategoryFilter(c)}
          className="font-medium"
        />
      </FilterProductList>
      <ProductCard
        products={productsGlobal.products}
        isLoading={productsGlobal.isLoading}
      />
      <Pagination
        itemsInPage={countProducts(productsGlobal.products)}
        totalItems={productsGlobal.totalItems}
        totalPages={productsGlobal.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default ProductList;
