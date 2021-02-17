import React , {useState,useEffect,useCallback}from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import 
    {TEST_REQUEST,
     TEST_SUCCESS
    } 
from '../reducers/testReducer'; 


const testComponent = () =>{

    const dispatch         = useDispatch(); 
    const {testArray}      = useSelector((state)=>state.testReducer); 
    //const testArray = [1,2,3,4,5]
    useEffect(()=>{

        dispatch({
            type:TEST_REQUEST, 
        });

    },[]); 



    return (    


      <ul>
        빠락스 비어
        {testArray.map((v) => (
          <li>{v}</li>
        ))}
      </ul>

      )


}

export default testComponent; 