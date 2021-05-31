import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Line as LineGraph } from "react-chartjs-2";
import numeral from "numeral";

import lastfewdays from "../data/lastfewdays";
import { CircularProgress } from "@material-ui/core";

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function StatisticGraph() {
  const [data, setData] = useState([]);
  const loading = useSelector((state) => state.countriesStreaming.loading);

  useEffect(() => {
    chartData();
  }, []);

  async function chartData(caseType = "cases") {
    const chartData = [];
    let lastDataPoint;
    for (let date in await lastfewdays[caseType]) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: lastfewdays[caseType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = lastfewdays[caseType][date];
    }

    setData(chartData);
  }

  return loading ? (
    <div style={{ height: "9.5rem", position: "relative" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <CircularProgress style={{ color: "#cc1034" }} />
      </div>
    </div>
  ) : (
    <div>
      <LineGraph
        options={options}
        data={{
          datasets: [
            {
              backgroundColor: "rgba(204, 16, 52, 0.5)",
              borderColor: "#CC1034",
              data: data,
            },
          ],
        }}
      />
    </div>
  );
}

export default StatisticGraph;
