//引入
import React, { Component } from 'react'
import { NavBar,Grid,Tabs,WhiteSpace} from 'antd-mobile';
import { NoticeBar, Icon } from 'antd-mobile';
import './wear.css';
import didian from '../images/didian.png'
import qing from '../images/yang.png'
import mote from '../images/mote.png'
import mote2 from '../images/motewu.png'
import fenxiang from '../images/fenxiang(1).png'
import pengyouquan from '../images/pengyouquan.png'
import weixin from '../images/weixin (2).png'
import weibo from '../images/weibo (2).png'
import QQ from '../images/QQ (2).png'
import kongjian from '../images/qqkongjian.png'
import shequ from '../images/shequ.png'
import chuandariji from '../images/tupian.png'
import fuzhilianjie from '../images/fuzhilianjie.png'
import buganxingqu from '../images/buganxingqu_44.png'
import jubao from '../images/jubao.png'
import xiaoren0 from '../images/xiaoren.png'
import beijing from '../images/yu.gif'
import beijing2 from '../images/qing.jpg'
import yun from '../images/yun.png'
import xiayu from '../images/xiayu.png'
import {Link} from 'react-router-dom'
//美妆部分图片
//图片导入
import t0 from '../images/t0.png'
import t1 from '../images/t1.png'
import t2 from '../images/t2.png'
import t3 from '../images/t3.png'
import t4 from '../images/t4.png'
import t5 from '../images/t5.png'
import t6 from '../images/t6.png'
import y1 from '../images/y1.png'
import y2 from '../images/y2.png'
import y3 from '../images/y3.png'
import y4 from '../images/y4.png'
import e1 from '../images/e1.png'
//变色
import t1_bai from '../images/pre/t1_bai.png'
import t1_hair from '../images/pre/t1_hair.png'
import t4_bai from '../images/pre/t4_bai.png'
import t4_hair from '../images/pre/t4_hair.png'
import t5_bai from '../images/pre/t5_bai.png'
import t5_hair from '../images/pre/t5_hair.png'
import t6_bai from '../images/pre/t6_bai.png'
import t6_hair from '../images/pre/t6_hair.png'

//男女模特
import Girl from './Girl'
import Boy from './Boy'
import mote_boy from '../images/boy/mote_boy.png'
//美妆部分
const hair = [t0,t1,t2,t3,t4,t5,t6]
const hair_bai = [t1_bai,t1_bai,t1_bai,t1_bai,t4_bai,t5_bai,t6_bai]
const hair_hair = [t1_bai,t1_hair,t1_hair,t1_hair,t4_hair,t5_hair,t6_hair]
const glasses = [y1,y2,y3,y4]
const eye = [e1]

const src =[beijing2,beijing];
//分享按钮
const data2 = Array.from(new Array(5)).map(() => ({
    icon:[chuandariji,shequ,fuzhilianjie,buganxingqu,jubao]
}));
const data1 = Array.from(new Array(5)).map(() => ({
  icon:[weixin,pengyouquan,weibo,QQ,kongjian]
}));
const c=['#00cc00','#ccff99','white','#3399ff','#FFCC66'];
const w_t=[yun,xiayu,qing]//天气预报小图标

