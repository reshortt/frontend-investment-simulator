import { ChangeEvent, useEffect, useState, useRef } from "react";
import { buyAsset, getCash, getStockPrice, lookupTicker } from "../APIService";
import { Asset, COMMISSION, StockPrices } from "../types";

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
  const [loading, setLoading] = useState<boolean>(false);

  //const currentTypedSymbol = useRef<string>("");
  //const isLoading = useRef<boolean>(false);

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
    console.log("1. loading -> ", true);
    setLoading(true);
    //isLoading.current = true;

    //currentTypedSymbol.current = typedSymbol;
    lookupTicker(typedSymbol).then((asset) => {
      // if (typedSymbol === currentTypedSymbol.current) {
      console.log("2. loading -> ", false);
      // setLoading(false);
      console.log("Setting company name to ", typedSymbol, "->", asset);
      setAsset(asset);
      if (asset) {
        //console.log("3. loading -> ", true);
        //setLoading(loading + 1);
        //isLoading.current = true;
        //setLoading(true);
        getStockPrice(asset.symbol).then((foundPrice) => {
          console.log("4. loading -> ", false);
          //setLoading(false);
          //isLoading.current = false;
          //console.log("Setting price to ", foundPrice);
          setPrice(foundPrice);
        });
      } else {
        setPrice(null);
      }
      //isLoading.current = false
      setLoading(false)

      //    }
    });
  }, [typedSymbol]);

  useEffect(() => {
    if (asset != null && price != null) {
      const shareOnlyCost: number = sharesToBuy * price.ask;
      setShareCost(shareOnlyCost);
      setTotalCost(
        shareOnlyCost > 0 ? shareOnlyCost + COMMISSION : shareOnlyCost
      );
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
      // TODO: throw dialog box    
      console.log("You don't have enough cash for  that purchase ");
    } else {
      if (asset != null) buyAsset(asset, sharesToBuy);
    }
  };

  console.log("isLoading is ========>>> ", loading, " before rendering")

  return (
    <div>
      <label> Stock </label>
      <input type="text" onChange={handleTickerSymbol} />
      <label color={getForegroundColor()}>
        {" "}
        {loading ? "..." : getCompanyText()}{" "}
      </label>
      <br />
      <label>Current Ask Price </label>
      <label> ${loading ? "..." : price ? price.ask : 0}</label>
      <br />

      <label>Shares to buy </label>
      <input type="number" onChange={handleSharesToBuy} />
      <br />

      <label>Share cost </label>
      <label> ${loading ? "..." : shareCost} </label>
      <br />

      <label> Commission </label>
      <label> ${loading ? "..." : shareCost > 0 ? COMMISSION : 0} </label>
      <br />

      <label>Total Cost </label>
      <label> ${loading ? "..." : totalCost} </label>
      <br />

      <button onClick={handlePurchase}>Confirm Purchase</button>
    </div>
  );
}
