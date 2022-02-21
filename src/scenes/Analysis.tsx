import { useEffect, useState } from "react";
import { getTransactions } from "../APIService";
import {
  formatDate,
  getHistoricalValues,
  PortfolioValue,
} from "../Calculations";
//import { Line, LineConfig } from "@ant-design/plots";
import { Empty, Spin } from "antd";
import { Line } from "react-chartjs-2";
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables)

type LineData = { id: number; label: string; data: number[] };
type ChartData = { labels: string[]; datasets: LineData[] };

function Analysis() {
  const [chartData, setChartData] = useState<ChartData | undefined>(undefined);

  useEffect(() => {
    getTransactions().then((transactions) => {
      getHistoricalValues(transactions).then((historicalValues) => {
        const chartData = createChartData(historicalValues);
        setChartData(chartData);
      });
    });
  }, []);

  const createChartData = (values: PortfolioValue[]): ChartData => {
    const labels: string[] = [];
    const datasets: LineData[] = [];
    const totalValues: number[] = [];
    const cashValues: number[] = [];

    type StockValues = {symbol:string, values:number[]}

    for (let value of values) {
      labels.push(formatDate(value.date, false))
      totalValues.push(value.total)
      cashValues.push(value.cash)
    }

    datasets.push({
      id: 1,
      label: "Total",
      data: totalValues,
    });

    datasets.push({
      id: 2,
      label: "Cash",
      data: cashValues,
    });

    const chartData: ChartData = {
      labels,
      datasets,
    };
    return chartData;
  };

  return (
    <div className="Analysis">
      <header className="Analysis-header">
        {chartData === undefined ? (
          <div>
            <Spin size="default" />
          </div>
        ) : chartData.labels.length < 7 ? (
          <Empty description="History unavailable for accounts created within the last week"></Empty>
        ) : (
          //@ts-ignore
          <Line datasetIdKey="1" data={chartData} />
        )}
      </header>
    </div>
  );
}

export default Analysis;
