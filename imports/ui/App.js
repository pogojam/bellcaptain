import React, { Component } from 'react';
import { Switch, Route,Router } from 'react-router'
import Home from "./pages/index";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './components/app.css'
import CashPage from "./pages/CashPage";
import 'animate.css'

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
                 </Switch>
                </CSSTransition>
                </TransitionGroup>
            )} />
        );
    }
}


export default App;