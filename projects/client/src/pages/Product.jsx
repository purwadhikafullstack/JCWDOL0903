import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import Pagination from "../components/Pagination";
import ProductForm from "../components/ProductForm";
import Table from "../components/Table";
import Dropdown from "../components/Dropdown";
import AddDataHeader from "../components/AddDataHeader";
import SearchBar from "../components/SearchBar";

import { fetchProducts, deleteProduct } from "../reducers/productSlice";
import { fetchCategories } from "../reducers/categorySlice";
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

export default function Product() {
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user);
  const productsGlobal = useSelector((state) => state.product);
  const categoriesGlobal = useSelector((state) => state.category);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showEditProductForm, setShowEditProductForm] = useState(false);
  const [productName, setProductName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortFilter, setSortFilter] = useState(sortOptions[0]);
  const [categoryFilter, setCategoryFilter] = useState(categoryOptions[0]);
  const [editedProduct, setEditedProduct] = useState({});

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
    if (userGlobal.branch_id) query += `&branchId=${userGlobal.branch_id}`;
    if (productName) query += `&q=${productName}`;
    if (sortFilter.value) query += `&sort=${sortFilter.value}`;
    if (categoryFilter.value) query += `&categoryId=${categoryFilter.value}`;
    dispatch(fetchProducts(query));
  }, [
    dispatch,
    userGlobal.branch_id,
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
      <Transition
        show={showAddProductForm}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-250"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ProductForm
          action="add"
          setShowForm={setShowAddProductForm}
          categoryOptions={categoryOptions}
          currPage={currentPage}
        />
      </Transition>
      <Transition
        show={showEditProductForm}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-250"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ProductForm
          action="edit"
          setShowForm={setShowEditProductForm}
          categoryOptions={categoryOptions}
          currPage={currentPage}
          product={editedProduct}
        />
      </Transition>
      <Transition
        show={!showAddProductForm && !showEditProductForm}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-250"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div>
          <AddDataHeader
            title="Products"
            desc="A list of all products."
            addButtonText="Add product"
            onAddClick={() => setShowAddProductForm(true)}
          />
          <div className="flex items-center justify-between flex-wrap sm:flex-nowrap gap-2 pb-4 mb-4 mt-12 border-b border-gray-200">
            <SearchBar onSubmit={handleSearch} />
            <div className="flex gap-2 items-center">
              <Dropdown
                label="Sort"
                options={sortOptions}
                selectedValue={sortFilter}
                onChange={setSortFilter}
                className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
              <Dropdown
                label="Types"
                options={categoryOptions}
                selectedValue={categoryFilter}
                onChange={setCategoryFilter}
                className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
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
      </Transition>
    </div>
  );
}
