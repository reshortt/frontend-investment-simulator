import styled from "styled-components/macro";

import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

enum ClickTypes {
  overview = "/overview",
  positions = "/positions",
  activity = "/activity",
  analysis = "/analysis",
  trade = "/trade"

}

export default function Navbar() {
  const [buttonClicked, setButtonClicked] = useState(ClickTypes.overview);

  const history = useHistory();
  const handleOnClick = useCallback(
    () => history.push(buttonClicked),
    [history]
  );

  const Container = styled.div`
    width: 100%;
    height: 20px;
  `;

  return (
    <Container>
      <button
        onClick={() => {
          setButtonClicked(ClickTypes.overview);
          handleOnClick();
        }}
      >
        {" "}
        Overview{" "}
      </button>
      <button
        onClick={() => {
          setButtonClicked(ClickTypes.positions);
          handleOnClick();
        }}
      >
        {" "}
        Positions{" "}
      </button>

      <button
        onClick={() => {
          setButtonClicked(ClickTypes.activity);
          handleOnClick();
        }}
      >
        {" "}
        Activity{" "}
      </button>


      <button
        onClick={() => {
          setButtonClicked(ClickTypes.analysis);
          handleOnClick();
        }}
      >
        {" "}
        Analysis{" "}
      </button>


      <button
        onClick={() => {
          setButtonClicked(ClickTypes.trade);
          handleOnClick();
        }}
      >
        {" "}
        Trade{" "}
      </button>
    </Container>
  );
}
