import styled from "styled-components/macro";

import { useHistory } from "react-router-dom";

enum ClickTypes {
  overview = "/overview",
  positions = "/positions",
  activity = "/activity",
  analysis = "/analysis",
  trade = "/trade"
}

export default function Navbar() {

  const history = useHistory();
  const handleOnClick = (page:ClickTypes) => history.push(page);

  const Container = styled.div`
    width: 100%;
    height: 20px;
  `;

  return (
    <Container>
      <button
        onClick={() => {
          handleOnClick(ClickTypes.overview);
        }}
      >
        {" "}
        Overview{" "}
      </button>
      <button
        onClick={() => {
          handleOnClick(ClickTypes.positions);
        }}
      >
        {" "}
        Positions{" "}
      </button>

      <button
        onClick={() => {
          handleOnClick(ClickTypes.activity);
        }}
      >
        {" "}
        Activity{" "}
      </button>


      <button
        onClick={() => {
          handleOnClick(ClickTypes.analysis);
        }}
      >
        {" "}
        Analysis{" "}
      </button>


      <button
        onClick={() => {
          handleOnClick(ClickTypes.trade);
        }}
      >
        {" "}
        Trade{" "}
      </button>
    </Container>
  );
}
