import './components/app.css'
import 'animate.css'
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Switch, Route,Router } from 'react-router'
import CashPage from "./pages/CashPage";
import DashPage from "./pages/DashPage";
import SchedulePage from "./pages/SchedulePage";
import Home from "./pages/index";
import React, { Component,Fragment } from 'react';
import Nav from "./components/nav";

const pages = [
    {name:'Home',route:'/'},
    {name:'Cash',route:'/Cash'},
    {name:'Dash',route:'/Dash'},
    {name:'Schedule',route:'/Schedule'}
]


const animations = {
    enter:'fadeIn',
    exit:'fadeOut'
}

class App extends Component {
    render() {
        return (
            <Route render={({location,history})=>(
                <Fragment>
                <Nav history={history} pages={pages} />
            <TransitionGroup component={null}>
                <CSSTransition classNames={'fade'} appear={true}  timeout={500} key={location.key} >
                <Switch location={location}   >
                        <Route exact path={pages[0].route} children={({match,...rest})=>(match&&<Home {...rest} /> )} />
                        <Route exact path={pages[1].route} children={({match,...rest})=>(match&& <CashPage {...rest} /> )} />
                         <Route exact path={pages[2].route} children={({match,...rest})=>(match&& <DashPage {...rest} /> )} />
                        <Route exact path={pages[3].route} children={({match,...rest})=>(match&& <SchedulePage {...rest} /> )} />
                 </Switch>
                </CSSTransition>
                </TransitionGroup>
                </Fragment>
            )} />
        );
    }
}


export default App;