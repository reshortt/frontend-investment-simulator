import { Button, Empty, Form, Input, Select, Spin } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import {
  getAssets,
  getShareCount,
  getStockPrice,
  sellAsset,
} from "../APIService";
import { formatCurrency } from "../Calculations";
import { Asset, COMMISSION, StockPrices } from "../types";

export default function Sell() {
  const [assets, setAssets] = useState<Asset[] | undefined>(undefined);
  const [loadingAssets, setLoadingAssets] = useState<boolean>(false);
  const [asset, setAsset] = useState<Asset | undefined>(undefined);
  const [sharesToSell, setSharesToSell] = useState(0);
  const [price, setPrice] = useState<StockPrices>({
    bid: 0,
    ask: 0,
    previousClose: 0,
  });

  const [loadingPrice, setLoadingPrice] = useState<boolean>(false);

  const handleAssetChange = (value: string) => {
    if (assets && value) {
      const foundAsset: Asset | undefined = assets.find(
        (currAsset) =>
          currAsset.stock.symbol.toUpperCase() === value.toUpperCase()
      );
      if (foundAsset) {
        setAsset(foundAsset);
        setSharesToSell(0);
      }
    }
  };

  const handleSharesToSell = (e: ChangeEvent<HTMLInputElement>) => {
    const typedValue: string = e.target.value;
    const shares: number = Number.parseInt(typedValue);
    if (shares) setSharesToSell(shares);
    else setSharesToSell(0);
  };

  const handleSale = async () => {
    if (sharesToSell > getShareCount(asset)) {
      window.alert("Insufficient shares for this sale");
      return;
    }

    if (asset) {
      const totalCost: number = price.bid * sharesToSell - COMMISSION;
      const msg: string =
        "Please confirm sale of " +
        sharesToSell +
        " shares of " +
        asset.stock.name +
        " for a total of " +
        formatCurrency(totalCost) +
        ".";
      const isOK: boolean = window.confirm(msg);

      if (isOK) {
        const response = await sellAsset(
          asset.stock.symbol,
          sharesToSell,
          price.bid || 0
        );
        if (response) {
          window.alert(
            "Sale confirmed. New cash balance is " +
              formatCurrency(response.remainingCash)
          );
          window.location.assign("/");
        } else {
          window.alert("Sale failed: " + response);
        }
      } else alert("Sale cancelled");
    }
  };

  useEffect(() => {
    setLoadingAssets(true);
    getAssets().then((foundAssets) => {
      setAssets(foundAssets);
      setLoadingAssets(false);
      if (foundAssets && foundAssets.length > 0) setAsset(foundAssets[0]);
    });
  }, []);

  useEffect(() => {
    if (asset) {
      setLoadingPrice(true);
      setSharesToSell(0);

      getStockPrice(asset.stock.symbol).then((foundPrice) => {
        setPrice(foundPrice);
        setLoadingPrice(false);
      });
    }
  }, [asset]);

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
    <>
      {loadingAssets ? (
        <Spin size="large" />
      ) : !assets || assets.length == 0 ? (
        <Empty description="You do not have any stocks to sell"></Empty>
      ) : (
        <Form name="sell" {...formItemLayout}>
          <Form.Item label="Stock">
            <Select
              onChange={handleAssetChange}
              defaultValue={assets[0].stock.symbol}
              value={asset?.stock.symbol}
            >
              {assets.map((currAsset) => {
                return (
                  <Select.Option value={currAsset.stock.symbol}>
                    {currAsset.stock.name +
                      "  (" +
                      currAsset.stock.symbol +
                      ")"}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="Current Bid Price">
            {loadingPrice ? (
              <Spin size="small" />
            ) : (
              <label> {formatCurrency(price.bid)}</label>
            )}
          </Form.Item>

          <Form.Item label="Shares to Sell">
            <Input
              placeholder={
                asset
                  ? "" +
                    getShareCount(asset) +
                    " shares of " +
                    asset.stock.symbol +
                    " available to sell"
                  : "Enter number of shares to sell"
              }
              onChange={handleSharesToSell}
              value={sharesToSell == 0 ? undefined : sharesToSell}
              style={
                sharesToSell > getShareCount(asset)
                  ? { color: "red" }
                  : { color: undefined }
              }
            ></Input>
          </Form.Item>

          <Form.Item label="Commission">
            <label>{formatCurrency(COMMISSION)}</label>
          </Form.Item>

          <Form.Item label="Net Proceeds">
            {loadingPrice && sharesToSell > 0 ? (
              <Spin size="small" />
            ) : (
              <label>
                {sharesToSell > getShareCount(asset)
                  ? "You may sell a maximum of " +
                    getShareCount(asset) +
                    " shares of " +
                    asset?.stock.symbol
                  : sharesToSell == 0
                  ? "Please enter the number of shares to sell"
                  : sharesToSell > 0
                  ? formatCurrency(price.bid * sharesToSell - COMMISSION)
                  : 0}
              </label>
            )}
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              onClick={handleSale}
              disabled={
                !asset ||
                !price ||
                sharesToSell <= 0 ||
                sharesToSell > getShareCount(asset)
              }
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
