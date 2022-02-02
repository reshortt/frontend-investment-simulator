import { format, isValid } from "date-fns";
import { getHistoricalPrices, getTransactions } from "./APIService";
import {
  Asset,
  HistoricalPrice,
  INITIAL_GIFT,
  Transaction,
  TransactionType,
  User,
} from "./types";

const priceMap = new Map<string, HistoricalPrice[]>();

type Position = {
  symbol: string;
  shares: number;
};

type PortfolioSnapshot = {
  date: Date;
  positions: Position[];
  cash: number;
};

export type PortfolioValue = {
  date: Date;
  value: number;
};

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
  return (
    getQuantity(asset) *
    (asset.stock.price.bid || asset.stock.price.previousClose || 0)
  );
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

export const formateDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
  }).format(date);
};

export const formatPercent = (percent: number): string => {
  return (
    new Intl.NumberFormat("en-us", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(100 * percent) + "%"
  );
};

export const formatDate = (date: Date, long:boolean): string => {
  var dateToFormat: Date = new Date(date);
  if (!isValid(dateToFormat)) return "";
  const formatStr = long? "MMMM dd, yyyy" : "yyyy-MM-dd"

  return format(dateToFormat, formatStr);
};

async function getStockPriceOnDate(
  symbol: string,
  date: Date
): Promise<number> {
  let prices = priceMap.get(symbol);
  if (!prices || prices === undefined) {
    console.log ("Getting Price History for " + symbol + "...")
    prices = await getHistoricalPrices(symbol);
    priceMap.set(symbol, prices);
    console.log ("Finished getting Price History for ", symbol , ". Entries: ", prices.length)
  }

  let lastPrice: number = 0;
  let thisDate:Date = new Date(date)

  // brute force march from beginning to end
  for (let price of prices) {
    let priceDate:Date = new Date(price.date)

    if (priceDate > thisDate) {
        break
    } 
    lastPrice = price.price;
  }
  return lastPrice;
}


function getTransactionsOnDate(
  transactions: Transaction[],
  date: Date
): Transaction[] {
  let dateTransactions: Transaction[] = [];
  date.setHours(0, 0, 0, 0);
  for (let transaction of transactions) {
    let transactionDate: Date = new Date(transaction.date);
    transactionDate.setHours(0, 0, 0, 0);
    if (transactionDate > date) break;
    if (transactionDate.getTime() == date.getTime())
      dateTransactions.push(transaction);
  }
  return dateTransactions;
}

async function getPortfolioSnapshots(
  transactions: Transaction[]
): Promise<PortfolioSnapshot[]> {
  const tickerMap = new Map<string, number>();

  let snapshots: PortfolioSnapshot[] = [];
  const today: Date = new Date(Date.now());
  let cash: number = 0;

  for (
    let date: Date = new Date(transactions[0].date);
    date <= today;
    date.setDate(date.getDate() + 1)
  ) {
    const dateTransactions: Transaction[] = getTransactionsOnDate(
      transactions,
      date
    );

    for (let transaction of dateTransactions) {
      switch (transaction.type) {
        case TransactionType.BUY: {
          let shares: number | undefined = tickerMap.get(transaction.symbol);
          if (shares != undefined) shares += transaction.shares;
          else shares = transaction.shares;
          tickerMap.set(transaction.symbol, shares);
          cash -= transaction.amount;
          break;
        }
        case TransactionType.DIVIDEND: {
          cash += transaction.amount;
          break;
        }
        case TransactionType.SELL: {
          let shares: number | undefined = tickerMap.get(transaction.symbol);
          if (shares != undefined) shares -= transaction.shares;
          else {
            console.log("******** Error - sold shares that were not owned");
            shares = 0;
          }
          tickerMap.set(transaction.symbol, shares);
          cash += transaction.amount;
          break;
        }
        case TransactionType.GIFT: {
          cash += transaction.amount;
          break;
        }
      }
    }

    //console.log("ticker map is ", tickerMap);
    let positions: Position[] = [];

    tickerMap.forEach((shares: number, tickerSymbol: string) => {
      if (shares != undefined && shares > 0) {
        positions.push({ shares: shares, symbol: tickerSymbol });
      }
    });

    snapshots.push({ cash: cash, date: new Date(date), positions: positions });
  }

  return snapshots;
}

export const getHistoricalValues = async (
  transactions: Transaction[]
): Promise<PortfolioValue[]> => {
  const values: PortfolioValue[] = [];

  const snapshots: PortfolioSnapshot[] = await getPortfolioSnapshots(
    transactions
  );
  for (let snapshot of snapshots) {
    let value: number = 0;
    const snapshotDate:Date = new Date(snapshot.date)

    for (let position of snapshot.positions) {
      const price:number = await getStockPriceOnDate(position.symbol, snapshotDate)
      value += position.shares * price
    }
    value += snapshot.cash;
    values.push({ date: snapshotDate, value: value });

  }
  return values;
};


 // debug function only
 export const showHistoricalPrices = async () => {
  const values:PortfolioValue[] = await getHistoricalValues (await getTransactions())
  console.log("****************  Historical Values ***************************")
  for (let value of values) {
    console.log(value.date, ":  ", formatCurrency(value.value))   
  }
};
