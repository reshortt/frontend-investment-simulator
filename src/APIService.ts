import { AUTH_TOKEN_KEY } from "./constants";
import { Asset, StockPrices, UserInfo } from "./types";
import fetch, {RequestInit} from 'node-fetch'

const createRequestAuthorization = (methodType="GET"):RequestInit => {
   return {
    method: methodType,
    headers: {
      authorization: `Bearer ${sessionStorage.getItem(AUTH_TOKEN_KEY)}`,
    },
  };
}

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

export const getUser = async (): Promise<UserInfo|undefined> => {
  const requestOptions = createRequestAuthorization()
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
      return undefined;

    default:
      // 500 is possible for critical server erropr
      console.log("unexpected getUser response");
      return undefined;
  }
};

export const getBalance = async (yesterday: boolean): Promise<number> => {
  const requestOptions = createRequestAuthorization();
  const getBalanceUrl = new URL("http://localhost:3005/API/getBalance");
  const getBalanceQueryParams = new URLSearchParams({yesterday:`${yesterday}`})
  getBalanceUrl.search = getBalanceQueryParams.toString()
  const response = await fetch(
    getBalanceUrl,
    requestOptions
  );

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
  const requestOptions = createRequestAuthorization()

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


//lookup 
export const lookupTicker = async (tickerSymbol:string) : Promise<Asset | undefined> => {

  console.log("Looking up ticker: " + tickerSymbol + ".......")


  // TODO: credentials not needed for stocklookup. ...remove
  const requestOptions = createRequestAuthorization()

  const lookupTickerURL = new URL("http://localhost:3005/API/lookupTicker")
  const getTickerLookupParams = new URLSearchParams({tickerSymbol:tickerSymbol})
  lookupTickerURL.search = getTickerLookupParams.toString()

  const response = await fetch(
    lookupTickerURL,
    requestOptions
  );

  console.log("ticker lookup: ", response.status, " - ", response.json)

  switch (response.status) {
    case 200:
      const userResponseObj = await response.json();
      return userResponseObj;

    case 400:
      // todo: better way to show error
      //console.log(await response.json());
      return undefined;

    default:
      // 500 is possible for critical server erropr
      console.log("unexpected lookupTicker response");
      return undefined;
  }

}



export const getStockPrice = async (tickerSymbol:string) : Promise<StockPrices> => {

  // TODO: credentials not needed for stocklookup.remove
  const requestOptions = createRequestAuthorization()

  const getStockPriceUrl = new URL("http://localhost:3005/API/getStockPrice")
  const getStockPriceQueryParams = new URLSearchParams({tickerSymbol:tickerSymbol})
  getStockPriceUrl.search = getStockPriceQueryParams.toString()
  
  console.log("getting price for ", tickerSymbol, " using ", requestOptions)

  const response = await fetch(
    getStockPriceUrl,
    requestOptions
  );


  const userResponseObj = await response.json();
  console.log("response: ", response.status)


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
}
