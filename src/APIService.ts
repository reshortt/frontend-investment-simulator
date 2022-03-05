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

const isFrontendLocal = ():boolean => {
  return false;
}

const isBackendLocal = (): boolean => {
   return false;
}

const isBackendRemote = (): boolean => {
  return !isBackendLocal()
}

const isFrontendRemote = (): boolean => {
  return !isFrontendLocal()
}
const AWS_PREFIX:string = "https://reshortt.me"
const LOCAL_PREFIX:string = "http://localhost:3005"

const getURL = (endpoint:string, params:Record<string, string>={}):string => {

  let prefix:string= ""
  if (isBackendLocal() && isFrontendLocal()) {
    prefix = LOCAL_PREFIX   
  }
  else if (isFrontendLocal() && isBackendRemote()){
    prefix = AWS_PREFIX
  }
  else if (isFrontendRemote() && isBackendRemote()) {
    prefix = ""
  }
  
  let url:string = prefix + endpoint
  const queryString:string = new URLSearchParams(params).toString()
  return url + "?" + queryString;
}

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
};

export const doSignup = async (
  email: string,
  password: string,
  name: string
): Promise<boolean> => {
  const encryptedPassword: string = encryptPassword(password);
  // console.log(
  //   "signing up with clear password = ",
  //   password,
  //   ", encrypted =",
  //   encryptedPassword
  // );

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: encryptedPassword,
      name: name,
    }),
  };
  const response = await fetch(getURL("/API/signup"), requestOptions);

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

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password:encryptedPassword }),
  };
  const response = await fetch (getURL("/API/login"), requestOptions);

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
    getURL("/API/getAccount"),
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
    getURL("/API/getUserInfo"),
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
  const requestOptions = createRequestAuthorization()

  const urlString = getURL("/API/getBalance", {yesterday: `${yesterday}`});
  const response = await fetch(urlString, requestOptions);

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
    getURL("/API/getAssets"),
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
    getURL("/API/getTransactions"),
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
    getURL("/API/getCash"),
    requestOptions
  );

  switch (response.status) {
    case 200:
      const userResponseObj = await response.json();

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

  const urlString:string = getURL("/API/lookupTicker", {
    tickerSymbol: tickerSymbol,
  });

  const response = await fetch(urlString, requestOptions);

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


  const queryURLString = getURL("/API/getHistoricalDividends", { ticker: symbol } );
  const response = await fetch(queryURLString, requestOptions);

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

 
  const queryURLString = getURL("/API/getStockPriceOnDate", {
    ticker: symbol,
    date: date.toDateString(),
  });

  const response = await fetch(queryURLString, requestOptions);
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

  const queryURLString = getURL("/API/getHistoricalPrices", {
    ticker: symbol,
    date: startDate.toDateString(),
  })
  console.log ("Getting  historical prices for ", symbol, " with URL=", queryURLString)

  const response = await fetch(queryURLString, requestOptions);
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
  const urlString:string = getURL("/API/buyAsset", {
    tickerSymbol: symbol,
    shares: sharesString,
    price: priceString,
  });


  const response = await fetch(urlString, requestOptions);

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
  const urlString = getURL("/API/sellAsset", {
    tickerSymbol: symbol,
    shares: sharesString,
    price: priceString,
  });

  const response = await fetch(urlString, requestOptions);

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

  const urlString:string = getURL("/API/getStockPrice", {
    tickerSymbol: tickerSymbol,
  });
  const response = await fetch(urlString, requestOptions);

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

  var totalCount: number = 0;
  if (!asset) return 0;

  asset.lots.map((currLot) => {
    totalCount += currLot.shares;
  });

  return totalCount;
};
