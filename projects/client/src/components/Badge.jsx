function Badge({ children }) {
  return (
    <span className="inline-flex items-center max-w-max rounded-md bg-red-100 px-2 py-1 text-xs font-bold text-red-400">
      {children}
    </span>
  );
}

export default Badge;
