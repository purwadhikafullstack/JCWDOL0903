import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import ProductForm from "../components/ProductForm";
import Table from "../components/Table";
import Dropdown from "../components/Dropdown";
import AddDataHeader from "../components/AddDataHeader";
import SearchBar from "../components/SearchBar";
import TransitionFade from "../components/TransitionFade";

import { fetchProducts, deleteProduct } from "../reducers/productSlice";
import { fetchCategories } from "../reducers/categorySlice";
import { fetchAllBranches } from "../reducers/branchSlice";
import ProductTableBody from "../components/ProductTableBody";
import { countProducts } from "../helper/products";
import { deleteConfirmationAlert } from "../helper/alerts";

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
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user);
  const productsGlobal = useSelector((state) => state.product);
  const categoriesGlobal = useSelector((state) => state.category);
  const branchGlobal = useSelector((state) => state.branch);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showEditProductForm, setShowEditProductForm] = useState(false);
  const [productName, setProductName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortFilter, setSortFilter] = useState(sortOptions[0]);
  const [categoryFilter, setCategoryFilter] = useState(categoryOptions[0]);
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
  }, [categoriesGlobal.categories, branchGlobal.allBranches]);

  useEffect(() => {
    if (!(userGlobal.role === "admin" || userGlobal.role === "superadmin"))
      return;
    let query = `page=${currentPage}`;
    if (userGlobal.branch_id || branchFilter.value)
      query += `&branchId=${userGlobal.branch_id || branchFilter.value}`;
    if (productName) query += `&q=${productName}`;
    if (sortFilter.value) query += `&sort=${sortFilter.value}`;
    if (categoryFilter.value) query += `&categoryId=${categoryFilter.value}`;
    dispatch(fetchProducts(query));
  }, [
    dispatch,
    userGlobal.role,
    userGlobal.branch_id,
    branchFilter.value,
    productName,
    sortFilter.value,
    categoryFilter.value,
    currentPage,
  ]);

  function handleSearch(e) {
    e.preventDefault();
    setProductName(e.target.searchBar?.value);
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

  return (
    <div>
      <TransitionFade show={showAddProductForm}>
        <ProductForm
          action="add"
          setShowForm={setShowAddProductForm}
          categoryOptions={categoryOptions}
          currPage={currentPage}
        />
      </TransitionFade>

      <TransitionFade show={showEditProductForm}>
        <ProductForm
          action="edit"
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
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 mb-4 mt-12 border-b border-gray-200">
            <SearchBar onSubmit={handleSearch} />
            <div className="flex gap-2 items-center flex-wrap">
              <Dropdown
                label="Sort"
                options={sortOptions}
                selectedValue={sortFilter}
                onChange={setSortFilter}
                className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
              <Dropdown
                label="Category"
                options={categoryOptions}
                selectedValue={categoryFilter}
                onChange={setCategoryFilter}
                className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
              {userGlobal.role === "superadmin" && (
                <Dropdown
                  label="Branch"
                  options={branchOptions}
                  selectedValue={branchFilter}
                  onChange={setBranchFilter}
                  className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              )}
            </div>
          </div>
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
