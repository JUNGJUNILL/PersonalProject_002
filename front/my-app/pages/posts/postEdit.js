import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router'
import {PictureOutlined,PlaySquareOutlined,CloseOutlined} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import {Button, Input,} from 'antd'
import 
    {
        UPLOAD_IMAGES_REQUEST
    } 
from '../../reducers/mainPosts_1001';

import 
    {
        EMP_INSERT_REQUEST,
        TEST_REQUEST
    } 
from '../../reducers/emp'; 
const { TextArea } = Input;



const postEdit = () =>{


    const dispatch = useDispatch(); 
    const {imageUploading,imageFileName} = useSelector((state)=>state.mainPosts_1001); 
    const {userInfo} = useSelector((state)=>state.auth); 
    const {postInserting}  = useSelector((state)=>state.emp); 
    const refTitle = useRef(); 
    const refContent = useRef(); 
    const imageInput = useRef();
    const videoInput = useRef(); 
    const router = useRouter()

    const blank_pattern = /^\s+|\s+&/g; 
    const [title,setTtile] = useState(''); 
    const [content,setContent] = useState('');
    const [imageCount,setImageCount]= useState([]); 
  
    


    //제목 입력
    const onChangeTtitle  = useCallback((e)=>{
        setTtile(e.target.value); 
    },[title])

    //게시글 입력
    const onChangeContent  = useCallback((e)=>{
        setContent(e.target.value); 
    },[content])

    //submit
    const contentSummit = ()=>{
     console.log('imageFileName=>>', imageFileName); 
        if(title.length === 0 || title.replace(blank_pattern,'')===""){
            refTitle.current.focus();  
            alert('제목을 입력 해 주세요'); 
            return; 
        }

        if(content.length === 0 || content.replace(blank_pattern,'')===""){
            refContent.current.focus();
            alert('게시글을 작성해 주세요'); 
            return; 
        }

        let contentImages=""; 
        if(imageFileName.length > 0 ){
            imageFileName.map((v)=>{
                contentImages =contentImages +  `<figure ><img src="http://localhost:3095/1001/${userInfo}/${v}"></figure>`
            }); 
        }
        console.log('postInserting=>', postInserting); 
        dispatch({
            type: EMP_INSERT_REQUEST,
            data: {content:encodeURI(content),
                   contentImages :encodeURI(contentImages),
                   title:encodeURI(title),
                   userNickName:encodeURI(userInfo), 
                   postFlag:'1001',
                   
           },

       }); 

       router.replace('/posts/mainPosts_1001'); 
    }


    //이미지 업로드 클릭 
    const onClickImageUpload = useCallback(() =>{
        
        if(imageFileName.length>=5){
            alert(`게시물당 이미지는 ${imageFileName.length}장 올릴 수 있습니다.`); 
            return; 
        }

        imageInput.current.click(); 
        
    },[imageInput.current,imageFileName]); 

    //비디오 업로드 클릭 
    const onClickVideoUpload = useCallback(() =>{
        videoInput.current.click(); 

    },[videoInput.current]); 

    //이미지 업로드 
    const onChangeImages = useCallback((e)=>{
    
        //파일을 2개 올렸을 시 e.target.files의 생김새
        //{0:File, 1:File, length:2} 유사 배열 형태

        //File의 생김새
        //name , size, type, lastModified, lastModifiedDate 속성을 가져올 수 있다.

        //typeof e.target.files  == object 
        //유사 배열이므로 [].forEach.call을 사용한다. 

        const imageFormData = new FormData(); 
        Array.prototype.forEach.call(e.target.files,(f,i)=>{

            //10485760 BYTE == 10MB
            if(Object.values(e.target.files)[i].size > 10485760){
                alert('10MB 이상 올릴 수 없습니다.');
                return; 
            }else{
                imageFormData.append('image',f); 
            }

        }); 
        const imageArray = imageFormData.getAll('image');
        setImageCount(imageCount.concat(imageArray));

        //한번에 5장 이상 올렸을 경우 
        if(imageArray.length > 5){
            alert('한번에 5장 이상 올릴 수 없습니다.'); 
            setImageCount([]);
            imageFormData.delete('image'); 
            return; 
        }else{

            dispatch({type:UPLOAD_IMAGES_REQUEST,
                data:{images:imageFormData,
                     postFlag:'1001',
                     user:encodeURIComponent(userInfo),
                    },
                }); 
    
        }


    },[imageCount]); 

    return (
        <div style={{marginTop:'3%'}}>
            {/*이미지 업로드 */}
            <input type="file" name="image" multiple hidden ref={imageInput} accept={'.jpg,.gif,.png,.bmp,.jpeg'} onChange={onChangeImages}/>
            {/*비디오 업로드 */}
            <input type="file" name="video" multiple hidden ref={videoInput} accept={'.mp4'} onChange={onClickVideoUpload}/>
            
        <Input placeholder='제목을 입력하세요' ref={refTitle} onChange={onChangeTtitle} style={{marginBottom:'2%'}}/>
        <TextArea placeholder='하고 싶은 이야기' ref={refContent} onChange={onChangeContent} rows={4} />
        <div style={{marginTop:'2%',textAlign:'center'}}>
            <Button onClick={onClickImageUpload} >    <PictureOutlined />    </Button>&nbsp;
            <Button onClick={onClickVideoUpload} >    <PlaySquareOutlined />    </Button>&nbsp;
            <Button type="primary" onClick={contentSummit} loading={imageUploading | postInserting}>  submit  </Button>
       </div> 
       <br/>

       <div style={{textAlign:'center'}}>
            {imageFileName && imageFileName.map((v,i)=>(
                <div style={{display:'inline-block'}} key={i} >
                    <img style={{width:'60px',height:'60px'}} src={`http://localhost:3095/1001/${userInfo}/${v}`} />    
                    <br/>
                    <Button style={{width:'60px'}}><CloseOutlined /></Button>
                </div>
            ))}
        </div>
  
      

        </div>
    )

}

export default postEdit; 