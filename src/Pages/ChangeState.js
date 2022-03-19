import React from 'react'
import {Switch, Slider, Card, FormControlLabel} from '@mui/material'
import { styled } from '@mui/material/styles';
import { local } from '../utils/url';

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

export default class ChangeState extends React.Component{
    constructor(){
        super()
        this.state={
            devices:[]
        }
        this.onButtonChange = this.onButtonChange.bind(this)
        this.onSliderChangeCommit = this.onSliderChangeCommit.bind(this)
    }

    async componentDidMount(){
        await fetch(local+`/fetchDevices`,{
            method:"post",
            headers:{
                token:sessionStorage.getItem('token')
            }
        }).then(res=>res.json()).then(res=>{
            console.log(res)
            if(res.status === 'success'){
            this.setState({devices:res.data})
        } else {
            this.setState({err:res.data.message})
        }}).catch(err=>{this.setState({err:err.message})})
        console.log(this.state)
    }

    valuetext = (value) => {
        return `${value}`;
      }

    onButtonChange=async(e)=>{
        var stateup
        if(e.target.value == 'false'){
            stateup=true
        } else {
            stateup = false
        }
        let body = {
            app:e.target.name,
            state:stateup
        }
        console.log("body ",body)
        await fetch(local+`/changeState`,{
            method:"post",
            headers:{
                token:sessionStorage.getItem('token'),
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        }).then(res=>res.json()).then(res=>{
            if(res.status==='success'){
                this.setState({})
            } else {
                this.setState({err:res.data.message})
            }
        })

        await fetch(local+`/fetchDevices`,{
            method:"post",
            headers:{
                token:sessionStorage.getItem('token')
            }
        }).then(res=>res.json()).then(res=>{
            console.log(res)
            if(res.status === 'success'){
            this.setState({devices:res.data})
        } else {
            this.setState({err:res.data.message})
        }}).catch(err=>{this.setState({err:err.message})})
    }

    async onSliderChangeCommit(e){
        console.log(e)
        await fetch(local+`/changeState`,{
            method:"post",
            headers:{
                token:sessionStorage.getItem('token'),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                app:e.target.children[0].name,
                varState:e.target.children[0].value
            })
        }).then(res=>res.json()).then(res=>{
            if(res.status==='success'){
                this.setState({})
            } else {
                this.setState({err:res.data.message})
            }
        })

        await fetch(local+`/fetchDevices`,{
            method:"post",
            headers:{
                token:sessionStorage.getItem('token')
            }
        }).then(res=>res.json()).then(res=>{
            console.log(res)
            if(res.status === 'success'){
            this.setState({devices:res.data})
        } else {
            this.setState({err:res.data.message})
        }}).catch(err=>{this.setState({err:err.message})})
    }

    render(){
        return(
            <div className='text-center justify-content-center'>
                <Card className='text-center justify-content-center' style={{marginTop:"3%"}}>{this.state.err}</Card>
                {this.state.devices.map((el)=>{
                    return(
                        <Card className='text-center d-flex flex-row justify-content-center' style={{width:'70%',marginLeft:"15%",marginTop:"3%",background:"rgba(232, 236, 241, 0.3)"}}>
                    <Slider
                    style={{marginTop:'4%',marginBottom:'4%',width:'60%'}}
                    size="small"
                    defaultValue={parseInt(el.varState)}
                    aria-label="Small"
                    name={el.app}
                    valueLabelDisplay="auto"
                    onChangeCommitted={this.onSliderChangeCommit}
                    />
                    <FormControlLabel style={{marginTop:'4%',marginBottom:'4%',marginLeft:'10%'}} control={<IOSSwitch sx={{ m: 1 }} checked={el.state} value={el.state} name={el.app} onChange={this.onButtonChange}/>}label={el.app}/>
                    </Card>
                    )
                })}
            </div>
        )
    }
}