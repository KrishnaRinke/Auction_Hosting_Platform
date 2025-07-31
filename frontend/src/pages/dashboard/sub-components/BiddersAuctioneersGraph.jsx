// // import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
//   PointElement,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import { useSelector } from "react-redux";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
//   PointElement
// );

// const BiddersAuctioneersGraph = () => {
//   const { totalAuctioneer, totalBidders } = useSelector(
//     (state) => state.superAdmin
//   );
//   const data = {
//     labels: [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ],
//     datasets: [
//       {
//         label: "Number of Bidders",
//         data: totalBidders,
//         borderColor: "#D6482B",
//         fill: false,
//       },
//       {
//         label: "Number of Auctioneers",
//         data: totalAuctioneer,
//         borderColor: "#fdba88",
//         fill: false,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 5000,
//         ticks: {
//           callback: function (value) {
//             return value.toLocaleString();
//           },
//         },
//       },
//     },
//     plugins: {
//       title: {
//         display: true,
//         text: "Number of Bidders And Auctioneers Registered",
//       },
//     },
//   };

//   return <Line data={data} options={options} />;
// };

// export default BiddersAuctioneersGraph;



import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneer = [], totalBidders = [] } = useSelector(
    (state) => state.superAdmin
  );

  // Ensure arrays have 12 values for each month
  const defaultArray = new Array(12).fill(0);
  const biddersData = totalBidders.length === 12 ? totalBidders : defaultArray;
  const auctioneersData = totalAuctioneer.length === 12 ? totalAuctioneer : defaultArray;

  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
  {
    label: "Number of Bidders",
    data: biddersData,
    borderColor: "#D6482B",
    backgroundColor: "#D6482B",
    pointRadius: 5,
    pointBackgroundColor: "#D6482B",
    tension: 0.4,
  },
  {
    label: "Number of Auctioneers",
    data: auctioneersData,
    borderColor: "#fdba88",
    backgroundColor: "#fdba88",
    pointRadius: 5,
    pointBackgroundColor: "#fdba88",
    tension: 0.4,
  },
],

  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Number of Bidders And Auctioneers Registered",
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="w-full h-96"> {/* Ensures visible height */}
      <Line data={data} options={options} />
    </div>
  );
};

export default BiddersAuctioneersGraph;