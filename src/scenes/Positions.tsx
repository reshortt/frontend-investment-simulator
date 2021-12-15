import { useEffect, useState } from "react";
import { getUser } from "../APIService";
import { Asset, UserInfo } from "../types";
import { Table } from "antd";

const jwt = require("jsonwebtoken");

function Positions() {
  const [user, setUser] = useState<UserInfo | null>();

  const getCostBasis = (asset: Asset): number => {
    var costBasis: number = 0;
    for (var lot of asset.lots) {
      console.log(lot);
      costBasis += lot.basis * lot.shares;
    }
    return costBasis;
  };

  const getQuantity = (asset: Asset): number => {
    var quantity: number = 0;
    for (var lot of asset.lots) {
      quantity += lot.shares;
    }
    return quantity;
  };

  const getAssetValue = (asset: Asset): number => {
    return getQuantity(asset) * (asset.price.bid || asset.price.previousClose);
  };

  const getAccountValue = (user: UserInfo): number => {
    var total: number = 0;
    for (var asset of user.assets) {
      total += getAssetValue(asset);
    }
    return total + user.cash;
  };

  const getPercentOfAccount = (user: UserInfo, asset: Asset): number => {
    console.log("percent of ", asset.name, ": ", (getAssetValue(asset) / getAccountValue(user)))
    return (getAssetValue(asset) / getAccountValue(user))
  };

  const getGainLoss = (asset: Asset): number => {
    return getAssetValue(asset) - getCostBasis(asset);
  };

  const getCash = (user: UserInfo): number => {
    return user.cash;
  };

  const formatCurrency = (money:number):string => {
      return "$" + new Intl.NumberFormat("en-us", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(money)
     }

     const formatPercent = (percent:number):string => {
         return new Intl.NumberFormat("en-us", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(100* percent) + "%"
     }

  const getData = (): object[] => {
    const data: object[] = [];
    if (user?.assets) {
      for (var asset of user?.assets) {
        data.push({
          name: asset.name,
          symbol: asset.symbol,
          lastPrice: formatCurrency(asset.price.bid || asset.price.previousClose),
          quantity: getQuantity(asset),
          costBasis: formatCurrency(getCostBasis(asset)),
          currentValue: formatCurrency(getAssetValue(asset)),
          percentOfAccount: formatPercent(getPercentOfAccount(user, asset)),
          gain: formatCurrency(getGainLoss(asset))
        });
      }
    }
    if (user) {
      data.push({
        name: "Cash",
        currentValue: formatCurrency(user.cash),
        percentOfAccount: formatPercent(getCash(user) / getAccountValue(user)),
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
    
      { title: "Percentage of Account", dataIndex: "percentOfAccount", key: "percentOfAccount" },
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

export default Positions;
