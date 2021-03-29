import { ConsoleSqlOutlined } from '@ant-design/icons';
import React,{useState,useCallback,useRef,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import 
    {FILE_UPLOAD_REQUEST,} 
    from '../../reducers/testReducer'; 

const FileUpload = () =>{

    const uploadInput = useRef(); 
    const dispatch = useDispatch();
  

    const hello = (e) =>{
        e.preventDefault(); 

       const uploadFormData = new FormData(); 
        uploadFormData.append('files',uploadInput.current.files[0]); 
        dispatch({type:FILE_UPLOAD_REQUEST,
                  data:uploadFormData, 
        }); 
       // console.log('e.target.files[0]=>' , e.target.files[0]); 

    }

    const onChangeFileUpload = (e) =>{
        console.log(e.target.files); 
    }


    return (
        <form onSubmit={hello} encType="multipart/form-data">
        
        <div>파일 업로드</div>
        <br />
        <input type="file" name="files" ref={uploadInput} onChange={onChangeFileUpload}/>

        <button type="submit">아즈가</button>
        </form>
        )

}

export default FileUpload; 

