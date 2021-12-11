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
  //const [loading, setLoading] = useState<boolean>(false);

  const currentTypedSymbol = useRef<string>("");
  const [loadingStock, setLoadingStock] = useState<boolean>(false);
  const [loadingPrice, setLoadingPrice] = useState<boolean>(false);

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
    //setLoading(true);
    //isLoading.current = true;
    setLoadingStock(true);
    currentTypedSymbol.current = typedSymbol;
    lookupTicker(typedSymbol)
      .then((foundAsset) => {
        if (typedSymbol === currentTypedSymbol.current) {
          // console.log("2. loading -> ", false);
          // setLoading(false);
          setLoadingStock(false);
          console.log(
            "Setting company name to ",
            typedSymbol,
            "->",
            foundAsset
          );
          setAsset(foundAsset);
          if (foundAsset) {
            //console.log("3. loading -> ", true);
            //setLoading(loading + 1);
            //isLoading.current = true;
            //setLoading(true);
            setLoadingPrice(true);
            getStockPrice(foundAsset.symbol)
              .then((foundPrice) => {
                console.log("4. loading -> ", false);
                //setLoading(false);
                //isLoading.current = false;
                //console.log("Setting price to ", foundPrice);
                setLoadingPrice(false);
                setPrice(foundPrice);
              })
              .catch((ex: Error) => {
                setLoadingPrice(false);
              });
          } else {
            setPrice(null);
          }
          //isLoading.current = false
          setLoadingStock(false);
        }
      })
      .catch((ex: Error) => {
        setLoadingStock(false);
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
      window.alert("You don't have enough cash for  that purchase ");
    } else {
      if (asset) {
        const msg:string = "Please confirm purchase of " + sharesToBuy + " shares of " + asset.name + " for a total of $" + totalCost + "."
        const isOK:boolean = window.confirm(msg)
        if (isOK) {
         buyAsset(asset, sharesToBuy);
         window.alert("Purchase confirmed")
        }
        else 
          alert("Purchase cancelled");
      }
    }
  };

  console.log(
    "isLoadingPrice is ========>>> ",
    loadingPrice,
    " before rendering"
  );
  console.log(
    "isLoadingStock is ========>>> ",
    loadingStock,
    " before rendering"
  );

  return (
    <div>
      <label> Stock </label>
      <input type="text" onChange={handleTickerSymbol} />
      <label
        style={{ color: asset == null && !loadingStock ? "red" : undefined }}
      >
        {" "}
        {loadingStock ? "..." : getCompanyText()}{" "}
      </label>
      <br />
      <label>Current Ask Price </label>
      <label>
        {" "}
        ${loadingStock || loadingPrice ? "..." : price ? price.ask : 0}
      </label>
      <br />

      <label>Shares to buy </label>
      <input type="number" onChange={handleSharesToBuy} />
      <br />

      <label>Share cost </label>
      <label> ${loadingStock || loadingPrice ? "..." : shareCost} </label>
      <br />

      <label> Commission </label>
      <label>
        {" "}
        ${loadingStock || loadingPrice
          ? "..."
          : shareCost > 0
          ? COMMISSION
          : 0}{" "}
      </label>
      <br />

      <label>Total Cost </label>
      <label> ${loadingStock || loadingPrice ? "..." : totalCost} </label>
      <br />

      <button onClick={handlePurchase}>Buy</button>
    </div>
  );
}
