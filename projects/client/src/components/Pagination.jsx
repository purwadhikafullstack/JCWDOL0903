import ReactPaginate from "react-paginate";

export default function Pagination({
  itemsPerPage = 12,
  itemsInPage,
  totalItems,
  totalPages = 0,
  currentPage,
  setCurrentPage,
}) {
  if (totalPages === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = startItem + itemsInPage - 1;

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <>
      <div className="flex gap-4 items-center border-t border-gray-200 justify-between">
        <p className=" text-gray-700">
          Showing <span className="font-medium">{startItem}</span> to{" "}
          <span className="font-medium">{endItem}</span> of{" "}
          <span className="font-medium">{totalItems}</span> results
        </p>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className="react-paginate"
          pageClassName="paginate-page-num-container"
          breakLinkClassName="paginate-break"
          pageLinkClassName="paginate-page-num"
          previousLinkClassName="paginate-prev-btn"
          nextLinkClassName="paginate-next-btn"
          activeClassName="paginate-active"
        />
      </div>
    </>
  );
}
