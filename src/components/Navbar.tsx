import styled from "styled-components/macro";

import { useHistory } from "react-router-dom";
import { CSSProperties, useState } from "react";

enum ClickType {
  login = "/login",
  overview = "/overview",
  positions = "/positions",
  activity = "/activity",
  analysis = "/analysis",
  trade = "/trade"
}

export default function Navbar() {

  const history = useHistory();
  const handleOnClick = (page:ClickType) => {
    setClickType(page)
    history.push(page);
  }

  const Container = styled.div`
    width: 100%;
    height: 20px;
  `;

  const [clickType, setClickType] = useState<ClickType>(ClickType.login)

  const selectedStyle = {color:"blue", fontWeight:"bold", background:"white"}
  const normalStyle= {color:undefined, fontWeight:undefined, background:undefined}

  // failed refactor attempt
  const getButtonStyle = (type:ClickType):CSSProperties => {
     return clickType===ClickType.overview ? {color:"blue", fontWeight:"bold", background:"white"}: {color:undefined, fontWeight:undefined, background:undefined}
  }
  

  return (
    <Container>
      <button
        onClick={() => {
          handleOnClick(ClickType.overview);
        }}
        style = {clickType===ClickType.overview ? {color:"blue", fontWeight:"bold", background:"white"}: {color:undefined, fontWeight:undefined, background:undefined}}
        //style = {getButtonStyle(ClickType.overview)}
        // TODO: best way to refactor this
      >
        {" "}
        Overview{" "}
      </button>
      <button
        onClick={() => {
          handleOnClick(ClickType.positions);
        }}
        style = {clickType===ClickType.positions ? {color:"blue", fontWeight:"bold", background:"white"}: {color:undefined, fontWeight:undefined, background:undefined}}

      >
        {" "}
        Positions{" "}
      </button>

      <button
        onClick={() => {
          handleOnClick(ClickType.activity);
        }}

        style = {clickType===ClickType.activity ? {color:"blue", fontWeight:"bold", background:"white"}: {color:undefined, fontWeight:undefined, background:undefined}}
>
        {" "}
        Activity{" "}
      </button>


      <button
        onClick={() => {
          handleOnClick(ClickType.analysis);
        }}
        style = {clickType===ClickType.analysis ? {color:"blue", fontWeight:"bold", background:"white"}: {color:undefined, fontWeight:undefined, background:undefined}}

      >
        {" "}
        Analysis{" "}
      </button>


      <button
        onClick={() => {
          handleOnClick(ClickType.trade);
        }}

        style = {clickType===ClickType.trade ? {color:"blue", fontWeight:"bold", background:"white"}: {color:undefined, fontWeight:undefined, background:undefined}}

      >
        {" "}
        Trade{" "}
      </button>
    </Container>
  );
}
