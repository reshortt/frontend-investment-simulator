import { useEffect, useState } from "react";
import { getStockPriceOnDate, getTransactions } from "../APIService";
import {
  formatDate,
  getHistoricalValues,
  PortfolioValue,
  StockValue,
} from "../Calculations";
//import { Line, LineConfig } from "@ant-design/plots";
import { Empty, Spin } from "antd";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const lineColors:string[] = ["cadetblue", "darkorchid", "cornflowerblue", "indigo", "olive", "darkseagreen", "darkmagenta"]

const POINT_RADIUS = 3.0
const POINT_HOVER_RADIUS = 6.0

type LineData = {
  id: number;
  label: string;
  data: number[];
  pointRadius: string;
  pointHoverRadius:number,
  backgroundColor: string;
};

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

  const MAX_POINTS:number = 100

  const thinPortfolioValues = (originalValues:PortfolioValue[]):PortfolioValue[] => {

    if (originalValues.length < MAX_POINTS) {
      return originalValues
    }

    const thinnedValues:PortfolioValue[] = []
    const interval:number = originalValues.length/MAX_POINTS

    for (let i:number=0; i < originalValues.length; i += interval) {
      const dateIdx = Math.floor(i)
      thinnedValues.push(originalValues[dateIdx])
    }
    if (thinnedValues[thinnedValues.length-1] != originalValues[originalValues.length-1]) {
      thinnedValues.push(originalValues[originalValues.length-1])
    }

    return thinnedValues
  }

  const createChartData = (portfolioValues: PortfolioValue[]): ChartData => {
    const labels: string[] = [];
    const datasets: any[] = [];
    const totalValues: number[] = [];
    const cashValues: number[] = [];

    portfolioValues = thinPortfolioValues(portfolioValues)

    const stockValueMap: Map<string, number[]> = new Map();
    for (let value of portfolioValues) {
      for (let stockValue of value.stocks) {
        const stockValues: number[] | undefined = stockValueMap.get(
          stockValue.symbol
        );
        if (!stockValues) {
          stockValueMap.set(stockValue.symbol, []);
        }
      }
    }

    for (let portfolioValue of portfolioValues) {
      labels.push(formatDate(portfolioValue.date, false));
      totalValues.push(portfolioValue.total);
      cashValues.push(portfolioValue.cash);

      stockValueMap.forEach((stockValues: number[], key: string) => {
        let stockValue: number = NaN;
        for (let stock of portfolioValue.stocks) {
          if (stock.symbol.toUpperCase() === key.toUpperCase()) {
            stockValue = stock.value;
            break;
          }
        }
        stockValues.push(stockValue);
      });
    }

    datasets.push({
      id: 1,
      label: "Total",
      data: totalValues,
      pointRadius: POINT_RADIUS,
      pointHoverRadius:POINT_HOVER_RADIUS,
      borderColor: "blue"
    });

    datasets.push({
      id: 2,
      label: "Cash",
      data: cashValues,
      pointRadius: POINT_RADIUS,
      pointHoverRadius:POINT_HOVER_RADIUS,
      borderColor: "green",
    });

    let id: number = 3;


    let colorId:number = 0;
    stockValueMap.forEach((stockValues: number[], key: string) => {
      const colorName:string = lineColors[colorId] 
      if (++colorId == lineColors.length)
        colorId =0;
      datasets.push({
        id: id++,
        label: key,
        //@ts-ignore
        data: stockValues,
        pointRadius: POINT_RADIUS,
        pointHoverRadius: POINT_HOVER_RADIUS,
        borderColor: colorName,
      });
    });

    const chartData: ChartData = {
      labels,
      datasets,
    };
    return chartData;
  };

  return (
    <div className="Analysis">
      <header className="Analysis-header" >
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
