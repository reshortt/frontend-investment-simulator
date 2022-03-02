import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { getUserInfo, isLoggedIn } from "../APIService";
import { UserInfo } from "../types";

export default function Header() {
  const Container = styled.div`
    padding-left: 10px;
    padding-bottom: 60px;
    font-size: 16px;
    width: 100%;
    height: 70px;
    background-color: green;
  `;

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
    <Container>
      <label
        style = {
            {color:"white",
            font:"Arial",
            textAlign: "center",
            verticalAlign : "center",
        }    
        }
      >
        {" "}
        <br />
        {userInfo
          ? " Investment Simulator - " + userInfo.name
          : " Investment Simulator"}{" "}
      </label>
    </Container>
  );
}