export default class Wear extends Component {
  constructor(){
    super();
    this.state = {
        data:[],
        ss: ['微信好友','朋友圈','微博','QQ好友','QQ空间'],
        ss1: ['穿搭日记','社区','复制链接','不感兴趣','举报'],
        url0:'http://47.98.163.228:3001/react',
        url:'http://47.98.163.228:3001/weather',
        city:'南京',//用户城市
        temperature:'2',//最低气温
        temperature2:'13',//最高气温
        dressing_advice:'',//穿衣建议
        weather:'晴',//天气
        idx:0,//显示天气图标
        arr:[],arr_s:[],//大小图地址
        ku:[],ku_s:[],qun:[],qun_s:[],yi:[],yi_s:[],tao:[],tao_s:[],tuijian:[],tuijian_s:[],//小图标
        count:0,
        href:'#/apptab',
        userId:window.location.href.split('#')[1].split('/')[2],
        ress:[],
        linshi:0,//推荐跳转整理箱的idx
        tiaosrc : ['/diaryAdd/','/articleadd/',''],
        color:'',//发色
        index1:0,//发型
        index2:-1,//瞳色
        index3:-1,//眼镜
        color2:'',
        cc:[],
        num:0,
        num2:0,
        feng:'',
        speak_suggest:'',
        sex:'',
    }
  }    
  componentDidMount(){
        //获取图片信息
        var small=[],big=[];
        fetch('http://47.98.163.228:3001/react',{
            method: 'post', 
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId:this.props.id})  
        })
        .then(res=>res.json())
        .then(res=>{
          console.log(res)
            //把读取的图片放进来
            if(res[0].cloSmallPic){     
            for(var i=0;i<res.length;i++){//循环res的图
              var j = res[i].cloSmallPic.indexOf('/');
              if(res[0].userSex=='女'){
                res[i].cloSmallPic = "http://47.98.163.228:3001"+res[i].cloSmallPic.substr(j);
                big[i] = res[i].cloSmallPic;
              }else{
                res[i].cloSmallPic = "http://47.98.163.228:3001"+res[i].cloSmallPic.substr(j);
                big[i] =  "ht"+res[i].cloSmallPic.substr(j).split('.png')[0]+'_boy.png'
              }
              var name = res[i].cloSmallPic.substr(j).split('/')[4];
              var n = name.split('.')[0];
              small[i] = "http://47.98.163.228:3001/images/"+n+'_s.png'
              console.log(big[i])//大图地址
              console.log(small[i])//小图地址
              this.setState({
                city:res[0].userCity,
                ress:res,//意义不大
                arr:big,
                arr_s:small,
                sex:res[0].userSex,
             },function(){
              this.weather();
             })
            }
          //分类存小图标
          var kuku=[],kuku_s=[];//裤子
          var qunqun=[],qunqun_s=[];//裙子
          var yiyi=[],yiyi_s=[];//上衣
          var taotao=[],taotao_s=[];//外套
          for(var i = 0;i<this.state.arr.length;i++){
            var n = this.state.arr[i].split('/')[4];
            //判断裤子，把图存进去
            if(n.indexOf('ku')!=-1){
              kuku.push(this.state.arr[i]);
              kuku_s.push(this.state.arr_s[i])
            }
            //判断裙子类别
            if(n.indexOf('qun')!=-1){
              qunqun.push(this.state.arr[i]);
              qunqun_s.push(this.state.arr_s[i])
            }
            //判断上衣
            if(n.indexOf('yi')!=-1){
              yiyi.push(this.state.arr[i]);
              yiyi_s.push(this.state.arr_s[i])
            }
            //判断外套
            if(n.indexOf('tao')!=-1){
              taotao.push(this.state.arr[i]);
              taotao_s.push(this.state.arr_s[i])
            }
          }
          this.setState({
            qun:qunqun,qun_s:qunqun_s,yi:yiyi,yi_s:yiyi_s,tao:taotao,tao_s:taotao_s,ku:kuku,ku_s:kuku_s
          })
          //实现推荐
          var tuitui=[],tuitui_s=[];
          var diwen = this.state.temperature.charAt(0);
          if(diwen<0){
            this.setState({
              tuijian:this.state.yi,
              tuijian_s:this.state.yi_s
            })
          }else{//最低温度大于0
            for(var i = 0;i<=this.state.ress.length-1;i++){
              var j = this.state.ress[i].cloSmallPic.indexOf('/');
              if(this.state.sex=='女'){
                big[i] = "http:"+this.state.ress[i].cloSmallPic.substr(j);
              }else{
                big[i] =  "http:"+this.state.ress[i].cloSmallPic.substr(j).split('.png')[0]+'_boy.png'
              }
              var name = this.state.ress[i].cloSmallPic.substr(j).split('/')[4];
              var n = name.split('.')[0];
              small[i] = "http://47.98.163.228:3001/images/"+n+'_s.png'
              if(n.indexOf('duan')==-1){//如果是短裙
                tuitui.push(big[i]);
                tuitui_s.push(small[i])    
                //长裙变色......
              }
            }  
            this.setState({
              tuijian:tuitui,
              tuijian_s:tuitui_s,
            })
          }
        }
      })
      this.updata_image();
  }
  //获取用户天气
  weather(){
      fetch('http://47.98.163.228:3001/weather',{
        method: 'post', 
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userCity:this.state.city})  
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res);
      this.setState({
        temperature:res.data[0].tem2,
        temperature2:res.data[0].tem1,
        dressing_advice:res.data[0].index[3].desc,
        weather:res.data[0].wea,
        speak_suggest:res.data[0].index[1].desc
      },function(){
        this.weather_icon();
      })
    })
  }
  //根据天气显示背景和图标
  weather_icon(){
    switch(this.state.weather){
      case '多云':
        this.idx = 0;
        break;
      default:
        this.idx = 0;
        break;
    }
  }
    aaa=(idx)=>{
      if(idx==1){
        window.location.href =window.location.href.split('#')[0]+'#/articleadd/'+this.props.id
      }else{
        window.location.href =window.location.href.split('#')[0]+'#'+ this.state.tiaosrc[idx]+this.props.id
      }
    }
    //分享
    click_share=()=>{
      var div = document.getElementById('fenxiang');
      div.style.display='block'
    }
    click_unShare=()=>{
      var div = document.getElementById('fenxiang');
      div.style.display='none'
    }
    //原跳转
    hrefChange(str){
      var h=window.location.href;
      var index = h.lastIndexOf("\/");  
      window.location.href = h.substring(0, index+1)+str;
    }
    //给模特穿衣服
    qunzi=(idx)=>{
      document.getElementById('mote_4').style.display='none'
      document.getElementById('mote').style.display = 'none';
      document.getElementById('mote_2').style.display = 'block';
      document.getElementById('mote2').src=this.state.qun[idx];
      document.getElementById('mote2').style.display = 'block';
      if(this.state.qun[idx].indexOf('duan')!=-1){

      }else{
        document.getElementById('mote3').style.display = 'none';
        document.getElementById('mote4').style.display = 'none';
      }
    }
    kuzi=(idx)=>{
      document.getElementById('mote').style.display = 'none';
      document.getElementById('mote_2').style.display = 'block';
      document.getElementById('mote2').src=this.state.ku[idx];
      document.getElementById('mote2').style.display = 'block';
    }
    shangyi=(idx)=>{
      document.getElementById('mote').style.display = 'none';
      document.getElementById('mote_2').style.display = 'block';
      document.getElementById('mote3').src=this.state.yi[idx];
      document.getElementById('mote3').style.display = 'block';
    }
    waitao=(idx)=>{
      document.getElementById('mote').style.display = 'none';
      document.getElementById('mote_2').style.display = 'block';
      document.getElementById('mote4').src=this.state.tao[idx];
      document.getElementById('mote4').style.display = 'block';
    }
