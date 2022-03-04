import { useEffect, useState } from "react";
import { getAccount } from "../APIService";
import { Account } from "../types";
import { Spin, Table, TablePaginationConfig } from "antd";
import {
  formatCurrency,
  formatPercent,
  getAccountValue,
  getAssetValue,
  getCostBasis,
  getGainLoss,
  getPercentOfAccount,
  getQuantity,
  parseCash,
  parsePercent,
} from "../Calculations";

type PositionRow = {
  name: string;
  symbol: string;
  bid: string;
  ask: string;
  quantity: string;
  costBasis: string;
  currentValue: string;
  percentOfAccount: string;
  gain: string;
  gainPercent: string;
};

function Positions() {
  const [data, setData] = useState<PositionRow[] | undefined>();

  useEffect(() => {
    getAccount().then((foundUser) => {
      if (foundUser) {
        setData(calcData(foundUser));
      }
    });
  }, []);

  const calcData = (user: Account): PositionRow[] => {
    const data: PositionRow[] = [];
    var totalBasis: number = 0;
    var totalGain: number = 0;
    for (var asset of user.assets) {
      //console.log("pushing asset = ", JSON.stringify(asset))
      totalGain += getGainLoss(asset);
      totalBasis += getCostBasis(asset);
      data.push({
        name: asset.stock.name,
        symbol: asset.stock.symbol,
        // lastPrice: formatCurrency(
        //   asset.stock.price.bid || asset.stock.price.previousClose
        // ),
        bid: formatCurrency(
          asset.stock.price.bid || asset.stock.price.previousClose
        ),
        ask: formatCurrency(
          asset.stock.price.ask || asset.stock.price.previousClose
        ),
        quantity: getQuantity(asset).toString(),
        costBasis: formatCurrency(getCostBasis(asset)),
        currentValue: formatCurrency(getAssetValue(asset)),
        percentOfAccount: formatPercent(getPercentOfAccount(user, asset)),
        gain: formatCurrency(getGainLoss(asset)),
        gainPercent: formatPercent(getGainLoss(asset) / getCostBasis(asset)),
      });
    }
    //@ts-ignore
    data.push({
      name: "Cash",
      currentValue: formatCurrency(user.info.cash),
      costBasis: formatCurrency(user.info.cash),
      percentOfAccount: formatPercent(user.info.cash / getAccountValue(user)),
    });

    return data;
  };

  const columns: object[] = [
    { title: "Symbol", dataIndex: "symbol", key: "symbol" },
    { title: "Asset", dataIndex: "name", key: "name" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Bid", dataIndex: "bid", key: "bid" },
    { title: "Ask", dataIndex: "ask", key: "ask" },
    {
      title: "Current Value",
      dataIndex: "currentValue",
      key: "currentValue",
    },
    { title: "Cost Basis", dataIndex: "costBasis", key: "costBasis" },

    {
      title: "Percentage of Account",
      dataIndex: "percentOfAccount",
      key: "percentOfAccount",
    },
    {
      title: "Total Gain/Loss",
      dataIndex: "gain",
      key: "gain",
      onCell: (record: any) => ({
        style: {
          color: (parseCash(record.gain) < 0) ? "red": "black",
        }
      })
    },
    {
      title: "Total Gain/Loss %",
      dataIndex: "gainPercent",
      key: "gainPercent",
      onCell: (record: any) => ({
        style: {
          color: (parsePercent(record.gainPercent) < 0) ? "red": "black",
        }
      })
    },
  ];

  const tablePaginationConfig: TablePaginationConfig = {
    pageSize: 100,
  };

  return (
    <div className="Positions">
      <header className="Overview-header">
        {data === undefined ? (
          <div>
            <Spin size="default" />
          </div>
        ) : (
          <Table
            dataSource={data}
            columns={columns}
            pagination={tablePaginationConfig}
          />
        )}
      </header>
    </div>
  );
}

export default Positions;
