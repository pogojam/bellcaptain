import { graphql } from "react-apollo";
import { Meteor } from "meteor/meteor";
import gql from "graphql-tag";
import React, { Component } from 'react';
import styled from 'styled-components'

const Container = styled.div`
    display:grid;
    margin:auto;
    width:30vw;
    background-color:aqua;
    padding: 3em;
    grid-gap:3em;
    border:solid black 1px;
    text-align:center;
`
const Button = styled.p`
       transition:all .7s;
    &:hover{
        transform:scale(1.2);
    }
`

const AddUser = gql`
    mutation AddUser($name:String!,$email:String,$phone:ID){
        AddUser(name:$name,email:$email,phone:$phone){
            _id
        }
    }
`

const Logo = ({path})=>(<img  src={path} alt=""/>)


class Portal extends Component {
    constructor(props) {
      super(props)
    
      this.state = {  
         newuser:false
      }
    }
    
    logoutUser(){
        Meteor.logout()
    }

    loginUser(email,pass){


        const {redirect} = this.props

        Meteor.loginWithPassword(email.value,pass.value,err=>{
            err?this.setState({err:err},console.log(err)):redirect()
        })
    }

    signUp(name,email,pass,phone){

            Accounts.createUser({email:email.value,password:pass.value,profile:{name:name.value,phone:phone.value} },(err)=>{
                err?console.log(err):console.log('Account Created')
                this.props.redirect()                
            })
    }

    changeview(){
        this.setState(user=>(
            {newuser:!user.newuser,
            err:null
            }
        ))
    }

    render() {


        console.log(Accounts.users );
        const {newuser,err} = this.state
        return (
            <Container >
                <Logo  path={this.props.logo} />
               {newuser?<NewUser signUp={this.signUp.bind(this)} />: <SignIn loginUser={this.loginUser.bind(this)}/>}
               {err&&<p style={{ color:'red' }} >{err.reason}</p>}
               <Button  onClick={this.changeview.bind(this)}> {newuser?'already have an account?':'dont have an account?'}</Button>
            </Container>
        );
    }
}


const NewUser = ({signUp})=>{
    let email,
        pass,
        name,
        phone

    return <form style={{display:'grid'}} className='animated flipInY' >
        <input ref={e => name = e } placeholder='name' type="name"/>
        <input ref={e => email = e } placeholder='email' type="email"/>
        <input ref={e => pass = e } placeholder='password' type="password"/>
        <input  ref={e => phone = e } placeholder='phone number' type="phonenumber" />
        <button onClick={(e)=>{e.preventDefault(); return signUp(name,email,pass,phone)}} > Sign up</button>
    </form>
}

const SignIn = ({loginUser})=>{

    let email,
        pass

 return <form style={{display:'grid'}} className='animated flipInY'  >
    <input  ref={e=>email = e} placeholder='email' type="email"/>
    <input  ref={e=>pass = e} placeholder='password' type="password" />
    <button  onClick={(e)=>{e.preventDefault(); return loginUser(email,pass)}} >Sign In</button>
    </form>
}




export default graphql( AddUser,{name:'AddUser'})(Portal);