import React, { Component } from 'react';
import { Switch, Route,Router } from 'react-router'
import Home from "./pages/index";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './components/app.css'
import CashCalc from './components/cashCalc'

class App extends Component {
    render() {
        return (
            <Route render={({location})=>(
            <TransitionGroup>
                <CSSTransition timeout={600} classNames="fade" key={location.key} >
                <Switch location={location}   >
                        <Route exact path='/' children={({match,...rest})=>(match&&<Home {...rest} /> )} />
                        <Route path='/Cash' children={({match,...rest})=>(match&& <CashCalc/> )} />
                 </Switch>               
                </CSSTransition>
                </TransitionGroup>
            )} />
        );
    }
}


export default App;