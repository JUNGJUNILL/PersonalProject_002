
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
        <ul className="navul">
    
            
            <li className="navli"><HomeOutlined onClick={gotoHome} /></li>    
 
            {/*
            <li className="navli"><Link href={'/about'} ><a>About</a></Link></li>
            <li className="navli"><Link href={'/count'} ><a>Count</a></Link></li>
            */}
            {/* 
            <li className="navli"> <Link href={{pathname:'/posts/emp',query:{nowPage:1}}} ><a>emp</a></Link></li>  
            <li className="navli"> <Link href={'/posts/dealerInfo'}><a>유통사정보</a></Link></li> 
            <li className="navli"> <Link href={{pathname:'/posts/fileupload'}} ><a>파일업로드</a></Link></li>      
            */}                
            {!userInfo && <li className="navli"><Link href={'/auth/login'} ><a>로그인</a></Link></li>  }        
            {!userInfo && <li className="navli"><Link href={'/auth/join'} ><a>회원가입</a></Link></li> }

            

            
            {/*
            {userInfo &&  <li className="navli"><Link href={'/userInfo'} ><a>회원정보</a></Link></li> }
            {userInfo &&  <li className="navli"><Link href={'/detailPage'} ><a>상세페이지</a></Link></li> }
            */}
            
            
            
            {userInfo &&   <li className="navli" onClick={logOut} >로그아웃</li>} 
            
            {/* 
            리엑트 테스트용
            {<li className="navli"><Link href={'/test'} ><a>test</a></Link></li>    } 
            {<li className="navli"><Link href={'/test02'} ><a>memo</a></Link></li>    } 
            {<li className="navli"><Link href={'/movie'} ><a>movie</a></Link></li>    } 
            {<li className="navli"><Link href={'/useCallback'} ><a>useCallback</a></Link></li>    } 
            {<li className="navli"><Link href={'/useEffect'} ><a>useEffect</a></Link></li>    }     
            {<li className="navli"><Link href={'/inputBoxParent'} ><a>inputBoxParent</a></Link></li>    }     
            */}
            
        </ul>
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