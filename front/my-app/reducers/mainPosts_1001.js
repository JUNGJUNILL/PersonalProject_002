import produce from '../util/produce';


export const  initialState = {

    isWriting          : false, 
    mainPosts_1001     : [], 
    mainPosts_1001Info : [{}], 
                        //하 이것때매 몇시간을 날려 먹었는지.. 아크릴 새우님이 해결법을 알려주심
    mainPosts_1001Comments : [],
    mainPosts_1001CommentByComments:[{}],  
    imagePaths         : [],
    likeIsClicked :null, 
    clickCommentId:null, 
    commentByCommentCount:0,             //대댓글 입력 후 대댓글 숫자 변경 
    commentByCommentInsertCommentId:null,//어떤 댓글에 대댓글을 달았는지 알기 위한 flag 값


}

//게시물 list
export const MAINPOSTS_1001_LIST_REQUEST='MAINPOSTS_1001_LIST_REQUEST';
export const MAINPOSTS_1001_LIST_SUCCESS='MAINPOSTS_1001_LIST_SUCCESS';
export const MAINPOSTS_1001_LIST_FAILURE='MAINPOSTS_1001_LIST_FAILURE';

//게시물 상세 
export const MAINPOSTS_1001_DETAIL_INFO_REQUEST ='MAINPOSTS_1001_DETAIL_INFO_REQUEST'; 
export const MAINPOSTS_1001_DETAIL_INFO_SUCCESS ='MAINPOSTS_1001_DETAIL_INFO_SUCCESS'; 
export const MAINPOSTS_1001_DETAIL_INFO_FAILURE ='MAINPOSTS_1001_DETAIL_INFO_FAILURE'; 

//게시물 댓글 list 
export const MAINPOSTS_1001_COMMENTS_REQUEST = 'MAINPOSTS_1001_COMMENTS_REQUEST';
export const MAINPOSTS_1001_COMMENTS_SUCCESS = 'MAINPOSTS_1001_COMMENTS_SUCCESS';
export const MAINPOSTS_1001_COMMENTS_FAILURE = 'MAINPOSTS_1001_COMMENTS_FAILURE'; 

//게시물 대댓글 list 
export const MAINPOSTS_1001_COMMENTBYCOMMENT_REQUEST ='MAINPOSTS_1001_COMMENTBYCOMMENT_REQUEST'; 
export const MAINPOSTS_1001_COMMENTBYCOMMENT_SUCCESS ='MAINPOSTS_1001_COMMENTBYCOMMENT_SUCCESS'; 
export const MAINPOSTS_1001_COMMENTBYCOMMENT_FAILURE ='MAINPOSTS_1001_COMMENTBYCOMMENT_FAILURE'; 

//게시물 댓글 insert 
export const MAINPOSTS_1001_COMMENTINSERT_REQUEST = 'MAINPOSTS_1001_COMMENTINSERT_REQUEST';
export const MAINPOSTS_1001_COMMENTINSERT_SUCCESS = 'MAINPOSTS_1001_COMMENTINSERT_SUCCESS';
export const MAINPOSTS_1001_COMMENTINSERT_FAILURE = 'MAINPOSTS_1001_COMMENTINSERT_FAILURE'; 

//게시물 대댓글 insert 
export const MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_REQUEST = 'MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_REQUEST';
export const MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_SUCCESS = 'MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_SUCCESS';
export const MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_FAILURE = 'MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_FAILURE'; 

//게시글 like / dislike
export const MAINPOSTS_1001_MAINPOSTLIKE_REQUEST = 'MAINPOSTS_1001_MAINPOSTLIKE_REQUEST';
export const MAINPOSTS_1001_MAINPOSTLIKE_SUCCESS = 'MAINPOSTS_1001_MAINPOSTLIKE_SUCCESS';
export const MAINPOSTS_1001_MAINPOSTLIKE_FAILURE = 'MAINPOSTS_1001_MAINPOSTLIKE_FAILURE'; 

//게시글 댓글 like / dislike 
export const MAINPOSTS_1001_COMMENTLIKE_REQUEST = 'MAINPOSTS_1001_COMMENTLIKE_REQUEST';
export const MAINPOSTS_1001_COMMENTLIKE_SUCCESS = 'MAINPOSTS_1001_COMMENTLIKE_SUCCESS';
export const MAINPOSTS_1001_COMMENTLIKE_FAILURE = 'MAINPOSTS_1001_COMMENTLIKE_FAILURE'; 

//게시글 대댓글 like / dislike 
export const MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_REQUEST = 'MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_REQUEST';
export const MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_SUCCESS = 'MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_SUCCESS';
export const MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_FAILURE = 'MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_FAILURE'; 

//이미지 업로드 
export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const TEST_REQUEST = 'TEST_REQUEST'; 
export const TEST_SUCCESS = 'TEST_SUCCESS'; 
export const TEST_FAILURE = 'TEST_FAILURE'; 



