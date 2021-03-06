import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import Back from '../images/返回 (1).png';

export default class Home extends Component {
    constructor(){
        super();
        this.state={
            url:'http://47.98.163.228:8084/home',
            picture:[],
            num:0
        }
    }
    componentDidMount(){
        fetch(this.state.url)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                picture:res
            })
            console.log(this.state.picture)
        });
    }
    render() {
        return (
            <div>
                <NavBar
                    leftContent={
                        <Link to="/zhenglitab"><img src={Back} style={{ width: '30px', height: "30px" }} key="fan"/></Link>
                    }
                style={{backgroundColor:'rgb(252, 157, 154)'}}>家</NavBar>
                <div>
                    {
                    this.state.picture.map((item,i)=>(
                        console.log(i),
                        i==this.state.num?<img src={`http://47.98.163.228:8084/${item}`}style={{width:'120px',height:'120px',margin:'2px',border:'2px solid red'}}/>:
                    <img src={`http://47.98.163.228:8084/${item}`} style={{width:'120px',height:'120px',margin:'2px'}}/>
                    ))
                    }
                </div>
            </div>
        )
    }
}
