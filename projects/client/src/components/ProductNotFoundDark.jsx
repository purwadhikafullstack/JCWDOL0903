import Zeus from "../assets/zeus.png";

export default function ProductNotFoundDark() {
  return (
    <div className="mx-auto max-w-max">
      <div className="sm:flex items-center">
        <img src={Zeus} alt="a man with mustache" />
        <div className="sm:ml-6">
          <div className="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Oops, product not found
            </h1>
            <p className="mt-1 text-base text-slate-200">
              Try using another keyword.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
