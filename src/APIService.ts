import { AUTH_TOKEN_KEY } from "./constants";
import {
  Asset,
  Dividend,
  SpotPrice,
  Transaction,
  Account,
  UserInfo,
  HistoricalPrice,
} from "./types";
import fetch, { RequestInit } from "node-fetch";
const Hashes = require("jshashes");
const MD5 = new Hashes.MD5();

const encryptPassword = (clearText: string): string => {
  return MD5.hex(clearText);
};

const createRequestAuthorization = (methodType = "GET"): RequestInit => {
  return {
    method: methodType,
    headers: {
      authorization: `Bearer ${sessionStorage.getItem(AUTH_TOKEN_KEY)}`,
    },
  };
};

export const isLoggedIn = (): boolean =>
  !!sessionStorage.getItem(AUTH_TOKEN_KEY);

export const doLogout = () => {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  window.location.assign("/login");
};

export const doSignup = async (
  email: string,
  password: string,
  name: string
): Promise<boolean> => {
  const encryptedPassword: string = encryptPassword(password);
  console.log(
    "signing up with clear password = ",
    password,
    ", encrypted =",
    encryptedPassword
  );

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: encryptedPassword,
      name: name,
    }),
  };
  const response = await fetch("http://ec2-54-144-18-145.compute-1.amazonaws.com/signup", requestOptions);

  const status: number = response.status;
  const json: string = await response.json();

  if (status === 200) {
    return true;
  } else {
    console.log("Signup failed: " + JSON.stringify(json));
    return false;
  }
};

export const doLogin = async (
  email: string,
  password: string
): Promise<boolean> => {
  const encryptedPassword: string = encryptPassword(password);

  console.log(
    "logging in with clear password = ",
    password,
    ", encrypted =",
    encryptedPassword
  );
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password:encryptedPassword }),
  };
  const response = await fetch("http://ec2-54-144-18-145.compute-1.amazonaws.com/login", requestOptions);

  switch (response.status) {
    case 200:
      const responseObj = await response.json();
      sessionStorage.setItem(AUTH_TOKEN_KEY, responseObj.token);
      console.log("Successful login: " + responseObj);
      // TODO log someone in, make it available everywhere

      return true;

    case 401:
    case 400:
      // todo: better way to show error
      console.log("unsuccessful login for user " + email);
      return false;

    default:
      // 500 is possible for critical server erropr
      console.log("unexpected login response");
      return false;
  }
};

export const getAccount = async (): Promise<Account | null> => {
  const requestOptions = createRequestAuthorization();
  const response = await fetch(
    "http://ec2-54-144-18-145.compute-1.amazonaws.com/API/getAccount",
    requestOptions
  );

  switch (response.status) {
    case 200:
      const account: Account = await response.json();
      return account;

    case 401:
      // todo: better way to show error
      console.log(await response.json());
      return null;

    default:
      // 500 is possible for critical server erropr
      console.log("unexpected getAccount response");
      return null;
  }
};

export const getUserInfo = async (): Promise<UserInfo | null> => {
  const requestOptions = createRequestAuthorization();
  const response = await fetch(
    "http://ec2-54-144-18-145.compute-1.amazonaws.com/API/getUserInfo",
    requestOptions
  );

  switch (response.status) {
    case 200:
      const userResponseObj = await response.json();
      return userResponseObj;

    case 401:
      // todo: better way to show error
      console.log(await response.json());
      return null;

    default:
      // 500 is possible for critical server erropr
      console.log("unexpected getUser response");
      return null;
  }
};

export const getBalance = async (yesterday: boolean): Promise<number> => {
  const requestOptions = createRequestAuthorization();
  const getBalanceUrl = new URL("http://ec2-54-144-18-145.compute-1.amazonaws.com/API/getBalance");
  const getBalanceQueryParams = new URLSearchParams({
    yesterday: `${yesterday}`,
  });
  getBalanceUrl.search = getBalanceQueryParams.toString();
  const response = await fetch(getBalanceUrl, requestOptions);

  switch (response.status) {
    case 200:
      const userResponseObj = await response.json();
      return userResponseObj.balance;

    case 401:
      // todo: better way to show error
      console.log(await response.json());
      return userResponseObj;

    default:
      // 500 is possible for critical server erropr
      console.log("unexpected getUser response");
      return userResponseObj;
  }
};

