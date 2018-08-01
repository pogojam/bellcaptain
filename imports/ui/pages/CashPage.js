import React, { Component } from 'react'
import CashCalc from "../components/cashCalc";
import styled from "styled-components";

export default class CashPage extends Component {
  constructor(props) {
        super(props)
  }

  render() {
    return (
      <Page>
        <Header></Header>
        <CashCalc {...this.props} />
      </Page>
    )
  }
}

const Page = styled.div`
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 1fr 6fr;
}
`

const Header = styled.div`
      background-color:black;
`