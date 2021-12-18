import { AUTH_TOKEN_KEY } from "./constants";
import { Asset, StockPrices, Transaction, User } from "./types";
import fetch, { RequestInit } from "node-fetch";

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

export const doLogin = async (
  email: string,
  password: string
): Promise<boolean> => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  const response = await fetch("http://localhost:3005/login", requestOptions);

  switch (response.status) {
    case 200:
      const responseObj = await response.json();
      sessionStorage.setItem(AUTH_TOKEN_KEY, responseObj.token);
      console.log("Successful login: " + responseObj);
      // TODO log someone in, make it available everywhere

      window.location.assign("/overview");
      return true;

    case 401:
      // todo: better way to show error
      console.log(await response.json());
      return false;

    default:
      // 500 is possible for critical server erropr
      console.log("unexpected login response");
      return false;
  }
};

export const getUser = async (): Promise<User | null> => {
  const requestOptions = createRequestAuthorization();
  const response = await fetch(
    "http://localhost:3005/API/getUser",
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
  const getBalanceUrl = new URL("http://localhost:3005/API/getBalance");
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
    "http://localhost:3005/API/getAssets",
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
    "http://localhost:3005/API/getTransactions",
    requestOptions
  );

  switch (response.status) {
    case 200:
      const userResponseObj = await response.json();

      console.log("Transactions retrieved: " + userResponseObj.transactions);
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
    "http://localhost:3005/API/getCash",
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
): Promise<Asset | null> => {
  console.log("Looking up ticker: " + tickerSymbol + ".......");

  // TODO: credentials not needed for stocklookup. ...remove
  const requestOptions = createRequestAuthorization();

  const lookupTickerURL = new URL("http://localhost:3005/API/lookupTicker");
  const getTickerLookupParams = new URLSearchParams({
    tickerSymbol: tickerSymbol,
  });
  lookupTickerURL.search = getTickerLookupParams.toString();

  const response = await fetch(lookupTickerURL, requestOptions);

  console.log("ticker lookup: ", response.status, " - ", response.json);

  switch (response.status) {
    case 200:
      const userResponseObj = await response.json();
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

export const buyAsset = async (asset: Asset, shares: number) => {
  // TODO: credentials not needed for stocklookup.remove
  const requestOptions = createRequestAuthorization();

  const symbol: string = asset.symbol;
  const sharesString: string = shares.toString();
  const buySharesURL = new URL("http://localhost:3005/API/buyAsset");
  const buySharesQueryParams = new URLSearchParams({
    tickerSymbol: symbol,
    shares: sharesString,
  });
  buySharesURL.search = buySharesQueryParams.toString();

  console.log("buying ", shares, " of ", asset.name);

  const response = await fetch(buySharesURL, requestOptions);

  const userResponseObj = await response.json();
  console.log("response: ", response.status);

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

export const getStockPrice = async (
  tickerSymbol: string
): Promise<StockPrices> => {
  // TODO: credentials not needed for stocklookup.remove
  const requestOptions = createRequestAuthorization();

  const getStockPriceUrl = new URL("http://localhost:3005/API/getStockPrice");
  const getStockPriceQueryParams = new URLSearchParams({
    tickerSymbol: tickerSymbol,
  });
  getStockPriceUrl.search = getStockPriceQueryParams.toString();

  console.log("getting price for ", tickerSymbol, " using ", requestOptions);

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

export const getShareCount = ((asset:Asset|null|undefined):number => {

  console.log("get Share count for ", asset?.symbol, " with ", asset?.lots)

  var totalCount:number = 0
  if (!asset)
    return  0

  asset.lots.map((currLot) => {
    totalCount += currLot.shares
  })

  console.log (" ---> share count = ", totalCount)
  return totalCount
})
