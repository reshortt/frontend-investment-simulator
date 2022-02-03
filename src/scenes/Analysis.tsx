import { useEffect, useState } from "react";
import { getTransactions } from "../APIService";
import {
  formatDate,
  getHistoricalValues,
  PortfolioValue,
} from "../Calculations";
import { Line } from "@ant-design/plots";

type DateValue = { date: string; value: number };

function Analysis() {
  const [data, setData] = useState<DateValue[] | undefined>();

  useEffect(() => {
    getTransactions().then((transactions) => {
      getHistoricalValues(transactions).then((historicalValues) => {
        setData(calcData(historicalValues));
      });
    });
  }, []);

  const calcData = (
    values: PortfolioValue[]
  ): DateValue[] => {
    const dateData: DateValue[] = [];
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
        {data=== undefined ? (
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
