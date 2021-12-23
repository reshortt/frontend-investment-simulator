import moment from "moment";
import { format, isValid } from "date-fns";
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
  return getQuantity(asset) * (asset.stock.price.bid || asset.stock.price.previousClose || 0);
};

export const getGain = (user: User): number => {
  return getAccountValue(user) - INITIAL_GIFT;
};

export const getAccountValue = (user: User): number => {
  var total: number = 0;
  for (var asset of user.assets) {
    total += getAssetValue(asset);
  }
  return total + user.info.cash;
};

export const getPercentOfAccount = (user: User, asset: Asset): number => {
  console.log(
    "percent of ",
    asset.stock.name,
    ": ",
    getAssetValue(asset) / getAccountValue(user)
  );
  return getAssetValue(asset) / getAccountValue(user);
};

export const getGainLoss = (asset: Asset): number => {
  return getAssetValue(asset) - getCostBasis(asset);
};

export const getCash = (user: User): number => {
  return user.info.cash;
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

export const formateDate = (date: Date) : string => {
  return new Intl.DateTimeFormat("en-us", {
    dateStyle: 'full'
  }).format(date)
}

export const formatPercent = (percent: number): string => {
  return (
    new Intl.NumberFormat("en-us", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(100 * percent) + "%"
  );
};

// export const  formatDate = (date: Date): string => {
//   if (!date) return "";

//   var parsedDate = moment("MMMM dd, YYYY");
//   const origString:string = new Date(date).toString();
//   console.log("Trying to convert date: ", date, " -> ", origString)
//   const formatted:string = parsedDate.format(origString);
//   console.log("---> parsed to ", formatted)
//   return formatted
// };

export const formatDate = (date: Date): string => {
  var dateToFormat:Date = new Date(date)
  if (!isValid(dateToFormat)) return "";
  return format(dateToFormat, "MMMM dd, yyyy");
};
