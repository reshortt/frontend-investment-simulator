import { ChangeEvent, useEffect, useState, useRef } from "react";
import { getSystemErrorMap } from "util";
import {
  buyAsset,
  BuyAssetResponse,
  getCash,
  getHistoricalPrices,
  getStockPrice,
  lookupTicker,
} from "../APIService";
import { formatCurrency } from "../Calculations";
import { COMMISSION, HistoricalPrice, StockPrices } from "../types";

const PLEASE_ENTER_VALID_STOCK: string =
  "Please enter a valid stock ticker symbol";

export default function Buy() {
  const [typedSymbol, setTypedSymbol] = useState("");
  const [sharesToBuy, setSharesToBuy] = useState<number>(0);
  const [askPrice, setAskPrice] = useState<number | null>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [shareCost, setShareCost] = useState<number>(0);
  const [companyName, setCompanyName] = useState<string | null>(null);
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
    setLoadingStock(true);
    currentTypedSymbol.current = typedSymbol;
    lookupTicker(typedSymbol)
      .then((foundCompanyName: string | null) => {
        if (typedSymbol === currentTypedSymbol.current) {
          setLoadingStock(false);
          setCompanyName(foundCompanyName);
          if (foundCompanyName) {
            //console.log("3. loading -> ", true);
            //setLoading(loading + 1);
            //isLoading.current = true;
            //setLoading(true);
            setLoadingPrice(true);
            getStockPrice(typedSymbol)
              .then((foundPrice) => {
                //setLoading(false);
                //isLoading.current = false;
                //console.log("Setting price to ", foundPrice);
                setLoadingPrice(false);
                setAskPrice(foundPrice.ask);
              })
              .catch((ex: Error) => {
                setLoadingPrice(false);
              });
          } else {
            setAskPrice(null);
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
    if (companyName != null && askPrice != null) {
      const shareOnlyCost: number = sharesToBuy * askPrice;
      setShareCost(shareOnlyCost);
      setTotalCost(
        shareOnlyCost > 0 ? shareOnlyCost + COMMISSION : shareOnlyCost
      );
    } else {
      setShareCost(0);
      setTotalCost(0);
    }
  }, [companyName, askPrice, sharesToBuy]);

  const getForegroundColor = (): string => {
    return !companyName ? "red" : "black";
  };

  const getCompanyText = (): string => {
    const text: string = !companyName ? PLEASE_ENTER_VALID_STOCK : companyName;
    //console.log("returning company text = ", {text});
    return text;
  };

  // debug function only
  const showHistoricalPrices = async (tickerSymbol: string) => {
    const prices: HistoricalPrice[] = await getHistoricalPrices(tickerSymbol);
    console.log(
      "Historical Prices for " + tickerSymbol + ":\n" + JSON.stringify(prices)
    );
  };

  const handlePurchase = async () => {
    if (cash < totalCost) {
      window.alert("You don't have enough cash for  that purchase ");
      return;
    }
    if (companyName) {
      const msg: string =
        "Please confirm purchase of " +
        sharesToBuy +
        " shares of " +
        companyName +
        " for a total of " +
        formatCurrency(totalCost) +
        ".";
      const isOK: boolean = window.confirm(msg);
      if (isOK) {
        buyAsset(typedSymbol, sharesToBuy, askPrice || 0).then(
          (buyAssetResponse: BuyAssetResponse) => {
            const { successful, remainingCash } = buyAssetResponse;
            if (successful) {
              window.alert(
                "Purchase successful. New cash balance is " +
                  formatCurrency(remainingCash)
              );
              window.location.assign("/transactions");
              // console.log("showing historical prices *****************************************************")
              // showHistoricalPrices(typedSymbol);
            }
          },
          () => {
            window.alert(
              "Purchase was not executed due to critical server error"
            );
          }
        );
      }
    } else {
      window.alert("Purchase cancelled");
    }
  };

  return (
    <div>
      <label> Stock </label>
      <input type="text" onChange={handleTickerSymbol} />
      <label
        style={{
          color: companyName === null && !loadingStock ? "red" : undefined,
        }}
      >
        {" "}
        {loadingStock ? "..." : getCompanyText()}{" "}
      </label>
      <br />
      <label>Current Ask Price </label>
      <label> {loadingStock || loadingPrice ? "..." : (askPrice? formatCurrency(askPrice) : formatCurrency(0)) || 0}</label>
      <br />

      <label>Shares to buy </label>
      <input type="number" onChange={handleSharesToBuy} />
      <br />

      <label>Share cost </label>
      <label> {loadingStock || loadingPrice ? "..." : formatCurrency(shareCost)} </label>
      <br />

      <label> Commission </label>
      <label>
        {" "}
        {loadingStock || loadingPrice
          ? "..."
          : shareCost > 0
          ? formatCurrency(COMMISSION)
          : 0}{" "}
      </label>
      <br />

      <label>Total Cost </label>
      <label> {loadingStock || loadingPrice ? "..." : formatCurrency(totalCost)} </label>
      <br />

      <button onClick={handlePurchase}>Buy</button>
    </div>
  );
}
