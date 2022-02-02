import { useEffect, useState } from "react";
import { getTransactions } from "../APIService";
import {
  formatDate,
  getHistoricalValues,
  PortfolioValue,
} from "../Calculations";
import { Line } from "@ant-design/plots";

type DateValue = { date: Date; value: number };

function Analysis() {
  const [data, setData] = useState<{ date: string; value: number }[]>([]);

  useEffect(() => {
    getTransactions().then((transactions) => {
      getHistoricalValues(transactions).then((historicalValues) => {
        setData(calcData(historicalValues));
      });
    });
  }, [data]);

  const calcData = (
    values: PortfolioValue[]
  ): { date: string; value: number }[] => {
    const dateData: { date: string; value: number }[] = [];
    for (let value of values) {
      dateData.push({
        date: formatDate(value.date, false),
        value: value.value,
      });
    }
    return dateData;
  };

  const createConfig = () => {
    const config = {
      data,
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
    return config;
  };

  return (
    <div className="Analysis">
      <header className="Analysis-header">
        {data.length == 0 ? (
          <div>
            {" "}
            <label> Calculating Historical Values... </label>{" "}
          </div>
        ) : (
          //@ts-ignore
          <Line {...createConfig()} />
        )}
      </header>
    </div>
  );
}

export default Analysis;
