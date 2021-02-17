
import React , {useState,useEffect,useCallback}from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import 
    {TEST_REQUEST,
     TEST_SUCCESS
    } 
from '../../reducers/testReducer'; 

const testPage  = () =>{

    const dispatch         = useDispatch(); 
    const {testArray}      = useSelector((state)=>state.testReducer); 
    useEffect(()=>{

        dispatch({
            type:TEST_REQUEST, 
        });

    },[]); 

    return (

     
        <ul>
        hello world
        {testArray.map((v)=>(
           <i>{v.movieNm}</i>
        ))}
        </ul>

    )

}

export default testPage