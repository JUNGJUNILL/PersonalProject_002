import React, { useCallback,useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router'; 
import 
    {JOIN_REQUEST,} 
from '../reducers/auth'; 
import {Button} from 'antd'


const Join = ()=>{

    const dispatch = useDispatch(); 
    const {isJoinng , joined} = useSelector(state => state.auth); 

    const [id,setId] = useState(''); 
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [passwordCheck, setPasswordCheck] = useState(''); 
    const [passwordErr,setPasswordErr] = useState(false); 


    if(joined){
        alert(joined); 
        Router.push('/login'); 
    }


    
    const onSubmit = useCallback((e)=>{
        e.preventDefault();
        if(password !== passwordCheck){

            return setPasswordErr(true); 
        }

        dispatch({
                    type:JOIN_REQUEST, 
                    data:{
                        id:id, 
                        nickname:nickName, 
                        password:password,
                        email:email, 
                        phone:phone, 
                        address:address, 
                    }
        })

    },[id,nickName,password,email,address]); 

    const onChangeId = useCallback((e)=>{
            setId(e.target.value); 
    },[id])

    const onChangeNickName = useCallback((e)=>{
        setNickName(e.target.value); 
    },[nickName])

    const onChangPassword = useCallback((e)=>{
        setPassword(e.target.value); 
    },[password])

    const onChangePasswordCheck = useCallback((e)=>{
        setPasswordErr(e.target.value !== password); 
        setPasswordCheck(e.target.value); 
    },[passwordCheck])

    const onChangeEmail = useCallback((e)=>{
        setEmail(e.target.value); 
    },[email])

    const onChangePhone = useCallback((e)=>{
        setPhone(e.target.value); 

    },[phone])

    const onChangeAddress = useCallback((e)=>{
        setAddress(e.target.value); 
    },[address])


    return (
            <>
            <form onSubmit={onSubmit}>
                <div className='divTable' style={{marginTop:'3%'}} >
                    <div className='divTableBody'>
                        <div className='divTableRow'>
                                <div className='divTableCell'>아이디:</div>
                                <input type="text" name="id" value={id} onChange={onChangeId}/>
                        </div>
                        <div className='divTableRow'>
                                <div className='divTableCell'>닉네임:</div>
                                <input type="text" name="nickname" value={nickName} onChange={onChangeNickName} />
                        </div>
                        <div className='divTableRow'>
                                <div className='divTableCell'>비밀번호:</div>
                                <input type="password" name="nickname" value={password} onChange={onChangPassword} />
                        </div>
                        <div className='divTableRow'>
                                <div className='divTableCell'>비밀번호확인:</div>
                                <input type="password" name="nickname" value={passwordCheck} onChange={onChangePasswordCheck} />
                        </div>
                        <div>
                            {passwordErr && <div style={{color:'red'}}>비밀번호가 다릅니다.</div>}
                        </div>
                        <div className='divTableRow'>
                                <div className='divTableCell'>이메일:</div>
                            <input type="text" name="email" value={email} placeholder="EX) aaa@naver.com" onChange={onChangeEmail}/>
                        </div>
                        <div className='divTableRow'>
                                <div className='divTableCell'>전화번호:</div>
                            <input type="text" name="phone" value={phone}  onChange={onChangePhone}/>
                        </div>
                        <div className='divTableRow'>
                                <div className='divTableCell'>주소:</div>
                            <input type="text" name="adress" value={address}  onChange={onChangeAddress}/>
                        </div>
                    </div>
                </div>
                <Button onClick={onSubmit} loading={isJoinng}>가입하기</Button>
            </form>
            </>
    )


}

export default Join; 