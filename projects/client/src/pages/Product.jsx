import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import ProductForm from "../components/ProductForm";
import Table from "../components/Table";
import AddDataHeader from "../components/AddDataHeader";
import TransitionFade from "../components/TransitionFade";

import { fetchProducts, deleteProduct } from "../reducers/productSlice";
import { fetchCategories } from "../reducers/categorySlice";
import { fetchAllBranches } from "../reducers/branchSlice";
import ProductTableBody from "../components/ProductTableBody";
import { countProducts } from "../helper/products";
import { deleteConfirmationAlert } from "../helper/alerts";
import Spinner from "../components/Spinner";
import FilterProduct from "../components/FilterProduct";

const sortOptions = [
  { value: "", label: "None" },
  { value: "name_asc", label: "Name (A - Z)" },
  { value: "name_desc", label: "Name (Z - A)" },
  { value: "price_asc", label: "Price (Low - High)" },
  { value: "price_desc", label: "Price (High - Low)" },
];
const categoryOptions = [{ value: "", label: "None" }];
const branchOptions = [{ value: "", label: "None" }];

export default function Product() {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user);
  const productsGlobal = useSelector((state) => state.product);
  const categoriesGlobal = useSelector((state) => state.category);
  const branchGlobal = useSelector((state) => state.branch);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showEditProductForm, setShowEditProductForm] = useState(false);
  const [searchProductName, setSearchProductName] = useState(
    searchParams.get("q") || ""
  );
  const [currentPage, setCurrentPage] = useState(1);

  const sortFilterInitial = sortOptions.findIndex(
    (s) => s.value === searchParams.get("sort")
  );
  const [sortFilter, setSortFilter] = useState(
    sortOptions[sortFilterInitial === -1 ? 0 : sortFilterInitial]
  );
  const initialCategoryIdRef = useRef(parseInt(searchParams.get("categoryId")));
  const [categoryFilter, setCategoryFilter] = useState(categoryOptions[0]);
  const initialBranchIdRef = useRef(parseInt(searchParams.get("branchId")));
  const [branchFilter, setBranchFilter] = useState(branchOptions[0]);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    if (!(userGlobal.role === "admin" || userGlobal.role === "superadmin"))
      return;
    dispatch(fetchCategories());
    dispatch(fetchAllBranches());
  }, [dispatch, userGlobal.role]);

  useEffect(() => {
    const newCategoryOptions = categoriesGlobal.categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));

    const newBranchOptions = branchGlobal.allBranches.map((branch) => ({
      value: branch.id,
      label: branch.name,
    }));

    categoryOptions.splice(
      1,
      categoryOptions.length - 1,
      ...newCategoryOptions
    );

    branchOptions.splice(1, branchOptions.length - 1, ...newBranchOptions);

    const initialCategoryIdx = categoryOptions.findIndex(
      (c) => c.value === initialCategoryIdRef.current
    );
    const initialBranchIdx = branchOptions.findIndex(
      (b) => b.value === initialBranchIdRef.current
    );

    if (initialCategoryIdx > -1) {
      setCategoryFilter(categoryOptions[initialCategoryIdx]);
    }
    if (initialBranchIdx > -1) {
      setBranchFilter(branchOptions[initialBranchIdx]);
    }
  }, [categoriesGlobal.categories, branchGlobal.allBranches]);

  useEffect(() => {
    if (!(userGlobal.role === "admin" || userGlobal.role === "superadmin"))
      return;
    let query = `page=${currentPage}`;
    userGlobal.branch_id || branchFilter.value
      ? searchParams.set("branchId", userGlobal.branch_id || branchFilter.value)
      : searchParams.delete("branchId");
    searchProductName
      ? searchParams.set("q", searchProductName)
      : searchParams.delete("q");
    sortFilter.value
      ? searchParams.set("sort", sortFilter.value)
      : searchParams.delete("sort");
    categoryFilter.value
      ? searchParams.set("categoryId", categoryFilter.value)
      : searchParams.delete("categoryId");
    searchParams.sort();
    query += `&${searchParams.toString()}`;
    setSearchParams(searchParams);
    dispatch(fetchProducts(query));
  }, [
    dispatch,
    userGlobal.role,
    userGlobal.branch_id,
    branchFilter.value,
    searchProductName,
    sortFilter.value,
    categoryFilter.value,
    currentPage,
    searchParams,
    setSearchParams,
  ]);

  useEffect(() => {
    if (!productsGlobal.isLoading) {
      setShowAddProductForm(false);
      setShowEditProductForm(false);
    }
  }, [productsGlobal.isLoading]);

  function handleSearch(e) {
    e.preventDefault();
    setSearchProductName(e.target.searchBar?.value);
  }

  function handleDelete(id) {
    deleteConfirmationAlert(() =>
      dispatch(deleteProduct(id, currentPage, userGlobal.branch_id))
    );
  }

  function handleEditClick(product, stockIdx) {
    setEditedProduct({ ...product, stockIdx });
    setShowEditProductForm(true);
  }

  if (
    productsGlobal.isLoading &&
    !(showAddProductForm === true || showEditProductForm === true)
  )
    return <Spinner />;

  return (
    <div>
      <TransitionFade show={showAddProductForm}>
        <ProductForm
          action="add"
          isLoading={productsGlobal.isLoading}
          setShowForm={setShowAddProductForm}
          categoryOptions={categoryOptions}
          currPage={currentPage}
        />
      </TransitionFade>

      <TransitionFade show={showEditProductForm}>
        <ProductForm
          action="edit"
          isLoading={productsGlobal.isLoading}
          setShowForm={setShowEditProductForm}
          categoryOptions={categoryOptions}
          currPage={currentPage}
          product={editedProduct}
        />
      </TransitionFade>
      <TransitionFade show={!showAddProductForm && !showEditProductForm}>
        <div>
          <AddDataHeader
            title="Products"
            desc="A list of all products."
            addButtonText="Add product"
            onAddClick={() => setShowAddProductForm(true)}
          />
          <FilterProduct
            searchProductName={searchProductName}
            onSearch={handleSearch}
            sortOptions={sortOptions}
            sortFilter={sortFilter}
            onSortChange={setSortFilter}
            categoryOptions={categoryOptions}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            branchOptions={branchOptions}
            branchFilter={branchFilter}
            onBranchChange={setBranchFilter}
          />
          <Table
            className="mb-4"
            headCols={[
              "Product Name",
              "Category",
              "Price",
              "Description",
              "Stock",
              "Branch",
            ]}
            tableBody={
              <ProductTableBody
                products={productsGlobal.products}
                onEdit={handleEditClick}
                onDelete={handleDelete}
              />
            }
          />
          <Pagination
            itemsInPage={countProducts(productsGlobal.products)}
            totalItems={productsGlobal.totalItems}
            totalPages={productsGlobal.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </TransitionFade>
    </div>
  );
}
