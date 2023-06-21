import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import ProductForm from "../components/ProductForm";
import Table from "../components/Table";
import Dropdown from "../components/Dropdown";
import AddDataHeader from "../components/AddDataHeader";
import SearchBar from "../components/SearchBar";

import { fetchProducts } from "../reducers/productSlice";
import { fetchCategories } from "../reducers/categorySlice";
import ProductTableBody from "../components/ProductTableBody";

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
    if (productName) query += `&q=${productName}`;
    if (sortFilter.value) query += `&sort=${sortFilter.value}`;
    if (categoryFilter.value) query += `&categoryId=${categoryFilter.value}`;
    dispatch(fetchProducts(query));
  }, [
    dispatch,
    productName,
    sortFilter.value,
    categoryFilter.value,
    currentPage,
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    setProductName(e.target.searchBar?.value);
  }
  function handleDelete(id) {
    // deleteConfirmationAlert(() => dispatch(deleteVoucher(id, currentPage)));
  }

  function handleEditClick(product) {
    setEditedProduct(product);
    setShowEditProductForm(true);
  }

  return (
    <div>
      <div>
        <AddDataHeader
          title="Products"
          desc="A list of all products."
          addButtonText="Add product"
          onAddClick={() => setShowAddProductForm(true)}
        />
        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap gap-2 pb-4 mb-4 mt-12 border-b border-gray-200">
          <SearchBar onSubmit={handleSubmit} />
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
          itemsInPage={productsGlobal.products.length}
          totalItems={productsGlobal.totalItems}
          totalPages={productsGlobal.totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
