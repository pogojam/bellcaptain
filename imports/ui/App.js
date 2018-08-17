import './components/app.css'
import 'animate.css'
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Switch, Route,Router } from 'react-router'
import CashPage from "./pages/CashPage";
import DashPage from "./pages/DashPage";
import Home from "./pages/index";
import React, { Component } from 'react';

const animations = {
    enter:'fadeIn',
    exit:'fadeOut'
}

class App extends Component {
    render() {
        return (
            <Route render={({location})=>(
            <TransitionGroup>
                <CSSTransition timeout={600} classNames={animations} key={location.key} >
                <Switch location={location}   >
                        <Route exact path='/' children={({match,...rest})=>(match&&<Home {...rest} /> )} />
                        <Route exact path='/Cash' children={({match,...rest})=>(match&& <CashPage {...rest} /> )} />
                        <Route exact path='/Dash' children={({match,...rest})=>(match&& <DashPage {...rest} /> )} />
                 </Switch>
                </CSSTransition>
                </TransitionGroup>
            )} />
        );
    }
}


export default App;