//推荐的点击事件
    tuijian=(idx)=>{
      this.state.count++;//判断点击几次
        var a = setTimeout(()=>{
          if(this.state.count>1){//双击
            var place = this.zhao(idx,this.state.tuijian)
            this.fasong(this.state.linshi,place)
          }else{
            document.getElementById('mote').style.display = 'none';
            document.getElementById('mote_2').style.display = 'block';
            if(this.state.tuijian[idx].indexOf('ku')!==-1){ //裤子2
              document.getElementById('mote6').style.display = 'none';
              document.getElementById('mote_5').style.display = 'none';
              document.getElementById('mote_4').style.display = 'none';
              document.getElementById('mote2').src=this.state.tuijian[idx];
              document.getElementById('mote2').style.display = 'block';
            }
            if(this.state.tuijian[idx].indexOf('qun')!==-1){ //裙子2
              document.getElementById('mote6').style.display = 'none'
              document.getElementById('mote_5').style.display = 'none';
              document.getElementById('mote_4').style.display='none'
              document.getElementById('mote_5').style.display='none'
              document.getElementById('mote2').src=this.state.tuijian[idx];
              document.getElementById('mote2').style.display = 'block';      
              //变色......
              if(this.state.tuijian[idx].indexOf('duan')!=-1){ //包括短裙

              }else{//连衣裙
                document.getElementById('mote3').style.display = 'none';
                document.getElementById('mote4').style.display = 'none';
              }
            }
            if(this.state.tuijian[idx].indexOf('yi')!==-1){
              document.getElementById('mote6').style.display = 'none';
              document.getElementById('mote_5').style.display = 'none';
              document.getElementById('mote3').src=this.state.tuijian[idx];
              document.getElementById('mote3').style.display = 'block';
              if(document.getElementById('mote2').src.indexOf('qun')!=-1){
                if(document.getElementById('mote2').src.indexOf('dun')!=-1){
                  document.getElementById('mote2').style.display = 'none';
                  document.getElementById('mote4').style.display = 'none';
                }
              }
            }
            if(this.state.tuijian[idx].indexOf('tao')!==-1){
              document.getElementById('mote6').style.display = 'none';
              document.getElementById('mote_5').style.display = 'none';
              document.getElementById('mote4').src=this.state.tuijian[idx];
              document.getElementById('mote4').style.display = 'block';
            }
            this.setState({
              count:0
            })
          }
      },200)
    }
    //找到位置
    zhao=(idx,weizhi)=>{
      var place='';
      //找到它的存储地点
      var nnn = weizhi[idx].split('/')[4].split('.')[0];
      for(var i = 0;i<this.state.ress.length;i++){
        if(this.state.ress[i].cloSmallPic.indexOf(nnn)!=-1){
            place = this.state.ress[i].cloPlace
            break;
        }
      }
      //判断存储位置的第几个
      for(var i = 0;i<this.state.ress.length;i++){
        if(this.state.ress[i].cloPlace===place){
          this.setState({
            linshi:this.state.linshi+1
          },function(){
              console.log(this.state)
          })
        if(this.state.ress[i].cloSmallPic.indexOf(nnn)!=-1){
          break;
        }
      }
    }
    return place
    }
    //向整理箱发送衣物编号（从1开始）
    fasong=(idx,place)=>{
      localStorage.setItem('count',0);
      localStorage.setItem('zlx_num',idx);
      this.tiaozhuan(place)
    //   fetch("http://47.98.163.228:3001/pp", {
    //     method: 'post', 
    //     "Access-Control-Allow-Origin" : "*",
    //     "Access-Control-Allow-Credentials" : true,
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({msg:idx}) 
    //   })
    //   .then(this.tiaozhuan(place))
    }
    //跳转整理箱url
    tiaozhuan=(place)=>{
      var p = '';
      switch(place){
        case '家':p='home';break;
        case '行李箱':p='trunk';break;
        case '柜子':p='robe';break;
      }
      window.location.href =window.location.href.split('#')[0]+ '#/'+p+'/'+this.props.id;
    }
    //颜色转换
    whichColor=(name)=>{
      var color='';
      switch(name){
        case '白色':color='#fffbf0';break;
        case '黑色':color='black';break;
        case '红色':color='#be002f';break;
        case '绿色':color='#7ecad';break;
        case '蓝色':color='#3eede7';break;
        case '黄色':color='#ffc773';break;
        case '紫色':color='#815476';break;
        default:color='purple';break;
      }
      return color;
    }
    //美妆部分
    updata_image(){
      console.log(this.props.id)
      fetch('http://47.98.163.228:3001/get_mote_style',{
        method: 'post', 
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId:this.props.id})  
      })
      .then(res=>res.json())
      .then(res=>{
        console.log('get_mote_style:'+JSON.stringify(res));
        var arr = JSON.stringify(res);
        console.log(JSON.parse(arr)[0].userId)
        this.setState({
          index1:JSON.parse(arr)[0].index1,
          index2:JSON.parse(arr)[0].index2,
          index3:JSON.parse(arr)[0].index3,
          color:JSON.parse(arr)[0].color,
        })
        console.log(this.state.color)
        console.log(this.state.sex)
        if(this.state.color !== '' && this.state.sex=='女'){
            console.log('???????')
          document.getElementById('change_hair_color').style.display='block';
          document.getElementById('change_hair_style').style.display='block';
          document.getElementById('change_hair_color').style.filter=`drop-shadow(150px 0 ${this.state.color})`;
          document.getElementById('change_hair_color').style.opacity=0.9
        }
      })
    }
    speak=()=>{
      const msg = new SpeechSynthesisUtterance(this.state.speak_suggest);
      window.speechSynthesis.speak(msg);
    }
    //渲染组件
    render() {
        return (
            <div id="beijingg" className="body" style={{width:'100%',height:'100%',background:`url(${src[this.state.idx]})`,backgroundRepeat: 'no-repeat',backgroundPosition: 'right bottom'}}>
              {/* 头 */}
                <NavBar style={{backgroundColor:'#fc9d9a',color:'white'}}
                >穿搭</NavBar>
              {/* 天气 */}
              <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }} id="lalala" onClick={this.speak.bind(this)}>
                    <img src={didian} style={{width:'30px',float:'left',position:'relative',top:'-5px',marginTop:'7px'}} key="fan1"/>
                    <span id="shi" style={{float:'left'}}>{this.state.city}</span>
                    <span style={{float:'left'}}>今日天气:</span>
                    <img src={w_t[this.state.idx]} style={{width:'25px',float:'left',marginLeft:'5px',marginRight:'5px',marginTop:'3px'}} key="fan2"/>
                    <span style={{marginLeft:'5px',marginRight:'5px'}}>{this.state.weather}</span>
                    <span>{this.state.temperature}~{this.state.temperature2}</span>
                    <span>{this.state.dressing_advice}</span>
                    <span>{this.state.speak}</span>
              </NoticeBar>
              {/* <p style={{fontWeight:'800',marginTop:'15px',marginLeft:'15px',fontSize:'20px',height:'20px',color:'white'}}>
                  {this.state.dressing_advice}
              </p> */}
                {/* 模特 */}
                {
                    this.state.sex=='女'?
                    <div>
                        <img src={mote2} id="mote"/>
                        <img src={mote2} id="mote_2"/>
                         <div className="icon" id="mote22"><img  className='icon3'  id="mote_4" /></div>
                        <img  id='mote2' />
                        <img  id='mote3' />
                        <img  id='mote4' />               
                        <div className="icon" id="mote22"><img  className='icon4'  id="mote_5" /></div>
                        <img  id='mote6' />
                        {/* 美妆部分 */}
                        <Link to={"/pretty/"+this.props.id}>
                        <img src={eye[this.state.index2]} id="t22"/>
                        <img src={glasses[this.state.index3]} id="t33"/>
                        <img src={hair[this.state.index1]} className="t00"/>
                        {/* 改变发色 */}
                        <img src={hair_bai[this.state.index1]} className="t00" style={{left:'-120px',display:"none"}} id="change_hair_color"/>
                        <img src={hair_hair[this.state.index1]} style={{display:"none"}} className="t00" id="change_hair_style"/>
                        </Link>
                    </div>
                    :<div>
                        <img src={mote_boy} id="mote"/>
                        <img src={mote_boy} id="mote_2"/>
                         <div className="icon" id="mote22"><img  className='icon3'  id="mote_4" /></div>
                        <img  id='mote2' />
                        <img  id='mote3' />
                        <img  id='mote4' />               
                        <div className="icon" id="mote22"><img  className='icon4'  id="mote_5" /></div>
                        <img  id='mote6' />
                    </div>
                }
                {/* 衣物栏 */}
                <div id="yiwu">
                  <WhiteSpace />
                  <Tabs
                    tabs={this.state.sex=='女'?tabs:tabs2}
                    initialPage={0}
                    tabBarPosition="left"
                    tabDirection="vertical"
                  >
                    <div style={{width:'100px', display: 'flex',
                      height: '1000px', backgroundColor: '#fff' }}>
                      <ul className="yifu" id='yifu1'>
                      {
                          this.state.tuijian_s.map((item,idx)=>(
                            <li key={idx} style={{height:'100px'}}>
                              <img style={{width:'85%'}} 
                                src={item} 
                                onClick={this.tuijian.bind(this,idx)}
                                />
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    <div style={{width:'100px', display: 'flex',
                      height: '500px', backgroundColor: '#fff' }}>
                      <ul className="yifu" id='yifu2'>
                      {
                          this.state.tao_s.map((item,idx)=>(
                            <li  key={idx} style={{height:'100px'}}>
                              <img style={{width:'85%'}} 
                                src={item} 
                                onClick={this.waitao.bind(this,idx)}
                                />
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    <div style={{width:'100px', display: 'flex',
                      height: '500px', backgroundColor: '#fff' }}>
                      <ul className="yifu" id='yifu3'>
                      {
                          this.state.yi_s.map((item,idx)=>(
                            <li key={idx} style={{height:'100px'}}>
                              <img style={{width:'85%'}} 
                                src={item} 
                                onClick={this.shangyi.bind(this,idx)}
                                />
                            </li>
                          ))
                        }
                      </ul>
                    </div>   
                    <div style={{width:'100px', display: 'flex',
                      height: '500px', backgroundColor: '#fff' }}>
                      <ul className="yifu" id='yifu4'>
                        {
                          this.state.ku_s.map((item,idx)=>(
                            <li key={idx} style={{height:'100px'}}>
                              <img style={{width:'85%'}} 
                                src={item} 
                                onClick={this.kuzi.bind(this,idx)}
                                />
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    <div style={{width:'100px', display: 'flex',
                      height: '500px', backgroundColor: '#fff' }}>
                      <ul className="yifu" id='yifu5'>
                          {
                          this.state.qun_s.map((item,idx)=>(
                            <li key={idx} style={{height:'100px'}}>
                              <img style={{width:'85%'}} 
                                src={item} 
                                onClick={this.qunzi.bind(this,idx)}
                                />
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </Tabs>
                  <WhiteSpace />
                </div>
                <a onClick={this.click_share} id="zhenglitab">
                    <img src={fenxiang} style={{width:'30px',float:'right',position:'relative',bottom:'-170px',right:'10px'}} key="fanxiang"/>
                </a>
                {/* 小人 */}
                {/* <img src={xiaoren0} id="xiaoren"/> */}
                {/* 分享栏 */}
                  <div id="fenxiang">
                    <p style={{textAlign:'center'}}>分享至</p>
                      <Grid data={data1}
                      columnNum={5}
                      renderItem={(dataItem,idx) => (
                          <div>
                          <img src={dataItem.icon[idx]} style={{ width: '40px', height: '40px' ,borderRadius:'50px',backgroundColor:c[idx], marginTop:'20px'}} alt="" />
                          <div>
                              <span>{this.state.ss[idx]}</span>
                          </div>
                          </div>
                      )}
                    />
                  <hr />
                  <Grid data={data2}
                      columnNum={5}
                      renderItem={(dataItem,idx) => (
                        <div onClick={()=>this.aaa(idx)}>
                          <img src={dataItem.icon[idx]} style={{ width: '40px', height: '40px', marginTop:'20px'}} alt="" />
                          <div>
                              <span>{this.state.ss1[idx]}</span>
                          </div>
                        </div>
                      )}
                    />
                    <hr />
                    <p onClick={this.click_unShare} style={{textAlign:'center'}}>取消</p>
                  </div>
            </div>
        );
    }

}

const tabs = [
  { title: '为你推荐'},
  { title: '外套' },
  { title: '上衣'},
  { title: '裤子'},
  { title: '连衣裙'},
];
const tabs2 = [
    { title: '为你推荐'},
    { title: '外套' },
    { title: '上衣'},
    { title: '裤子'},
    { title: '鞋'},
  ];
  