import React, {Component, Fragment} from "react";
import {withRouter} from "react-router";
import styled,{keyframes} from "styled-components";
import Toggle from "./toggle";



//             Styled components


//      Styled Animations

// Styles


const Container = styled.div `
    height:10vh;
    display:flex;
    justify-content: flex-end;
    grid-area:'nav';
    padding: 1em;
    background:none;
  
  /* button{
    color:#2d2f31;
    font-size:1.6em;
    background:none;
    box-shadow:none;
    transition: all 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    margin-right:2em;
    &:focus{
      outline: none
    }
    &:hover{
        transform:translateY(3px);
    }

  @media (max-width:600px) {
        display:none;     
      }


  } */

  svg{
    width:10vw;
    margin-left:2em
    margin-right: auto;
    fill:#2d2f31;
  }
`;

const Button = styled.button`
    color:${({sideNav})=>sideNav?'aquamarine':'#2d2f31'};
    font-size:1.6em;
    background:none;
    box-shadow:none;
    transition: all 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    margin-right:2em;
    &:focus{
      outline: none
    }
    &:hover{
        transform:translateY(3px);
    }

  @media (max-width:600px) {
        display:${({sideNav})=>sideNav?'inline':'none'};     
      }

`

const SideNavContainer = styled.div `
    position:absolute;
    top: 0;
    left:${({active})=>active?'0%':'-46%'};
    height: 100%;
    width: 45%;
    background-color: rgba(41,52,65,1);
    z-index: 99;
    box-shadow: rgba(0,0,0,0.12) 0px 1px 3px, rgba(0, 0, 4, 1) 0px 1px 1px;
    transition: all .4s linear;
    padding-top: 2em;
`;

const Bar = styled.div`
    width:35px;
    height: 5px;
    background-color: #333;
    margin: 6px 0;
    transition: 0.4s;
    opacity:${(prop)=>prop.active?1:0}
    transform: ${({xformLeft,xformRight})=>{
      if(xformLeft){
       return 'rotate(-45deg) translate(-9px, 6px)'
      }
      if(xformRight){
      return  'rotate(45deg) translate(-8px, -8px)'
      }
      else{
        return ''
      }
    }
   } ;
`



// Coponents 

class Nav extends Component {
  constructor(props) {
    super(props)
    this.handleSideNav = this.handleSideNav.bind(this)
    this.state = {
      sidebar:false
    }
  }

  handleSideNav(){
    this.setState({
      sidebar:!this.state.sidebar
    })
  }

  render() {
    const {history, logo, pages} = this.props
    const {sidebar} = this.state
    const location = history.location.pathname;

    return (location === '/'
      ? null
      : <Container>
        {logo
          ? <img src={logo}/>
          : <Captain/>}
        <Button
          onClick={() => {
          Meteor.logout(),
          history.push('/')
        }}>Logout</Button>
        {pages.map((page, id) => {
          if (!(location === page.route)) {
            return <Button
              key={id}
              onClick={() => {
              history.push(page.route)
            }}>
              <a >
                {page.name}
              </a>
            </Button>
          }
        })}
              <Burger bars={3}  handleSideNav={this.handleSideNav} sidebar={sidebar} /> 
              <SideNav handleSideNav={this.handleSideNav} history={history} pages={pages} active={sidebar} />

      </Container>)

  }
}

const Burger = ({handleSideNav,bars,sidebar}) => (

  
  <div onClick={()=>handleSideNav()} className="burger">
  
  {Array(bars).fill().map((_,id) => {
    if(sidebar){
      switch(id){
        case 0 :return <Bar key={id} xformLeft active />
        break
        case 1 :return <Bar key={id} />
        break
        case 2 :return <Bar key={id} xformRight active />
        break
      }
      }
      else{
      return <Bar active key={id} />
      }
  }
  )}
  
  </div>
)

const SideNav = ({active,pages,history,handleSideNav}) => {
  return <SideNavContainer active={active} >
    
    {pages.map((page, id) => {
          if (!(location === page.route)) {
            return <Button
              sideNav
              key={id}
              onClick={() => {
              history.push(page.route)
              handleSideNav()
            }}>
              <a >
                {page.name}
              </a>
            </Button >
          }
        })}

  </SideNavContainer>
}

