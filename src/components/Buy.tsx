import { ChangeEvent, useEffect, useState, useRef } from "react";
import { buyAsset, getCash, getStockPrice, lookupTicker } from "../APIService";
import { Asset, commission, StockPrices } from "../types";

const PLEASE_ENTER_VALID_STOCK: string =
  "Please enter a valid stock ticker symbol";

export default function Buy() {
  const [typedSymbol, setTypedSymbol] = useState("");
  const [sharesToBuy, setSharesToBuy] = useState<number>(0);
  const [price, setPrice] = useState<StockPrices | null>({
    bid: 0,
    ask: 0,
    previousClose: 0,
  });
  const [totalCost, setTotalCost] = useState<number>(0);
  const [shareCost, setShareCost] = useState<number>(0);
  const [asset, setAsset] = useState<Asset | null>();
  const [cash, setCash] = useState<number>(0);
  const currentTypedSymbol = useRef<string>("");

  const handleTickerSymbol = (e: ChangeEvent<HTMLInputElement>) => {
    setTypedSymbol(e.target.value);
  };

  const handleSharesToBuy = (e: ChangeEvent<HTMLInputElement>) => {
    setSharesToBuy(e.target.valueAsNumber | 0);
  };

  useEffect(() => {
    getCash().then((userCash: number) => {
      setCash(userCash);
    });
  }, []);

  useEffect(() => {
    currentTypedSymbol.current = typedSymbol;
    lookupTicker(typedSymbol).then((asset) => {
      if (typedSymbol === currentTypedSymbol.current) {
        console.log("Setting company name to ", typedSymbol, "->", asset);
        setAsset(asset);
        if (asset) {
          getStockPrice(asset.symbol).then((foundPrice) => {
            console.log("Setting price to ", foundPrice);
            setPrice(foundPrice);
          });
        } else {
          setPrice(null);
        }
      }
    });
  }, [typedSymbol]);

  useEffect(() => {
    if (asset != null && price != null) {
      const shareOnlyCost: number = sharesToBuy * price.ask;
      setShareCost(shareOnlyCost);
      setTotalCost(shareOnlyCost + commission);
    } else {
      setShareCost(0);
      setTotalCost(0);
    }
  }, [asset, price, sharesToBuy]);

  const getForegroundColor = (): string => {
    return !asset ? "red" : "black";
  };

  const getCompanyText = (): string => {
    const text: string = !asset ? PLEASE_ENTER_VALID_STOCK : asset.name;
    //console.log("returning company text = ", {text});
    return text;
  };

  const handlePurchase = () => {
    if (cash < totalCost) {
      console.log("You don't have enough cash for  that purchase ");
    } else {
      if (asset != null) buyAsset(asset, sharesToBuy);
    }
  };

  return (
    <div>
      <label> Stock </label>
      <input type="text" onChange={handleTickerSymbol} />
      <label color={getForegroundColor()}> {getCompanyText()} </label>
      <br />
      <label>Current Ask Price </label>
      <label> ${price ? price.ask : 0}</label>
      <br />

      <label>Shares to buy </label>
      <input type="number" onChange={handleSharesToBuy} />
      <br />

      <label>Share cost </label>
      <label> ${shareCost} </label>
      <br />

      <label> Commission </label>
      <label> ${commission} </label>
      <br />

      <label>Total Cost </label>
      <label> ${totalCost} </label>
      <br />

      <button onClick={handlePurchase}>Confirm Purchase</button>
    </div>
  );
}
