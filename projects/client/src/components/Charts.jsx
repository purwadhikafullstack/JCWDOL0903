import Plot from "react-plotly.js";

{
  /* <Plot
data={[
  {
    x: [1, 2, 3],
    y: [2, 6, 3],
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "red" },
  },
  { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
]}
layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
/> */
}

export default function Charts({ data }) {
  console.log("data", data);
  // console.log("TransactionHe", data.transactionHeaderCategory);

  const dataRender = () => {
    return data.transactionHeaderCategory.map((data2) => {
      return {
        x: [data2.name],
        y: [data2.Total],
        name: data2.name,
        type: "bar",
      };
    });
  };

  const barChart = dataRender();

  const layout = {
    barmode: "group",
    title: "Transaction vs Category",
    yaxis: {
      tickformat: ",.0f", // Format untuk mengubah angka menjadi format singkat (0.5M, 1M, dll.)
      title: "Rp",
    },
  };

  return (
    // <div className="bg-white">
    <div className="mx-auto max-w-7xl py-12 px-6 lg:px-8 lg:py-24">
      <Plot
        data={barChart}
        layout={layout}
      />
    </div>
    // </div>
  );
}
