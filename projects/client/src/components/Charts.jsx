import Plot from "react-plotly.js";

export default function Charts({ data }) {

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
      tickformat: ",.0f", 
      title: "Rp",
    },
  };

  return (
    <div className="mx-auto max-w-7xl py-12 px-6 lg:px-8 lg:py-24">
      <Plot
        data={barChart}
        layout={layout}
      />
    </div>

  );
}
