import { ChangeEvent, useState } from "react";
import Buy from "../components/Buy";
import Sell from "../components/Sell";

enum TradeType {
  BUY = "BUY",
  SELL = "SELL",
}

function Trade() {
  const [tradeType, setTradeType] = useState(TradeType.BUY);

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

export default Trade
