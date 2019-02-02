import { graphql } from "react-apollo";
import { Meteor } from "meteor/meteor";
import gql from "graphql-tag";
import React, { Component } from 'react';
import styled from 'styled-components'

const Container = styled.div`

@media  (max-width:400px) {
    width: 100%;
    height: 100vh;
    padding:0;
}
    width: 30vw;
    max-width:400px;
    padding: 3em;
    display:grid;
    margin:auto;

  background: #0cebeb; /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #0cebeb, #20e3b2, #29ffc6); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #0cebeb, #20e3b2, #29ffc6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    grid-gap:3em;
    text-align:center;
`
const Button = styled.p`
       transition:all .7s;
    &:hover{
        transform:scale(1.2);
    }
`

const Logo = ({path})=>(<img style={{margin:'auto'}}  src={path} alt=""/>)


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
            err?this.setState({err:[err.reason]},console.log(err)):redirect()
        })
    }

    signUp(name,email,pass,phone,key){

        let error = []
 
        pass.value.length>5?null:error.push('password must be over 5 characters')
        phone.value.length===10?null:error.push('phone number should include area code')
        name.value.split(' ').length===2?null:error.push('must type first and last name')



        
        error.length===0?
            Accounts.createUser({email:email.value,password:pass.value,profile:{name:name.value,phone:`+1${phone.value}`,key:key.value} },(err)=>{
                err?this.setState({err:[err.reason]}):(
                    console.log('Account Created'),
                    this.props.redirect()
                )
                                
            }):
            this.setState({
                err:error
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

        const {newuser,err} = this.state
        return (
            <Container >
                <Logo  path={this.props.logo} />
               {newuser?<NewUser signUp={this.signUp.bind(this)} />: <SignIn loginUser={this.loginUser.bind(this)}/>}
               {err&&<p style={{ color:'red' }} >{err.map((err,id)=><li key={id}>{err}</li>)}</p>}
               <Button  onClick={this.changeview.bind(this)}> {newuser?'Already Have An Account?':'Dont Have An Account?'}</Button>
            </Container>
        );
    }
}


const NewUser = ({signUp})=>{
    let email,
        pass,
        name,
        phone,
        key

    return <form style={{display:'grid'}} className='animated flipInY' >
        <input ref={e => name = e } placeholder='First Last name' name="name" type="name"/>
        <input ref={e => email = e } placeholder='email' name="email" type="email"/>
        <input ref={e => pass = e } placeholder='password' name="password" type="password"/>
        <input ref={e => key = e } placeholder='key' type="key"/>
        <input  ref={e => phone = e } placeholder='phone xxx-xxx-xxxx' type="phonenumber" />
        <button onClick={(e)=>{e.preventDefault(); return signUp(name,email,pass,phone,key)}} > Sign up</button>
    </form>
}

const SignIn = ({loginUser})=>{

    let email,
        pass

 return <form style={{display:'grid'}} className='animated flipInY'  >
    <input  ref={e=>email = e} placeholder='email' name="email" type="email"/>
    <input  ref={e=>pass = e} placeholder='password' name="password" type="password" />
    <button  onClick={(e)=>{e.preventDefault(); return loginUser(email,pass)}} >Sign In</button>
    </form>
}




export default Portal