export const getAssets = async (): Promise<Asset[]> => {
  const requestOptions = createRequestAuthorization();

  const response = await fetch(
    "http://ec2-54-144-18-145.compute-1.amazonaws.com/API/getAssets",
    requestOptions
  );

  switch (response.status) {
    case 200:
      const userResponseObj = await response.json();

      console.log("Assets retrieved: " + userResponseObj.assets);
      return userResponseObj.assets;

    case 401:
      // todo: better way to show error
      console.log(await response.json());
      return userResponseObj;

    default:
      // 500 is possible for critical server erropr
      console.log("unexpected getAssets response");
      return userResponseObj;
  }
};

export const getTransactions = async (): Promise<Transaction[]> => {
  const requestOptions = createRequestAuthorization();

  const response = await fetch(
    "http://ec2-54-144-18-145.compute-1.amazonaws.com/API/getTransactions",
    requestOptions
  );

  switch (response.status) {
    case 200:
      const userResponseObj = await response.json();

      //console.log("Transactions retrieved: " + userResponseObj.transactions);
      return userResponseObj.transactions;

    case 401:
      // todo: better way to show error
      console.log(await response.json());
      return userResponseObj;

    default:
      // 500 is possible for critical server erropr
      console.log("unexpected getAssets response");
      return userResponseObj;
  }
};

export const getCash = async (): Promise<number> => {
  const requestOptions = createRequestAuthorization();

  const response = await fetch(
    "http://ec2-54-144-18-145.compute-1.amazonaws.com/API/getCash",
    requestOptions
  );

  switch (response.status) {
    case 200:
      const userResponseObj = await response.json();

      console.log("Transactions retrieved: " + userResponseObj.cash);
      return userResponseObj.cash;

    case 401:
      // todo: better way to show error
      console.log(await response.json());
      return userResponseObj;

    default:
      // 500 is possible for critical server erropr
      console.log("unexpected getAssets response");
      return userResponseObj;
  }
};
//TODO: don't lookup empty or null string
export const lookupTicker = async (
  tickerSymbol: string
): Promise<string | null> => {
  console.log("Looking up ticker: " + tickerSymbol + ".......");

  // TODO: credentials not needed for stocklookup. ...remove
  const requestOptions = createRequestAuthorization();

  const lookupTickerURL = new URL("http://ec2-54-144-18-145.compute-1.amazonaws.com/API/lookupTicker");
  const getTickerLookupParams = new URLSearchParams({
    tickerSymbol: tickerSymbol,
  });
  lookupTickerURL.search = getTickerLookupParams.toString();

  const response = await fetch(lookupTickerURL, requestOptions);

  console.log("ticker lookup: ", response.status, " - ", response.json);

  switch (response.status) {
    case 200:
      const userResponseObj: string = await response.text();
      return userResponseObj;

    case 400:
      // todo: better way to show error
      //console.log(await response.json());
      return null;

    default:
      // 500 is possible for critical server erropr
      console.log("unexpected lookupTicker response");
      return null;
  }
};

export async function getHistoricalDividends(
  symbol: string
): Promise<Dividend[]> {
  const requestOptions = createRequestAuthorization();

  const queryParams = new URLSearchParams({ ticker: symbol });

  const queryURL = new URL("http://ec2-54-144-18-145.compute-1.amazonaws.com/API/getHistoricalDividends");
  queryURL.search = queryParams.toString();

  const response = await fetch(queryURL, requestOptions);

  switch (response.status) {
    case 200: {
      return await response.json();
    }

    default:
      // 500 is possible for critical server erropr
      console.log("unexpected getDividends response");
      return [];
  }
}

export async function getStockPriceOnDate(
  symbol: string,
  date: Date
): Promise<number> {
  const requestOptions = createRequestAuthorization();

  const queryParams = new URLSearchParams({
    ticker: symbol,
    date: date.toDateString(),
  });
  const queryURL = new URL("http://ec2-54-144-18-145.compute-1.amazonaws.com/API/getStockPriceOnDate");
  queryURL.search = queryParams.toString();

  const response = await fetch(queryURL, requestOptions);
  switch (response.status) {
    case 200: {
      const responseObj = await response.json();

      return responseObj.price;
    }

    default:
      // 500 is possible for critical server erropr
      console.log("unexpected buyAsset response");
      return 0;
  }
}

export async function getHistoricalPrices(
  symbol: string,
  startDate: Date
): Promise<HistoricalPrice[]> {
  const requestOptions = createRequestAuthorization();

  const queryParams = new URLSearchParams({
    ticker: symbol,
    date: startDate.toDateString(),
  });
  const queryURL = new URL("http://ec2-54-144-18-145.compute-1.amazonaws.com/API/getHistoricalPrices");
  queryURL.search = queryParams.toString();

  const response = await fetch(queryURL, requestOptions);
  switch (response.status) {
    case 200: {
      const responseObj = await response.json();
      return responseObj
    }

    default:
      // 500 is possible for critical server erropr
      console.log("unexpected buyAsset response");
      return [];
  }
}

export type BuyAssetResponse = {
  successful: boolean;
  remainingCash: number;
};

export const buyAsset = async (
  symbol: string,
  shares: number,
  price: number
): Promise<BuyAssetResponse> => {
  // TODO: credentials not needed for stocklookup.remove
  const requestOptions = createRequestAuthorization();

  const sharesString: string = shares.toString();
  const priceString: string = price.toString();
  const buySharesURL = new URL("http://ec2-54-144-18-145.compute-1.amazonaws.com/API/buyAsset");
  const buySharesQueryParams = new URLSearchParams({
    tickerSymbol: symbol,
    shares: sharesString,
    price: priceString,
  });
  buySharesURL.search = buySharesQueryParams.toString();

  const response = await fetch(buySharesURL, requestOptions);

  switch (response.status) {
    case 200: {
      const userResponseObj = await response.json();
      const cashRemainingAfterPurchase: number = userResponseObj.cash;
      return { successful: true, remainingCash: cashRemainingAfterPurchase };
    }

    default:
      // 500 is possible for critical server erropr
      console.log("unexpected buyAsset response");
      return { successful: false, remainingCash: 0 };
  }
};

export type SellAssetResponse = {
  successful: boolean;
  remainingCash?: number;
};

export const sellAsset = async (
  symbol: string,
  shares: number,
  price: number
) => {
  const requestOptions = createRequestAuthorization();

  const sharesString: string = shares.toString();
  const priceString: string = price.toString();
  const sellAssetURL = new URL("http://ec2-54-144-18-145.compute-1.amazonaws.com/API/sellAsset");
  const sellAssetQueryParams = new URLSearchParams({
    tickerSymbol: symbol,
    shares: sharesString,
    price: priceString,
  });
  sellAssetURL.search = sellAssetQueryParams.toString();

  const response = await fetch(sellAssetURL, requestOptions);

  console.log("response: ", response.status);

  switch (response.status) {
    case 200: {
      const userResponseObj = await response.json();
      const cashRemainingAfterPurchase: number = userResponseObj.cash;
      return { successful: true, remainingCash: cashRemainingAfterPurchase };
    }

    default:
      // 500 is possible for critical server erropr
      console.log("unexpected getAssets response");
      return false;
  }
};

export const getStockPrice = async (
  tickerSymbol: string
): Promise<SpotPrice> => {
  // TODO: credentials not needed for stocklookup.remove
  const requestOptions = createRequestAuthorization();

  const getStockPriceUrl = new URL("http://ec2-54-144-18-145.compute-1.amazonaws.com/API/getStockPrice");
  const getStockPriceQueryParams = new URLSearchParams({
    tickerSymbol: tickerSymbol,
  });
  getStockPriceUrl.search = getStockPriceQueryParams.toString();

  const response = await fetch(getStockPriceUrl, requestOptions);

  const userResponseObj = await response.json();
  console.log("Get Stock Price Response:: ", userResponseObj);

  switch (response.status) {
    case 200:
      //const userResponseObj = await response.json();
      return userResponseObj;

    case 401:
      // todo: better way to show error
      console.log(await response.json());
      return userResponseObj;

    default:
      // 500 is possible for critical server erropr
      console.log("unexpected getAssets response");
      return userResponseObj;
  }
};

export const getShareCount = (asset: Asset | null | undefined): number => {
  console.log(
    "get Share count for ",
    asset?.stock?.symbol,
    " with ",
    asset?.lots
  );

  var totalCount: number = 0;
  if (!asset) return 0;

  asset.lots.map((currLot) => {
    totalCount += currLot.shares;
  });

  console.log(" ---> share count = ", totalCount);
  return totalCount;
};
