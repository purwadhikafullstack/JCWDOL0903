export default function Filter({ children }) {
  return (
    <div>
      <section
        aria-labelledby="filter-heading"
        className="border-t border-gray-200 py-6"
      >
        <h2 id="filter-heading" className="sr-only">
          Product filters
        </h2>

        <div className="flex items-center justify-between">{children}</div>
      </section>
    </div>
  );
}
