import React from 'react'
import { Card, TextField, Button } from '@mui/material'
import { local } from '../utils/url.js'

export default class Login extends React.Component{
    constructor(){
        super()
        this.state={
            err:''
        }
    }

    onSubmitHandler = async (e) => {
        e.preventDefault()
        console.log(e.target.elements)
        let email = e.target.elements.email.value
        let password = e.target.elements.password.value

        let loginRes = await fetch(local+'/login',{
            method:"POST",
            body:{
                user:email,
                password:password
            },
            headers:{
                "Content-Type": "json/application"
            }
        }).then(res=>res.json()).then(res=>res).catch(err=>{this.setState({err:err.message})})
        if(loginRes.status === 'success'){
            sessionStorage.setItem('token',loginRes.data.jwt)
            window.location.href='/changeState'
        } else {
            this.setState({err:loginRes.data.message})
        }
    }

    render(){
        return(
            <div className='text-center justify-content-center'>
                <Card className='text-center justify-content-center' style={{width:'30%',marginLeft:"35%",marginTop:"10%",minHeight:"400px",background:"rgba(232, 236, 241, 0.3)"}}>
                    <Card className='text-center justify-content-center' style={{marginTop:"10%"}}>{this.state.err}</Card>
                    <form className='d-flex flex-column text-center justify-content-center' onSubmit={this.onSubmitHandler}>
                        <div style={{marginTop:"5%"}}><TextField style={{marginTop:"4%"}} type='text' name='email' label="Email">
                        </TextField></div>
                        <div style={{marginTop:"5%"}}><TextField style={{marginTop:"4%"}} type='password' name='password' label="Password">
                        </TextField></div>
                        <div style={{marginTop:"5%"}}><Button variant="contained" style={{marginTop:"4%"}} type='submit'>Login</Button></div>
                    </form>
                </Card>
            </div>
        )
    }
}