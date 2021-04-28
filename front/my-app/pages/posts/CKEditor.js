import { useState, useCallback, useRef,createRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {Button, Input, Alert} from 'antd'

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import 
    {
        EMP_INSERT_REQUEST,
        TEST_REQUEST
    } 
from '../../reducers/emp'; 


const Editor = ()=>{

    const dispatch = useDispatch(); 
    const {imagePaths} = useSelector((state)=>state.emp);
    const {userInfo} = useSelector((state)=>state.auth); 
    const [content,setContent] = useState('');   
    const [title,setTtile] = useState(''); 
    const blank_pattern = /^\s+|\s+&/g;   
    const imageInput = useRef(); 
    const ref = createRef(); 

    const testSummit = () =>{

        dispatch({
            type: TEST_REQUEST,


       }); 
    }


    //게시글 제출 
    const contentSummit = ()=>{

            if(title.length === 0 || title.replace(blank_pattern,'')===""){
                ref.current.focus();  
                alert('제목을 입력 해 주세요'); 
                return; 
            }

            if(content.length === 0 || content.replace(blank_pattern,'')===""){
                alert('게시글을 작성해 주세요'); 
                return; 
            }

            dispatch({
                 type: EMP_INSERT_REQUEST,
                 data: {content:encodeURI(content),
                        title:encodeURI(title),
                        userNickName:encodeURI(userInfo), 
                },

            }); 
    }

    //제목 입력
    const onChangeTtitle  = useCallback((e)=>{
        setTtile(e.target.value); 
    },[title])

    //이미지 업로드 창 
    const onChangeImages = useCallback((e)=>{
    
        const imageFormData = new FormData(); 
        Array.prototype.forEach.call(e.target.files ,(f)=>{
            imageFormData.append('image',f); 
        });
        
        dispatch({
                type:UPLOAD_IMAGES_REQUEST,
                data:imageFormData,             
        }); 

    },[]); 


    //이미지 업로드 클릭 
    const onClickImageUpload = useCallback(() =>{
        imageInput.current.click(); 

    },[imageInput.current]); 


    return(

        //<div className="demo-editor" >         
        <div style={{height:"400px"}}>
        <h2>게시글을 작성해 보세요!</h2>
        {/*
        <input type="file" multiple ref={imageInput} onChange={onChangeImages} hidden />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        */}
        <Input placeholder='제목을 입력하세요' ref={ref} onChange={onChangeTtitle} style={{marginBottom:'1%'}}/>
        <CKEditor
            editor={ ClassicEditor }
            config={{
             
                ckfinder:{
                     uploadUrl:`http://captainryan.gonetis.com:3095/api/emp/ckeditor?postFlag=1001&user=${userInfo}`,
                    
                     options :{

                     }
                    
                },

                toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList','imageUpload'],
                placeholder: "글을 입력해보세요!",
            

            }}


            //data="<p>Hello from CKEditor 5!</p>"
            //최소 실행시 보여줄 문구 

            onInit={ editor => {
                // You can store the "editor" and use when it is needed.
                console.log( 'Editor is ready to use!', editor );
            } }
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                setContent(data); 
                console.log( { event, editor, data } );
            } }
            onBlur={ ( event, editor ) => {
                console.log( 'Blur.', editor );
            } }
            onFocus={ ( event, editor ) => {
                console.log( 'Focus.', editor );
            } }
        />
        <Button type="primary" onClick={contentSummit} >작성</Button>
        </div>
       

    )

} 


export default Editor; 