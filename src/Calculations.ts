import { Asset, INITIAL_GIFT, User } from "./types";

export const getCostBasis = (asset: Asset): number => {
  var costBasis: number = 0;
  for (var lot of asset.lots) {
    console.log(lot);
    costBasis += lot.basis * lot.shares;
  }
  return costBasis;
};

export const getQuantity = (asset: Asset): number => {
  var quantity: number = 0;
  for (var lot of asset.lots) {
    quantity += lot.shares;
  }
  return quantity;
};

export const getAssetValue = (asset: Asset): number => {
  return getQuantity(asset) * (asset.price.bid || asset.price.previousClose);
};

export const getGain= (user:User):number =>  {
    return getAccountValue(user) - INITIAL_GIFT
}

export const getAccountValue = (user: User): number => {
  var total: number = 0;
  for (var asset of user.assets) {
    total += getAssetValue(asset);
  }
  return total + user.cash;
};

export const getPercentOfAccount = (user: User, asset: Asset): number => {
  console.log(
    "percent of ",
    asset.name,
    ": ",
    getAssetValue(asset) / getAccountValue(user)
  );
  return getAssetValue(asset) / getAccountValue(user);
};

export const getGainLoss = (asset: Asset): number => {
  return getAssetValue(asset) - getCostBasis(asset);
};

export const getCash = (user: User): number => {
  return user.cash;
};

export const formatCurrency = (money: number): string => {
  return (
    "$" +
    new Intl.NumberFormat("en-us", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(money)
  );
};

export const formatPercent = (percent: number): string => {
  return (
    new Intl.NumberFormat("en-us", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(100 * percent) + "%"
  );
};
