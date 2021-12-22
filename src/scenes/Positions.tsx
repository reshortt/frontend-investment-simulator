import { useEffect, useState } from "react";
import { getUser } from "../APIService";
import { User } from "../types";
import { Table } from "antd";
import {
  formatCurrency,
  formatPercent,
  getAssetValue,
  getCostBasis,
  getGainLoss,
  getPercentOfAccount,
  getQuantity,
} from "../Calculations";

function Positions() {
  const [user, setUser] = useState<User | null>();

  const getData = (): object[] => {
    const data: object[] = [];
    if (user && user.assets) {
      for (var asset of user.assets) {
        console.log("pushing asset = ", JSON.stringify(asset))
        data.push({
          name: asset.stock.name,
          symbol: asset.stock.symbol,
          // lastPrice: formatCurrency(
          //   asset.stock.price.bid || asset.stock.price.previousClose
          // ),
          lastPrice: (asset.stock.price.bid || asset.stock.price.previousClose),
          quantity: getQuantity(asset),
          costBasis: formatCurrency(getCostBasis(asset)),
          currentValue: formatCurrency(getAssetValue(asset)),
          percentOfAccount: formatPercent(getPercentOfAccount(user, asset)),
          gain: formatCurrency(getGainLoss(asset)),
        });
      }
    }
    if (user) {
      data.push({
        name: "Cash",
        currentValue: formatCurrency(user.cash),
      });
    }
    return data;
  };

  const getColumns = (): object[] => {
    return [
      { title: "Symbol", dataIndex: "symbol", key: "symbol" },
      { title: "Asset", dataIndex: "name", key: "name" },
      { title: "Quantity", dataIndex: "quantity", key: "quantity" },
      { title: "Latest Price", dataIndex: "lastPrice", key: "lastPrice" },
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
      { title: "Total Gain/Loss", dataIndex: "gain", key: "gain" },
    ];
  };

  useEffect(() => {
    getUser().then((foundUser) => {
      setUser(foundUser);
    });
  }, []);

  return (
    <div className="Positions">
      <header className="Overview-header">
        <Table dataSource={getData()} columns={getColumns()} />
      </header>
    </div>
  );
}

export default Positions
