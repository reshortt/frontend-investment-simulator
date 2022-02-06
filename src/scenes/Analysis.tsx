import { useEffect, useState } from "react";
import { getTransactions } from "../APIService";
import {
  formatDate,
  getHistoricalValues,
  PortfolioValue,
} from "../Calculations";
import { Line, LineConfig } from "@ant-design/plots";
import { Empty } from "antd";

type DateValue = { date: string; value: number };

function Analysis() {
  const [config, setConfig] = useState<LineConfig | undefined>(undefined);

  useEffect(() => {
    getTransactions().then((transactions) => {
      getHistoricalValues(transactions).then((historicalValues) => {
        const chartData = createChartData(historicalValues);
        const newConfig: LineConfig = createConfig(chartData);
        setConfig(newConfig);
      });
    });
  }, []);

  const createChartData = (values: PortfolioValue[]): DateValue[] => {
    const chartData: DateValue[] = [];
    for (let value of values) {
      chartData.push({
        date: formatDate(value.date, false),
        value: value.value,
      });
    }
    return chartData;
  };

  const createConfig = (chartData: DateValue[]): LineConfig => {
    return {
      data: chartData,
      padding: "auto",
      xField: "date",
      yField: "value",
      annotations: [
        {
          type: "regionFilter",
          start: ["min", "median"],
          end: ["max", "0"],
          color: "#F4664A",
        },
        //   {
        //     type: "text",
        //     position: ["min", "median"],
        //     content: "hello friends",
        //     offsetY: -4,
        //     style: {
        //       textBaseline: "bottom",
        //     },
        //   },
        //   {
        //     type: "line",
        //     start: ["min", "median"],
        //     end: ["max", "median"],
        //     style: {
        //       stroke: "#F4664A",
        //       lineDash: [2, 2],
        //     },
        //   },
      ],
    };
  };

  return (
    <div className="Analysis">
      <header className="Analysis-header">
        {config == undefined ? (
          <div>
            {" "}
            <label> Calculating Historical Values... </label>{" "}
          </div>
        ) : config.data.length < 7 ? (
          <Empty description="History unavailable for accounts created within the last week"></Empty>
        ) : (
          //@ts-ignore
          <Line {...config} />
        )}
      </header>
    </div>
  );
}

export default Analysis;
