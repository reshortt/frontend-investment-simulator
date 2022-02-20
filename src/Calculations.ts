import { format, isValid } from "date-fns";
import { getHistoricalPrices } from "./APIService";
import {
  Asset,
  INITIAL_GIFT,
  Transaction,
  TransactionType,
  Account,
  HistoricalPrice,
} from "./types";

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
    //console.log(lot);
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

export const getGain = (user: Account): number => {
  return getAccountValue(user) - INITIAL_GIFT;
};

export const getAccountValue = (user: Account): number => {
  var total: number = 0;
  for (var asset of user.assets) {
    total += getAssetValue(asset);
  }
  return total + user.info.cash;
};

export const getPercentOfAccount = (user: Account, asset: Asset): number => {
  return getAssetValue(asset) / getAccountValue(user);
};

export const getGainLoss = (asset: Asset): number => {
  return getAssetValue(asset) - getCostBasis(asset);
};

export const getCash = (user: Account): number => {
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

export const formatDate = (date: Date, long: boolean): string => {
  var dateToFormat: Date = new Date(date);
  if (!isValid(dateToFormat)) return "";
  const formatStr = long ? "MMMM dd, yyyy" : "yyyy-MM-dd";

  return format(dateToFormat, formatStr);
};

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
    if (transactionDate.getTime() === date.getTime())
      dateTransactions.push(transaction);
  }
  return dateTransactions;
}

function adjustForSplits(
  buyOrSell: Transaction,
  transactions: Transaction[]
): number {
  let shares: number = buyOrSell.shares;
  for (let transaction of transactions) {
    if (transaction.type == TransactionType.SPLIT && transaction.symbol.toUpperCase() == buyOrSell.symbol.toUpperCase()) {
      if (transaction.date > buyOrSell.date) {
        shares = shares * (transaction.to / transaction.from);
      }
    }
  }
  return shares;
}

async function getPortfolioSnapshots(
  transactions: Transaction[]
): Promise<PortfolioSnapshot[]> {
  const tickerMap = new Map<string, number>();

  let snapshots: PortfolioSnapshot[] = [];
  let cash: number = 0;
  const startDate: Date = new Date(transactions[0].date);
  const endDate: Date = new Date(Date.now());
  endDate.setDate(endDate.getDate() - 2);

  for (
    let date: Date = startDate;
    date < endDate;
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
          const adjustedShares = adjustForSplits(transaction, transactions);
          if (shares !== undefined) shares += adjustedShares;
          else shares = adjustedShares;
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
          const adjustedShares = adjustForSplits(transaction, transactions);
          if (shares !== undefined) shares -= adjustedShares;
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
      if (shares !== undefined && shares > 0) {
        positions.push({ shares: shares, symbol: tickerSymbol });
      }
    });

    snapshots.push({ cash: cash, date: new Date(date), positions: positions });
  }

  return snapshots;
}

const priceMap: Map<string, HistoricalPrice[]> = new Map();

const getPriceHistory = async (
  symbol: string,
  startDate: Date
): Promise<HistoricalPrice[]> => {
  let prices: HistoricalPrice[] | undefined = priceMap.get(symbol);
  if (prices) return prices;

  prices = await getHistoricalPrices(symbol, startDate);
  priceMap.set(symbol, prices);
  return prices;
};

const getStockPriceOnDateLocal = async (
  symbol: string,
  date: Date
): Promise<number> => {
  const history: HistoricalPrice[] = await getPriceHistory(symbol, date);

  for (let data of history) {
    const historicalDate:Date = new Date(data.date)
    if (historicalDate >= date)  {
      //console.log(symbol, "price on ", date, ": ", data.price)
      return data.price
    }
  }
  console.log(symbol, "price on ", date, ": ", 0)
  return 0;
};

export const getHistoricalValues = async (
  transactions: Transaction[]
): Promise<PortfolioValue[]> => {
  const values: PortfolioValue[] = [];

  const snapshots: PortfolioSnapshot[] = await getPortfolioSnapshots(
    transactions
  );

  for (let snapshot of snapshots) {
    let value: number = 0;
    const snapshotDate: Date = new Date(snapshot.date);
    //var debugMsg:string = "Date: " + snapshotDate + ": "

    for (let position of snapshot.positions) {
      const price: number = await getStockPriceOnDateLocal(
        position.symbol,
        snapshotDate
      );
      //debugMsg += ("-- " + position.shares + " of " + position.symbol + " at " + price)
      value += position.shares * price;
    }
    //debugMsg += ("-- cash: " + snapshot.cash)
    value += snapshot.cash;

    //console.log(debugMsg)
    values.push({ date: snapshotDate, value: value });
  }

  priceMap.clear();

  return values;
};

export const calcSharePrice = (transaction: Transaction): number => {
  if (transaction.type == TransactionType.BUY) {
    return (transaction.amount - transaction.commission) / transaction.shares;
  } else {
    const perShare: number =
      (transaction.amount + transaction.commission) / transaction.shares;
    return perShare;
  }
};
