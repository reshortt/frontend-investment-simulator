import { ChangeEvent, useEffect, useState } from "react";
import { isSetAccessorDeclaration } from "typescript";
import { getStockPrice, lookupTicker } from "../APIService";
import { Asset, commission, StockPrices } from "../types";

const PLEASE_ENTER_VALID_STOCK:string = "Please enter a valid stock ticker symbol"

export default function Buy() {

  const [typedSymbol, setTypedSymbol] = useState("")
  const [companyName, setCompanyName] = useState<string|undefined>("")
  const [sharesToBuy, setSharesToBuy] = useState(0)
  const [price, setPrice] = useState<StockPrices>({bid:0, ask:0, previousClose:0});
  const [totalCost, setTotalCost] = useState<number>(0);
  const [asset, setAsset] = useState<Asset>();

  const checkTickerSymbol = (e: ChangeEvent<HTMLInputElement>) => {
    setTypedSymbol(e.target.value);
  }

  const handleSharesToBuy = (e: ChangeEvent<HTMLInputElement>) => {
    setSharesToBuy(e.target.valueAsNumber)
  }

  useEffect(() => {
    lookupTicker(typedSymbol).then((asset) => {
      console.log ("Setting company name to ", typedSymbol, "->", asset)
      setCompanyName (asset != undefined ?  asset.name : undefined);
      setAsset(asset)
      getStockPrice(asset?.symbol != undefined ? asset.symbol : "").then((foundPrice) => {
        console.log("Setting price to ", foundPrice)
        setPrice(foundPrice)
    } )    })
  }, [typedSymbol, sharesToBuy]);


  const getForegroundColor = (): string => {
    return companyName === undefined ? "red" : "black"
  }

  const getCompanyText = ():string => {
    const text:string = companyName === undefined ? PLEASE_ENTER_VALID_STOCK : companyName
    console.log("returning company text = ", {text});
    return text
  }

  const companyText:string = getCompanyText();
  console.log ("company text is ", companyText)

  return (
    <div>
    <label> Stock </label>
     <input type="text" onChange={checkTickerSymbol} />
      <label color = {getForegroundColor()}> {companyText} </label>
      <br/>
      <label>Current Ask Price </label>
      <label> ${price.ask}</label>
      <br />

      <label>Shares to buy </label>
      <input type="number" onChange={handleSharesToBuy} />
      <br/>

      <label> Commission </label>
      <label> ${commission} </label>
      <br/>

      <label>Total Cost </label> 
      <label> ${(price.ask * sharesToBuy) + commission} </label>
      <br/>
      <button>Confirm Purchase</button>


    </div>
  );
}