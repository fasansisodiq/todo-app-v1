import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
// ESM
import { faker } from "@faker-js/faker";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
Chart.register(...registerables);

function BarChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(
        collection(db, "your_collection_name")
      );
      const data = querySnapshot.docs.map((doc) => ({
        label: doc.data().label,
        value: doc.data().value,
      }));
      setChartData(data);
    }
    fetchData();
  }, []);

  const data = {
    labels: chartData.map((item) => item.label),
    datasets: [
      {
        label: "Your Data",
        data: chartData.map((item) => item.value),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  // const labels = [
  //   "Today",
  //   "Important",
  //   "Completed",
  //   "Pending",
  //   "Planned",
  //   "House",
  //   "Friend",
  //   "Personal",
  //   "Assigned",
  //   "Project",
  //   "Work",
  //   "Social",
  //   "Trash",
  // ];

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //     {
  //       label: "Dataset 2",
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //     },
  //   ],
  // };
  // const options = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tasks report Bar Chart",
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default BarChart;

// import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

// export function App() {
//   return <Bar options={options} data={data} />;
// }
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );
