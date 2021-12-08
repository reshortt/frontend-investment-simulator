import { ChangeEvent, useEffect, useState } from "react";
import { getAssets, getStockPrice } from "../APIService";
import { Asset, COMMISSION, StockPrices } from "../types";

export default function Sell() {
    const [assets, setAssets] = useState<Asset[]>();
    const [asset, setAsset] = useState<Asset>();
    const [sharesToCell, setSharesToCell] = useState(0);
    const [price, setPrice] = useState<StockPrices>({bid:0, ask:0, previousClose:0});

  const handleAssetChange = (val: ChangeEvent<HTMLSelectElement>) => {
    const thisAsset = assets?.find((currAsset) => currAsset.symbol === val.target.value )
    console.log("Asset changed to ",  thisAsset?.name, " and ", thisAsset?.symbol)
    if (!!thisAsset) {
        console.log("Setting current assset to ", thisAsset.name)
        setAsset(thisAsset);
        getStockPrice(thisAsset.symbol).then((foundPrice) => {
            console.log("Setting price to ", foundPrice)
            setPrice(foundPrice)
        } )
    }
  };

  const handleSharesToSell = (e: ChangeEvent<HTMLInputElement>) => {
    setSharesToCell(e.target.valueAsNumber)
  }

  useEffect(() => {
    getAssets().then((foundAssets) => setAssets(foundAssets))
  }, [sharesToCell, asset]);

  return (
    <div>
      <label> Stock </label>
      <select name="asset" onChange={handleAssetChange}>
        {assets?.map(currAsset => {
           return <option> {currAsset.symbol} </option>
        })}
        
      </select>
      <label> {asset?.name} </label>
      <br />

      <label>Current Bid Price </label>
      <label> ${price.bid}</label>
      <br />

      <label>Shares to sell </label>
      <input type="number" onChange={handleSharesToSell} />
      <br />

      <label>Commission</label>
      <label> ${COMMISSION}</label>
      <br />

      <label>Total Proceeds </label>
      <label> ${price.ask * sharesToCell - COMMISSION} </label>
      <br />

      <button>Confirm Sale</button>
    </div>
  );
}
