import React, { Component } from 'react';
import { Popover, NavBar, Toast, SearchBar } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import { Typography,Menu, Dropdown, Icon } from 'antd';
import '../me.css';
import Gongge from '../../community/common/Gongge';

import tianjia from '../../images/tianjia.png';
import fanhui from '../../images/fanhui_1.png';
import shoucang from '../../images/shoucang.png';
import pinglun from '../../images/pinglun.png';
import dianzan from '../../images/dianzan.png';

const { Paragraph } = Typography;
const Item = Popover.Item;

export default class Community extends Component {
    constructor(){
        super();
        this.state = {
            visible: false,
            selected: '',
            users:[],
            open: false,
        }
    }   
    componentDidMount(){
        fetch("http://47.98.163.228:3004/article?userId="+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
                for(var j=0;j<res[i].cimg.length;j++){
                    res[i].cimg[j] = "http://47.98.163.228:3004"+res[i].cimg[j];
                }
            }
            this.setState({
                users:res
            })
        });
    }
    loadingToast=()=> {
        Toast.loading('正在删除...', 1, () => {
            fetch("http://47.98.163.228:3004/article?userId="+this.props.match.params.id)
            .then(res=>res.json())
            .then(res=>{
                for(var i=0;i<res.length;i++){
                    var j = res[i].userPic.indexOf('/');
                    res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
                    for(var j=0;j<res[i].cimg.length;j++){
                        res[i].cimg[j] = "http://47.98.163.228:3004"+res[i].cimg[j];
                    }
                }
                this.setState({
                    users:res
                })
            })
            this.onToastSuccess();
        });
      }
    onToastSuccess=()=>{
        Toast.success('成功删除文章！',0.8);
    }
    deleteArticle=(id)=>{
        console.log(id);
        fetch("http://47.98.163.228:3004/articleDelete?articleId="+id)
        .then(res=>res.json())
        .then(res=>{
            this.loadingToast();
        });
    }
    //修改时间
    standardTime = (timestamp)=>{
      var mius=Math.round(new Date())-Math.round(new Date(timestamp));
      if(mius<(1000*60)){
          return Math.floor(mius/1000)+'秒前';
      }else if(mius<(1000*60*60)){
          return Math.floor(mius/(1000*60))+'分钟前';
      }else if(mius<(1000*60*60*24)){
          return Math.floor(mius/(1000*60*60))+'小时前';
      }else if(mius<(1000*60*60*24*30)){
          return Math.floor(mius/(1000*60*60*24))+'天前';
      }else if(mius<(1000*60*60*24*30*12)){
          return Math.floor(mius/(1000*60*60*24*30))+'个月前';
      }else{
          return Math.floor(mius/(1000*60*60*24*30*12))+'年前';
      }
    }
    render() {
        return (
            <div style={{width:'100%'}}>
                <NavBar 
                style={{width:'100%',backgroundColor:'#fc9d9a',color:'white',position:'fixed',top:0,left:0,zIndex:99}}
                leftContent={<Link to={"/apptab/"+this.props.match.params.id+'&me'}><img src={fanhui} style={{width:'30px'}} key="fantttt"/></Link>}
                rightContent={<Link to={"/articleadd/"+this.props.match.params.id}><img src={tianjia} style={{width:"20px"}}/></Link>}
                >发帖</NavBar>
                <NavBar></NavBar>
                <SearchBar placeholder="请输入你要查找的名字" maxLength={4} style={{backgroundColor:'#ccc'}}/>
                {
                    this.state.users.map((item)=>(<div className="article" key={item.articleId}>
                        <div className='artUser'>
                            <img className='userImg' src={item.userPic} alt=""/>
                            <span className='userName'>{item.userName}</span>
                            <button style={{float:"right",fontSize:"16px",color:"#fff",padding:"8px 15px",border:"2px solid #85c7fd",borderRadius:"6px",backgroundColor:"#97cdf9"}} onClick={()=>this.deleteArticle(item.articleId)}>删除文章</button>
                        </div>
                        <div className="artDetail">
                            {item.content}
                            <Gongge cimg={item.cimg}/>
                        </div>
                        <ul className="artState">
                            <li><span>{this.standardTime(item.time)}</span></li>
                            <li><Link to={"/shequarticle/"+item.articleId+"&"+this.props.match.params.id}><img src={`${pinglun}`} alt=''/><span style={{color:"#444"}}>{item.review || "评论"}</span></Link></li>
                            <li><img src={shoucang} alt=''/><span>{item.save || "收藏"}</span></li>
                            <li><img src={dianzan} alt=''/><span>{item.agree || "点赞"}</span></li>
                        </ul>
                    </div>))
                }
                {/* </Drawer> */}
            </div>
        );
    }
}