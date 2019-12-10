import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import Back from '../images/返回 (1).png';

export default class Trunk extends Component {
    constructor(){
        super();
        this.state={
            url:'http://47.98.163.228:8089/trunk',
            picture:[]
        }
    }
    componentDidMount(){
        // console.log(this.props.match.params.id);//获取用户id
        fetch(this.state.url)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                picture:res
            })
            console.log(res);
        });
        fetch("http://47.98.163.228:8089/userid", {
        method: 'post', 
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:JSON.stringify({userId:this.props.match.params.id}) 
      })
    }
    render() {
        return (
            <div>
                <NavBar
                    leftContent={
                        <Link to={"/zhenglitab/"+this.props.match.params.id}><img src={Back} style={{ width: '30px', height: "30px" }} key="fan"/></Link>
                    }
                style={{backgroundColor:'rgb(252, 157, 154)'}}>行李箱</NavBar>
                <div>
                    {
                    this.state.picture.map((item,i)=>(<img src={`http://47.98.163.228:8089/${item}`} style={{width:'120px',height:'120px',margin:'2px'}}/>))
                    }
                </div>
            </div>
        )
    }
}
