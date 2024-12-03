import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

// Echarts configuration data
const axisOption = {
  // Legend text color
  textStyle: {
    color: "#333",
  },
  // Tip box
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // Category axi
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
};

const normalOption = {
  tooltip: {
    trigger: "item",
  },
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
};

const Echarts = ({ style, chartData, isAxisChart = true }) => {
  // Get the instance of DOM
  const echartRef = useRef();
  let echartObj = useRef(null);
  useEffect(() => {
    let options;
    // Initialize echarts
    echartObj.current = echarts.init(echartRef.current);
    // Set option
    if (isAxisChart) {
      // Set the x-axi
      axisOption.xAxis.data = chartData.xData;
      axisOption.series = chartData.series;
      options = axisOption;
    } else {
      normalOption.series = chartData.series;
      options = normalOption;
    }
    echartObj.current.setOption(options);
  }, [chartData]);
  return <div style={style} ref={echartRef}></div>;
};

export default Echarts
