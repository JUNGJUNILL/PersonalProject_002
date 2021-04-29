
import {useCallback,useState,useEffect, useRef} from 'react'
import {Row,Col,Button,Layout} from  'antd'; 
import {UnorderedListOutlined,HomeOutlined } from '@ant-design/icons'


import Router from 'next/router'; 
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';


import wrapper from '../store/configureStore';


const AppLayOut = ({children}) =>{
    const dummyList = ['카테코리01','카테코리02','카테코리03','카테코리04','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05','카테코리05']; 
   
    const dispatch = useDispatch(); 
    const {userInfo, joined} = useSelector((state)=>state.auth); 

    useEffect(()=>{
        //로그 아웃 후 메인 페이지로 이동
        if(!userInfo){
            Router.push('/'); 

        }

    },[userInfo]);

    //로그아웃 버튼
    const logOut = useCallback((e)=>{

        dispatch({
            type:LOGOUT_REQUEST, 
        });

    },[userInfo]); 
 
    const [isClicked,setIsClicked] = useState(false); 
    const inputEl = useRef(null); 
  

    const catergoriList = () =>{
          setIsClicked(!isClicked);
    }

    const closeCatergoriList = () =>{
        setIsClicked(false);
    }

    const gotoHome = () =>{
        Router.push('/'); 
    }

    
    return(

        <Row>
    

        <Col xs={24}>
 
  
        <header className="hd">
        <h1 className="h1">
        <img src="http://localhost:3095/koielogo.jpg" style={{width:"111",height:"28",justifyContent:"left"}}></img>
	    </h1>
        <div className="fr" style={{marginRight:"-5px"}}>
         
            <Link href={'/auth/login'} ><a className="mu">로그인</a></Link>
            <Link href={'/auth/join'} ><a className="mu">회원가입</a></Link>

        </div>
        </header>
        

        <ul className="navulSub">
        <li className="navli" onClick={catergoriList}><UnorderedListOutlined /></li>
        <li className="navli"><Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1}}} ><a>메인1001</a></Link></li>
        <li className="navli"><Link href={''} ><a>게시판1</a></Link></li>
        <li className="navli"><Link href={''} ><a>게시판2</a></Link></li>
        </ul>
        
    <div className="sidenav" style={{width : isClicked? "40%":"0"}}>
       <a className="closebtn" onClick={closeCatergoriList}>x</a>
       {dummyList.map((v,i)=>(      
        <Link href={'/about'} key={i}>
            <a onClick={closeCatergoriList} >{v}</a>
        </Link>
       ))}
    </div>          
    {children}
    </Col>

    <div className="footerSub"></div>
    <div className="footer">광고입니다.</div>
    </Row> 
     
        ); 

}

export default AppLayOut; 