// SVG Logo

const Captain = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
    <path
      d="M480.38 11.68c-30.44 5.55-55.33 19.53-83.66 46.71-31.21 30.25-50.35 57.05-98.78 138.03-48.63 80.98-64.9 103.57-85.57 118.31-6.7 4.79-36.76 21.25-66.62 36.76-30.06 15.32-62.98 33.69-73.32 40.59-33.7 22.2-52.65 45.36-59.74 72.36-3.83 15.12-3.64 27.95.96 46.14 5.17 20.48 13.97 36.95 26.61 50.73 13.4 14.17 28.33 22.97 48.63 28.72 13.78 4.02 19.91 4.4 48.24 4.4 26.8 0 38.1-.96 63.75-5.36 17.23-3.06 31.59-4.98 32.16-4.59.38.57 1.72 10.72 2.87 22.78 7.27 80.98 42.12 167.13 93.23 230.88l9.57 12.06-.96 12.06c-.96 10.34-.38 13.4 4.02 22.02 16.85 33.12 96.3 89.21 146.26 102.99 11.3 3.06 12.44 3.06 23.93 0 49.77-13.78 129.22-69.88 146.07-102.99 4.4-8.62 4.98-11.68 4.02-22.02l-.96-12.06 9.57-12.06c32.93-40.97 63.18-99.74 77.92-151.24 9.19-32.35 12.06-47.48 16.65-91.89.58-6.51 1.91-10.91 3.25-10.91s11.87 1.72 23.36 3.64c85.19 14.93 133.82 7.85 165.6-24.5 18.97-19.16 32.56-51.71 32.56-77.55 0-23.74-11.29-48.63-31.01-68.34-18.57-18.76-43.84-34.46-103.95-65.47-64.13-32.93-67.58-34.84-82.51-50.35-15.51-16.08-31.78-40.2-70.45-104.91-17.61-29.29-36.37-59.92-41.73-67.96-34.46-51.12-71.21-88.45-103.95-104.91-20.69-10.54-54.96-15.9-76.02-12.07zm45.76 44.03c15.89 5.55 29.86 14.55 45.95 29.48 28.33 26.23 49.97 56.86 100.7 141.86 48.24 80.79 67.2 105.29 95.72 124.05 8.62 5.74 39.05 22.59 67.77 37.33 75.04 38.67 97.25 54.37 107.96 76.39 11.87 24.7-.96 62.98-26.61 78.3-13.78 8.23-29.48 11.29-56.86 10.91-28.33-.38-52.26-3.83-110.08-16.08-158.31-33.7-201.39-39.63-268.01-37.52-55.33 1.92-99.93 8.62-203.5 31.01-95.72 20.87-132.86 25.84-161.19 22.21-20.1-2.68-26.99-4.79-37.71-11.49-24.12-15.32-36.18-53.6-24.7-77.34 10.53-21.63 33.12-37.91 104.14-74.47 67.77-34.84 76.39-40.2 94.19-58.01 20.48-20.49 34.84-41.35 73.13-105.29 60.49-101.27 88.06-137.07 123.1-159.66 23.54-15.32 53.03-19.72 76-11.68zm31.2 488.37c33.5 3.06 139.94 22.4 163.49 29.67 3.45 1.15 3.64 2.68 2.49 24.5-1.34 24.32-5.94 50.35-12.83 74.09-4.21 14.17-17.04 49.77-18.38 51.3-.58.58-9.77-7.85-20.68-18.76l-19.72-19.72 4.79-11.68c13.97-34.46 2.49-75.43-27.57-96.87-15.51-11.1-26.99-14.55-48.63-14.55-15.32 0-20.1.76-30.06 4.98l-11.68 4.98-14.55-14.55c-8.04-8.04-14.55-15.32-14.55-16.08.02-1.34 5.19-1.14 47.88 2.69zm-52.83 71.79c-13.59 40.39 4.4 82.7 42.69 100.89 12.06 5.74 14.55 6.13 33.12 6.13 16.85 0 21.83-.76 31.21-4.59l11.29-4.59 24.7 24.7 24.51 24.5-5.36 9.38C659.01 785.5 641.78 810 640.06 810c-.77 0-5.36-5.55-10.34-12.25-5.17-6.7-17.8-21.44-28.52-32.54l-19.35-20.31H418.16l-18.95 19.72c-10.53 10.72-23.16 25.46-28.52 32.35-5.17 7.08-10.34 12.63-11.49 12.25-4.02-1.15-28.52-39.82-41.73-66.24-25.08-49.77-40.01-104.34-40.39-147.22l-.19-22.02 6.7-1.53c38.1-8.62 116.01-23.16 138.79-26.04l28.72-3.64 29.29 28.91 29.29 29.1-5.17 15.33zm94.76-9.77c13.97 7.08 22.02 20.49 22.21 36.37 0 21.82-15.89 39.05-38.1 40.78-7.85.58-11.87-.38-20.29-4.79-33.12-16.85-28.52-63.94 7.27-75.43 6.51-1.91 22.4-.37 28.91 3.07zM466.22 791.61c-5.17 5.17-6.51 8.04-6.51 13.98 0 16.46 9.76 21.63 40.2 21.63 30.44 0 40.2-5.17 40.2-21.63 0-5.94-1.34-8.81-6.51-13.98l-6.5-6.51h37.52l11.87 12.83c17.61 19.14 34.27 42.12 40.58 55.52l5.74 12.06-6.13 7.66c-8.42 10.53-28.14 27.18-48.82 40.78-20.48 13.59-61.26 33.89-67.96 33.89-2.68 0-15.12-4.98-27.76-11.3-36.76-17.99-72.36-43.07-88.06-62.22l-7.08-8.81 5.55-11.87c6.7-13.97 23.55-37.14 40.58-55.71l12.06-12.83h37.52l-6.49 6.51z"/>
    <path
      d="M478.85 195.46c-47.67 9-85.77 44.41-97.63 91.13-9.76 38.1.77 80.98 26.8 110.46l9.57 10.53v52.07h162.72v-50.92l5.94-5.74c10.53-10.15 24.31-32.93 29.67-49.2 4.4-13.21 5.17-19.14 5.17-37.71.19-19.14-.57-24.12-5.17-37.33-17.23-50.16-59.54-82.13-111.23-84.23-9.37-.4-21.05-.02-25.84.94zm36.95 41.16c25.08 5.36 46.14 21.63 57.43 44.8 5.74 12.06 6.13 13.78 6.13 34.65 0 21.25-.19 22.59-6.51 35.22-4.4 9-10.53 17.04-19.53 25.84l-13.21 12.83v11.29c-.19 9.38-.57 10.72-2.3 7.66-3.64-6.89-9.95-10.53-17.99-10.53s-13.97 3.83-19.34 12.63c-1.91 3.06-2.3 3.06-2.3.38-.19-1.72-2.87-5.36-6.13-8.04-8.42-7.08-19.34-6.89-26.8.57l-5.55 5.55v-9.19c0-9-.38-9.76-13.97-23.36-15.89-15.89-22.78-28.33-26.42-48.05-7.85-42.5 24.5-86.92 67.77-93.23 14.55-2.08 14.55-2.08 28.72.98z"/>
    <path
      d="M460.28 297.88c-6.32 2.68-12.06 11.29-12.06 18.19 0 7.27 5.74 15.51 12.83 18.57 8.42 3.45 15.12 1.92 22.21-4.79 4.02-3.83 5.17-6.7 5.17-13.21 0-14.93-14.55-24.88-28.15-18.76zM521.54 297.88c-6.32 2.68-12.06 11.29-12.06 18.19 0 7.27 5.74 15.51 12.83 18.38 8.8 3.83 16.46 1.92 22.59-5.36 13.59-16.28-3.83-39.82-23.36-31.21zM342.74 587.72c-4.21 4.4-5.55 7.47-5.55 13.21 0 10.72 5.93 17.04 24.7 26.23 15.51 7.47 15.51 7.47 15.51 14.93 0 5.93 1.34 8.81 6.51 13.98 8.04 8.04 18.57 9 26.99 2.3l5.17-4.02 8.42 4.02c15.89 7.85 28.72 3.83 33.31-10.15 1.91-5.74 1.72-7.85-1.34-13.97-3.25-6.51-7.08-9-47.48-29.48-50.16-25.47-56.09-27-66.24-17.05z"/>
  </svg>
);

export default Nav;
