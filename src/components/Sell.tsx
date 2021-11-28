import { ChangeEvent, useEffect, useState } from "react";
import { getAssets } from "../APIService";
import { Asset } from "../types";

export default function Sell() {
    const [assets, setAssets] = useState<Asset[]>();
    const [asset, setAsset] = useState<Asset>();

  const handleAssetChange = (val: ChangeEvent<HTMLSelectElement>) => {
    const thisAsset = assets?.find((currAsset) => currAsset.symbol === val.target.value )
    if (thisAsset)
        setAsset(thisAsset);
  };

  useEffect(() => {
    getAssets().then((foundAssets) => setAssets(foundAssets));
  }, []);

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

      <label>Current Bid Price</label>
      <label>$118.6</label>
      <br />

      <label>Current Shares</label>
      <input type="number" value="10" />
      <br />

      <label>Commission</label>
      <label>$15</label>
      <br />

      <label>Total Proceeds</label>
      <label>$1000.00</label>
      <br />

      <button>Confirm Sale</button>
    </div>
  );
}
