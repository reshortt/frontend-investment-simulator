import { ChangeEvent, useEffect, useState } from "react";
import Autocomplete from "react-autocomplete";
import { buyAsset, getAssets, getShareCount, getStockPrice, sellAsset } from "../APIService";
import { formatCurrency } from "../Calculations";
import { Asset, COMMISSION, StockPrices } from "../types";

export default function Sell() {
  const [assets, setAssets] = useState<Asset[]>();
  const [asset, setAsset] = useState<Asset | null>();
  const [sharesToSell, setSharesToSell] = useState(0);
  const [price, setPrice] = useState<StockPrices>({
    bid: 0,
    ask: 0,
    previousClose: 0,
  });

  const [loadingPrice, setLoadingPrice] = useState<boolean>(false);

  const handleAssetChange = (val: ChangeEvent<HTMLSelectElement>) => {
    const thisAsset = assets?.find(
      (currAsset) => currAsset.stock.symbol === val.target.value
    );
    console.log(
      "Asset changed to ",
      thisAsset?.stock.name,
      " and ",
      thisAsset?.stock.symbol
    );
    setAsset(thisAsset);
  };

  const handleSharesToSell = (e: ChangeEvent<HTMLInputElement>) => {
    setSharesToSell(e.target.valueAsNumber);
  };

  const handleSale = async () => {
    if (sharesToSell >  getShareCount(asset)) {
      window.alert("Insufficient shares for this sale")
      return
    }

    if (asset) {

      const totalCost:number = price.bid * sharesToSell - COMMISSION;
      const msg: string =
        "Please confirm sale of " +
        sharesToSell +
        " shares of " +
        asset.stock.name +
        " for a total of $" +
        totalCost +
        ".";
      const isOK: boolean = window.confirm(msg);

      if (isOK) {
        const response = await sellAsset(
          asset.stock.symbol,
          sharesToSell,
          price.ask || 0
        );
        if (response) {
          window.alert("Sale confirmed. New cash balance is " +  formatCurrency(response.remainingCash));
          window.location.assign("/positions");
        } else {
          window.alert("Sale failed: " + response);
        }
      } else alert("Sale cancelled");
    }

  }

  useEffect(() => {
    getAssets().then((foundAssets) => {
      setAssets(foundAssets);
      if (foundAssets && foundAssets.length > 0) setAsset(foundAssets[0]);
    });
  }, []);

  useEffect(() => {
    if (asset) {
      setLoadingPrice(true);
      getStockPrice(asset.stock.symbol).then((foundPrice) => {
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
          return <option> {currAsset.stock.symbol} </option>;
        })}
      </select>

      <label> {asset?.stock.name} </label>
      <label>
        {" "}
        {"(" + getShareCount(asset) + " shares available to sell)"}{" "}
      </label>
      <br />

      {/* <label> Test Stock  </label>

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
      <br /> */}

      <label>Current Bid Price </label>
      <label> ${loadingPrice ? "..." : price.bid}</label>
      <br />

      <label>Shares to sell </label>
      <input type="number" onChange={handleSharesToSell} />
      <br />

      <label>Commission</label>
      <label>
        {" "}
        ${loadingPrice ? "..." : sharesToSell > 0 ? COMMISSION : 0}{" "}
      </label>
      <br />

      <label>Total Proceeds </label>
      <label>
        {" "}
        $
        {loadingPrice
          ? "..."
          : sharesToSell > 0
          ? price.ask * sharesToSell - COMMISSION
          : 0}{" "}
      </label>
      <br />

      <button onClick={handleSale}>Sell</button>
    </div>
  );
}
