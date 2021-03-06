import React, { Component, Fragment } from "react";
import styled from "../../../node_modules/styled-components";
import { graphql } from "react-apollo";
import Chart from "../components/userChart";
import ShiftPieChart from "../components/userPieChart";
import gql from "../../../node_modules/graphql-tag";
import Toggle from "../components/toggle";
import ProfileChange from "../components/profileChange";
import Totals from "../components/totals";
import withAuthentication from "../components/withAuthentication";
import { Redirect } from "react-router";

// GraphQL Calls

const GetUser = gql`
  {
    user {
      _id
      email
      name
      phone
    }
  }
`;

// Page Compnent

class DashPage extends Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <Fragment>
        {this.props.data.loading ? (
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        ) : (
          <Content {...this.props.data} />
        )}
      </Fragment>
    );
  }
}

class Content extends Component {
  render() {
    const { user } = this.props;
    return (
      <StyledContent>
        <SideBar refetch={this.props.refetch} {...user} />
        <ChartWrapper>
          <Charts type={"Cash Back"} lookback={"week"} />
          <ShiftPieChart />
          <Totals type={"Cashback"} />
          <Totals type={"Drop"} />
        </ChartWrapper>
      </StyledContent>
    );
  }
}

// Main Content

const SideBar = ({ refetch, email, name, phone }) => {
  return (
    <StyledSideBar>
      <i
        style={{ fontSize: "2em", margin: "auto" }}
        className="fas fa-user-astronaut"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <li>{name}</li>
        <li>{email}</li>
        <li>{phone}</li>
      </div>
      <div style={{ flexBasis: "100%" }}>
        <Toggle>
          {({ on, toggle }) => {
            return (
              <div>
                <button
                  onClick={toggle}
                  style={{
                    color: "aquamarine",
                    background: "rgba(41,52,65,1)",
                    border: "1px solid"
                  }}
                  href=""
                >
                  Change Info
                </button>
                {on && (
                  <ProfileChange
                    refetch={refetch}
                    name={name}
                    email={email}
                    phone={phone}
                  />
                )}
              </div>
            );
          }}
        </Toggle>
      </div>
    </StyledSideBar>
  );
};

// Charts

// Pichart Am/PmShifts  CashDropGod Lowman
// lifetimehours linechartDrops

class Charts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lookback: 7
    };
  }

  handleLookback(e) {
    this.setState({
      lookback: e.target.value
    });
  }

  render() {
    const { lookback } = this.state;

    return (
      <StyledChart>
        <Chart type={this.props.type} limit={lookback} />
        <select
          value={this.state.value}
          onChange={this.handleLookback.bind(this)}
        >
          <option value={7}>Week</option>
          <option value={30}>Month</option>
          <option value={365}>Year</option>
        </select>
      </StyledChart>
    );
  }
}

// Styles

const ChartWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-columns: repeat(3, 1fr);

  & > * {
    margin: 1em;
    border-radius: 16px;
    background-color: rgba(41, 52, 65, 1);
    overflow: hidden;

    @media (min-width: 600px) {
      &:nth-child(1) {
        grid-column: 1/3;
      }
    }

    @media (max-width: 600px) {
      grid-column: 1/4;
    }
  }
`;

const StyledChart = styled.div`
  padding: 1em;
  background-color: rgba(41, 52, 65, 1);
  border-radius: 16px;
`;

const StyledContent = styled.div`
  display: grid;
  height: 100%;

  @media (min-width: 600px) {
    grid-template-columns: minmax(105px, 160px) 3fr;
  }
`;

const StyledSideBar = styled.div`
  background-color: rgba(41, 52, 65, 1);
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  grid-gap: 10px;
  max-height: 80vh;

  @media (min-width: 600px) {
    grid-template-rows: 2fr repeat(7, 1fr);
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  ul {
    padding-left: 10px;
  }

  & > * {
    color: aquamarine;
    border-bottom: 1px solid;
    padding: 0.3em;
    list-style: none;
  }
`;

const Pic = styled.img`
  background-color: antiquewhite;
`;

export default graphql(GetUser, {
  options: { fetchPolicy: "cache-and-network" }
})(withAuthentication()(DashPage));