const reducer = (state = initialState, action) => produce(state, (draft) => {

        switch(action.type){

//게시글 리스트 가져오기       
//----------------------------------------
            case MAINPOSTS_1001_LIST_REQUEST: {
                break; 
            }

            case MAINPOSTS_1001_LIST_SUCCESS: {
                draft.mainPosts_1001.length=0; 
                //배열 초기화
                action.data.forEach((v)=>{
                    draft.mainPosts_1001.push(v); 
                }); 
                break; 
            }

            case MAINPOSTS_1001_LIST_FAILURE: {
                break; 
            }
//----------------------------------------


//게시글 댓글 INSERT   
//----------------------------------------
            case MAINPOSTS_1001_COMMENTINSERT_REQUEST: {
                draft.isWriting = true;
                break; 
            }

            case MAINPOSTS_1001_COMMENTINSERT_SUCCESS: {
                draft.isWriting = false; 
                draft.mainPosts_1001Comments.length=0; 
                action.data.forEach((v,i)=>{
                    draft.mainPosts_1001Comments.push(v); 
                }); 
                
                break; 
            }

            case MAINPOSTS_1001_COMMENTINSERT_FAILURE: {
                break; 
            }
//----------------------------------------

//게시글 대댓글 INSERT   
//----------------------------------------
            case MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_REQUEST: {
                break; 
            }

            case MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_SUCCESS: {
                draft.mainPosts_1001CommentByComments.length=0; 
                draft.commentByCommentCount = action.data.array.length;
                draft.commentByCommentInsertCommentId=action.data.param.commentId;
                action.data.array.forEach((v)=>{
                    draft.mainPosts_1001CommentByComments.push(v); 
                }); 

                break; 
            }

            case MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_FAILURE: {
                break; 
            }
//----------------------------------------



//게시글 상세 페이지 가져오기 
//----------------------------------------
            case MAINPOSTS_1001_DETAIL_INFO_REQUEST: {
                break; 
            }

            case MAINPOSTS_1001_DETAIL_INFO_SUCCESS: {

                draft.mainPosts_1001Info.length=0; 
                //배열 초기화
                action.data.forEach((v)=>{
                    draft.mainPosts_1001Info.push(v); 
                }); 
                break; 
            }

            case MAINPOSTS_1001_DETAIL_INFO_FAILURE: {
                break; 
            }
//----------------------------------------


//게시글 댓글 가져오기  
//----------------------------------------
            case MAINPOSTS_1001_COMMENTS_REQUEST: {
                break; 
            }

            case MAINPOSTS_1001_COMMENTS_SUCCESS: {              
                draft.mainPosts_1001Comments.length=0; 
                action.data.forEach((v)=>{
                    draft.mainPosts_1001Comments.push(v); 
                }); 
                break; 
            }

            case MAINPOSTS_1001_COMMENTS_FAILURE: {
                break; 
            }
//----------------------------------------



//게시글 대댓글 가져오기 clickCommentId
//----------------------------------------
            case MAINPOSTS_1001_COMMENTBYCOMMENT_REQUEST: {
                break; 
            }

            case MAINPOSTS_1001_COMMENTBYCOMMENT_SUCCESS: {              
                draft.mainPosts_1001CommentByComments.length=0; 
                draft.clickCommentId=action.data.param.commentId
                action.data.array.forEach((v)=>{
                    draft.mainPosts_1001CommentByComments.push(v); 
                }); 
                
                break; 
            }

            case MAINPOSTS_1001_COMMENTBYCOMMENT_FAILURE: {
                break; 
            }
//----------------------------------------


//게시글 like / dislike       
//----------------------------------------
            case MAINPOSTS_1001_MAINPOSTLIKE_REQUEST: {
                break; 
            }

            case MAINPOSTS_1001_MAINPOSTLIKE_SUCCESS: {
                draft.mainPosts_1001Info.length = 0; 
                action.data.array.forEach((v)=>{
                    draft.mainPosts_1001Info.push(v); 
                })
                break; 
            }

            case MAINPOSTS_1001_MAINPOSTLIKE_FAILURE: {
                break; 
            }
//----------------------------------------



//게시글 댓글 like / dislike       
//----------------------------------------
            case MAINPOSTS_1001_COMMENTLIKE_REQUEST: {
                break; 
            }

            case MAINPOSTS_1001_COMMENTLIKE_SUCCESS: {
                draft.mainPosts_1001Comments.length=0; 
                action.data.forEach((v)=>{
                    draft.mainPosts_1001Comments.push(v); 
                }); 
                break; 
            }

            case MAINPOSTS_1001_COMMENTLIKE_FAILURE: {
                break; 
            }
//----------------------------------------


//게시글 대댓글 like / dislike       
//----------------------------------------
            case MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_REQUEST: {
                break; 
            }

            case MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_SUCCESS: {
                draft.mainPosts_1001CommentByComments.length =0;
                action.data.forEach((v)=>{
                    draft.mainPosts_1001CommentByComments.push(v); 
                }); 
                break; 
            }

            case MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_FAILURE: {
                break; 
            }
//----------------------------------------

            default : break; 
        }
    });

 export default reducer;