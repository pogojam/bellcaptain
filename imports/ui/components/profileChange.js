import React, { Component,Fragment } from 'react'
import Toggle from './toggle'
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo'

const  UpdateUser = gql`
        mutation updateUser ($name:String,$email:String,$phone:ID){
            updateUser(name:$name,email:$email,phone:$phone){
                  name
            }
        }
`

class ProfileChange extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         name:this.props.name,
         email:this.props.email,
         phone:this.props.phone
      }
    }

    handleChange(e){

            let name = e.target.name
            let value = e.target.value
            let obj = new Object

            this.setState((state)=> {
                state[name] = value
                return state
            })
    }

    handleUpdate(){
        const {updateUser} = this.props
        const {name,email,phone} = this.state
            updateUser({
                variables:{
                    name:name,
                    email:email,
                    phone:phone
                }
            })

            this.props.refetch()
    }
    

  render() {
      const {name,email,phone} = this.state
    return (
      <Fragment>
          <input name={'name'} onChange={(e)=>(this.handleChange(e))} value={name} type="text"/>
          <input name={'email'} value={email} onChange={(e)=>(this.handleChange(e))} type="text"/>
          <input name={'phone'} value={phone} onChange={(e)=>(this.handleChange(e))} type="text"/>
            <button onClick={(e)=>this.handleUpdate(e)} >Confirm</button>
          <Toggle>
            {({on,toggle})=>(
                <Fragment>
                    <button  style={{color:'aquamarine',background:'rgba(41,52,65,1)',border:'1px solid'}} onClick={toggle} >Change Password</button>
                    {on && <PasswordReset/> }
                </Fragment>
                )}
          </Toggle>
      </Fragment>
    )
  }
}



const PasswordReset = ()=>{
    return (
        <Fragment>
            <input placeholder='Old Password' type="text"/>
            <input placeholder='New Password' type="text"/>
            <button >Confirm</button>
        </Fragment>
    )
}




export default graphql(UpdateUser,{name:'updateUser'})(ProfileChange) 

