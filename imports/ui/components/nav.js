import React, { Component } from 'react';
import styled from "styled-components";
import { withRouter } from "react-router";

const Container = styled.div`
    display:grid;
    grid-area:nav;
    grid-template-columns: 1fr 1fr 1fr;
    height:100%;
`


const Nav = ({history})=>{

    const location = history.location.pathname
    return <Container>
    <button onClick={()=>{ Accounts.logout(),history.push('/')  }} >Logout</button>
    <button>Schedule</button>
    {location==='/Dash'&&<button onClick={()=>history.push('/Cash')} >DoCash</button>}
    {location==='/Cash'&&<button onClick={()=>history.push('/Dash')} >Dashboard</button>}

    </Container>
}

export default Nav;