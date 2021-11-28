import { ChangeEvent, useEffect, useState } from "react";
import { getAssets } from "../APIService";
import Buy from "../components/Buy";
import Sell from "../components/Sell";

enum TradeType {
  BUY = "BUY",
  SELL = "SELL",
}

type TickerPropsType = {
  type: TradeType;
};

function TickerLabel(props: TickerPropsType) {
  return <label>Stock</label>;
}

function TickerInfo(props: TickerPropsType) {
  return <label>Apple, Inc</label>;
}

const handleBuyTickerChanged = (e: ChangeEvent<HTMLInputElement>) => {
  console.log("New ticker is ", e.target.value);
};

function BuyTicker() {
  const BuyTickerInput = () => (
    <input type="text" onChange={handleBuyTickerChanged} />
  );
  return (
    <div>
      <TickerLabel type={TradeType.BUY} />
      <BuyTickerInput />
      <TickerInfo type={TradeType.BUY} />
    </div>
  );
}
function SellTicker() {
  const SellTickerInput = () => (
    <select>
      <option value="TSLA">TSLA</option>
      <option value="AAPL">AAPL</option>
    </select>
  );
  return (
    <>
      <TickerLabel type={TradeType.SELL} />
      <SellTicker />
      <TickerInfo type={TradeType.SELL} />
    </>
  );
}
function BuyPrice() {
  return <p>'BUY PRICE'</p>;
}
function SellPrice() {
  return <p>'SELL Price'</p>;
}

function Trade() {
  const [tradeType, setTradeType] = useState(TradeType.BUY);
  const [assets, setAssets] = useState([]);
  const [ticker, setTicker] = useState("");
  const [price, setPrice] = useState(0);

  const [shares, setShares] = useState(0);
  const [commission, setCommission] = useState(0);
  const [total, setTotal] = useState(0);

  

  const handleTickerInput = (e: ChangeEvent<HTMLInputElement>) => {};

  const handleTradeType = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("trade type set to ", e.target.value);
    setTradeType(e.target.value as TradeType);
  };

  return (
    <div className="Trade">
      <label> Trade Type </label>
      <select name="TradeType" onChange={handleTradeType}>
        <option value={TradeType.BUY}>Buy</option>
        <option value={TradeType.SELL}>Sell</option>
      </select>

      {tradeType === TradeType.BUY ? <Buy /> : <Sell />}
    </div>
  );
}

export default Trade;
