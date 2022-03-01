import { Button, Form, Input, Spin } from "antd";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import {
  buyAsset,
  BuyAssetResponse,
  getCash,
  getStockPrice,
  lookupTicker,
} from "../APIService";
import { formatCurrency, getAccountValue } from "../Calculations";
import { COMMISSION } from "../types";

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
    setTypedSymbol(e.target.value.toUpperCase());
  };

  const handleSharesToBuy = (e: ChangeEvent<HTMLInputElement>) => {
    const typedValue: string = e.target.value;
    const shares: number = Number.parseInt(typedValue);
    if (shares) setSharesToBuy(shares);
    else setSharesToBuy(0);
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
            setLoadingPrice(true);
            getStockPrice(typedSymbol)
              .then((foundPrice) => {
                setLoadingPrice(false);
                setAskPrice(foundPrice.ask);
              })
              .catch((ex: Error) => {
                setLoadingPrice(false);
              });
          } else {
            setAskPrice(null);
          }
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
  const formItemLayout = {
    labelCol: {
      span: 2,
      offset: 0,
    },
    wrapperCol: {
      span: 6,
      offset: 1,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 3,
      span: 16,
    },
  };
  return (
    <Form name="buy" {...formItemLayout}>
      <Form.Item label="Stock">
        <Input 
          value={typedSymbol} 
          placeholder="Enter stock ticker symbol"
          onChange={handleTickerSymbol}
        ></Input>
        <>
          {loadingStock ? (
            <Spin size="small" />
          ) : (
            <label
              style={
                !!typedSymbol && !!companyName
                  ? { color: undefined }
                  : { color: "red" }
              }
            >
              {!typedSymbol
                ? ""
                : companyName
                ? companyName
                : "Invalid ticker symbol"}
            </label>
          )}{" "}
        </>
      </Form.Item>

      <Form.Item label="Current Ask Price">
        {loadingPrice || loadingStock ? (
          <Spin size="small" />
        ) : (
          <label>{askPrice ? formatCurrency(askPrice) : "Please enter a valid ticker symbol"}</label>
        )}
      </Form.Item>

      <Form.Item label="Shares to Buy">
        <Input
          placeholder={"Enter number of shares to buy"}
          onChange={handleSharesToBuy}
          value={sharesToBuy == 0 ? undefined : sharesToBuy}
        ></Input>
      </Form.Item>

      <Form.Item label="Commission">
        <label>{formatCurrency(COMMISSION)}</label>
      </Form.Item>

      <Form.Item label="Total Cost">
        {sharesToBuy > 0 && (loadingStock || loadingPrice) ? (
          <Spin size="small" />
        ) : (
          <label
            style={totalCost > cash ? { color: "red" } : { color: undefined }}
          >
            {sharesToBuy > 0
              ? formatCurrency(totalCost)
              : "Please enter the number of shares to buy"}
          </label>
        )}
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          onClick={handlePurchase}
          disabled={
            sharesToBuy == 0 ||
            loadingPrice ||
            loadingStock ||
            !companyName ||
            totalCost > cash
          }
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
