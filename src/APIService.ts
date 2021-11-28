import { AUTH_TOKEN_KEY } from "./constants"
import { Asset, UserInfo } from "./types";

export const isLoggedIn = ():boolean => !!sessionStorage.getItem(AUTH_TOKEN_KEY)

export const doLogin = async (email:string, password:string) : Promise<boolean> => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    const response = await fetch(
      "http://localhost:3005/login",
      requestOptions
    );

    switch (response.status) {
      case 200:
        const responseObj = await response.json();
        sessionStorage.setItem(AUTH_TOKEN_KEY, responseObj.token)
        console.log("Successful login: " + responseObj);
      // TODO log someone in, make it available everywhere

        window.location.assign("/overview")
        return true

      case 401:
        // todo: better way to show error
        console.log(await response.json());
        return false;

      default:
        // 500 is possible for critical server erropr
        console.log("unexpected login response");
        return false;
    }
  }

  export const getUser = async () : Promise<UserInfo> => {
    const requestOptions = {
        method: "GET",
        // back-ticks are template literals (strings)
        headers: { "authorization": `Bearer ${sessionStorage.getItem(AUTH_TOKEN_KEY)}` }
      
      };
      const response = await fetch(
        "http://localhost:3005/API/getUser",
        requestOptions
      );
  
      switch (response.status) {
        case 200:
          const userResponseObj = await response.json();

          console.log("User successfully retrieved: " + userResponseObj);
        // TODO log someone in, make it available everywhere
  
        //  window.location.assign("/overview")
          return userResponseObj
  
        case 401:
          // todo: better way to show error
          console.log(await response.json());
          return userResponseObj;
  
        default:
          // 500 is possible for critical server erropr
          console.log("unexpected getUser response");
          return userResponseObj;
      }
  }

  export const getBalance = async (yesterday:boolean) : Promise<number> => {
    const requestOptions = {
        method: "GET",
        // back-ticks are template literals (strings)
        headers: { "authorization": `Bearer ${sessionStorage.getItem(AUTH_TOKEN_KEY)}` },
        query: {yesterday: yesterday}
      };
      const response = await fetch(
        "http://localhost:3005/API/getBalance",
        requestOptions
      );
    
  
      switch (response.status) {
        case 200:
          const userResponseObj = await response.json();

         // console.log("User successfully retrieved: " + userResponseObj);
        // TODO log someone in, make it available everywhere
  
        //  window.location.assign("/overview")
          return userResponseObj.balance
  
        case 401:
          // todo: better way to show error
          console.log(await response.json());
          return userResponseObj;
  
        default:
          // 500 is possible for critical server erropr
          console.log("unexpected getUser response");
          return userResponseObj;
      }
  }

  export const getAssets = async () : Promise<Asset[]> => {
    const requestOptions = {
      method: "GET",
      // back-ticks are template literals (strings)
      headers: { "authorization": `Bearer ${sessionStorage.getItem(AUTH_TOKEN_KEY)}` },
    };
    const response = await fetch(
      "http://localhost:3005/API/getAssets",
      requestOptions
    );


    switch (response.status) {
      case 200:
        const userResponseObj = await response.json();

       console.log("Assets retrieved: " + userResponseObj.assets)
        return userResponseObj.assets

      case 401:
        // todo: better way to show error
        console.log(await response.json());
        return userResponseObj;

      default:
        // 500 is possible for critical server erropr
        console.log("unexpected getAssets response");
        return userResponseObj;
    }  }