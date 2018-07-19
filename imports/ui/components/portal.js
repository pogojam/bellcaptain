import React, { Component } from 'react';
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import styled from 'styled-components'
import { Meteor } from "meteor/meteor";

const Container = styled.div`
    display:grid;
    margin:auto;
    width:30vw;
    background-color:purple;
`


const getUser = gql`
    {
        hi
    }
`

class Portal extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    
    logoutUser(){
        Accounts.logout()
    }

    loginUser(email,pass){
        this.setState({
            email:email.value,
            pass:pass.value
        })
    }

    signUp(name,email,pass){
            Accounts.createUser({ username:name.value,email:email.value,password:pass.value },(err)=>console.log(err))
    }

    newUserView(){
        this.setState({
            newuser:true
        })
    }

    render() {

        return (
            <Container>
               {this.state.newuser?<NewUser signUp={this.signUp} />: <SignIn loginUser={this.loginUser.bind(this)}/>}
               <a  onClick={this.newUserView.bind(this)}> dont have an account?</a>
            </Container>
        );
    }
}


const NewUser = ({signUp})=>{
    let email,
        pass,
        name


    return <form>
        <input ref={e => email = e } placeholder='name' type="name"/>
        <input ref={e => pass = e } placeholder='password' type="password"/>
        <input ref={e => name = e } placeholder='email' type="email"/>
        <button onClick={(e)=>{e.preventDefault(); return signUp(name,email,pass)}} > Sign up</button>
    </form>
}

const SignIn = ({loginUser})=>{

    let email,
        pass

 return <form>
    <input  ref={e=>email = e} placeholder='email' type="email"/>
    <input  ref={e=>pass = e} placeholder='password' type="password" />
    <button onClick={(e)=>{e.preventDefault(); return loginUser(email,pass)}} >Sign In</button>
    </form>
}


export default graphql(getUser)(Portal);