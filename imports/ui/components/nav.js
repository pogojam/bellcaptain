import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router";

const Container = styled.div`
  display: grid;
  grid-area: nav;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100%;
`;

const Nav = ({ history }) => {
  const location = history.location.pathname;
  return (
    <Container>
      <button
        className={"head"}
        onClick={() => {
          Accounts.logout(), history.push("/");
        }}
      >
        {" "}
        <i className="fas fa-sign-out-alt" /> Logout
      </button>
      <button className={"head"}>
        {" "}
        <i className="fas fa-calendar-alt" />
        Schedule
      </button>
      {location === "/Dash" && (
        <button onClick={() => history.push("/Cash")} className={"head"}>
          {" "}
          <i className="far fa-money-bill-alt" />
          DoCash
        </button>
      )}
      {location === "/Cash" && (
        <button onClick={() => history.push("/Dash")} className={"head"}>
          {" "}
          <i className="fas fa-user" />
          Dashboard
        </button>
      )}
    </Container>
  );
};

export default Nav;
