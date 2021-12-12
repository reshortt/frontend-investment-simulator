import { ChangeEvent, useEffect, useState } from "react";
import Autocomplete from "react-autocomplete";
import { getAssets, getShareCount, getStockPrice } from "../APIService";
import { Asset, COMMISSION, StockPrices } from "../types";

export default function Sell() {
  const [assets, setAssets] = useState<Asset[]>();
  const [asset, setAsset] = useState<Asset|null>();
  const [sharesToCell, setSharesToCell] = useState(0);
  const [price, setPrice] = useState<StockPrices>({
    bid: 0,
    ask: 0,
    previousClose: 0,
  });

  // TODO: assetName prolly  not used - delete it
  const [assetName, setAssetName] = useState<string>("");
  const [loadingPrice, setLoadingPrice] = useState<boolean>(false);

  const handleAssetChange = (val: ChangeEvent<HTMLSelectElement>) => {
    const thisAsset = assets?.find(
      (currAsset) => currAsset.symbol === val.target.value
    );
    console.log(
      "Asset changed to ",
      thisAsset?.name,
      " and ",
      thisAsset?.symbol
    );
    setAsset(thisAsset)
 
  };

  const handleSharesToSell = (e: ChangeEvent<HTMLInputElement>) => {
    setSharesToCell(e.target.valueAsNumber);
  };

  useEffect(() => {
    getAssets().then( (foundAssets) => {
      setAssets(foundAssets)
      if (foundAssets && foundAssets.length > 0)
        setAsset(foundAssets[0])
    });
  }, []);

  useEffect(() => {
    if (asset) {
      setLoadingPrice(true)
      getStockPrice(asset.symbol).then((foundPrice) => {
        console.log("Setting price to ", foundPrice);
        setPrice(foundPrice);
        setLoadingPrice(false);
      });
    }
  }, [asset]);

  // items={[{ label: "apple" }, { label: "banana" }, { label: "pear" }]}

  // const getAssetArray:any[] = () => {

  //   return assets?.map((currAsset) => {
  //     return {label:  "`currAsset.symbol`};
  //   })

  // }

  // if (assets && assets.length > 0)
  //   setAsset(assets[0])

  return (
    <div>
      <label> Stock </label>
      <select name="asset" onChange={handleAssetChange}>
        {assets?.map((currAsset) => {
          return <option> {currAsset.symbol} </option>;
        })}
      </select>

      <label> {asset?.name} </label>
      <label> {"(" + getShareCount(asset) + " shares available to sell)"}   </label>
      <br />

      <label> Test Stock  </label>

      <Autocomplete
        getItemValue={(item) => item.label}
        items={[{ label: "stock 1" }, { label: "stock 2" }, { label: "stock 4" }]}
        renderItem={(item, isHighlighted) => (
          <div style={{ background: isHighlighted ? "lightgray" : "white" }}>
            {item.label}
          </div>
        )}
        value={assetName}
        onChange={(e) => setAssetName(e.target.value)}
        onSelect={(val) => setAssetName(val)}
      />
      <br />

      <label>Current Bid Price </label>
      <label> ${loadingPrice ? "..." : price.bid}</label>
      <br />

      <label>Shares to sell </label>
      <input type="number" onChange={handleSharesToSell} />
      <br />

      <label>Commission</label>
      <label> {" "}
        ${loadingPrice
          ? "..."
          : sharesToCell > 0
          ? COMMISSION
          : 0}{" "}
      </label>
      <br />

      <label>Total Proceeds </label>
      <label> ${loadingPrice ? "..." : sharesToCell > 0?  (price.ask * sharesToCell - COMMISSION) : 0} </label>
      <br />

      <button>Confirm Sale</button>
    </div>
  );
}
