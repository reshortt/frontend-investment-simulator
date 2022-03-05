import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { getUserInfo, isLoggedIn } from "../APIService";
import { UserInfo } from "../types";
import stockIcon from "./stocks.png";

export default function Header() {
  // const Container = styled.div`
  //   padding-left: 10px;
  //   padding-bottom: 60px;
  //   font-size: 16px;
  //   width: 100%;
  //   height: 70px;
  //   background-color: green;
  //   flexdirection: row;
  //   flexwrap: wrap;
  //   flex: 1;
  // `;

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (isLoggedIn() && !userInfo) {
      //console.log("Getting User Info . Currently it is ", userInfo)
      getUserInfo().then((info: UserInfo | null) => {
        if (info) {
          setUserInfo(info);
        }
      });
    }
  });

  return (
    <div
      style={{
        padding: "20px 10px 50px",
        fontSize: "16px",
        width: "100%",
        height: "60px",
        backgroundColor: "green",
      }}
    >
      <img src={stockIcon} width="24" height="24" style={{
        verticalAlign:"middle"
      }} />
      <label
        style={{
          color: "white",
          font: "Arial",
          textAlign: "center",
          verticalAlign: "bottom",
          paddingTop: "80px",
          paddingLeft: "10px"
        }}
      >
        {userInfo
          ? " Investment Simulator - " + userInfo.name
          : " Investment Simulator"}{" "}
      </label>
    </div>
  );
}
