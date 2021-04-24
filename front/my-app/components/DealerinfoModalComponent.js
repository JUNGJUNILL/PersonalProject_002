import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const DealerinfoModalComponent = ({visible,dealerinfo,func}) =>{

    //모달창 보이기, 안보이기 값
    const [getVisible,setVisible] = useState(visible); 

    //유통사 상세정보 
    const {
        dealerCode,
        infocode,
        infoName,
        address,
        item,
        status,
        infoPhone,
        handphone,
        storeCount,
        orderCount,
        materialQtyCount,
        moneyTohangul,
        money,
        region
    } = dealerinfo; 

    //원단위 콤마 정규표현식
    const pattern = /\d{1,3}(?=(\d{3})+(?!\d))/g; 


    const changeVisibleValue=()=>{
        func(true); 
        setVisible(false);
    }

    const getMaterialList = () =>{

        return alert('준비 중 입니다.'); 
    }
    

    return (
       <div>          
            <Modal
                title={infoName}
                centered
                visible={getVisible}
                onCancel={changeVisibleValue}
                onOk={changeVisibleValue}
                cancelText={'닫기'}
                okText={'확인'}
                width={'95%'}
                >

                <p style={{textAlign:'center'}}><font style={{fontFamily:'Hanna',fontSize:'4vh'}}>오늘(2021.4.5) 거래량</font></p>
                <p>&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>납품처</font></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2vh'}}>{storeCount} 곳</font></p>
                <hr style={{opacity:'0.4'}}/>

                
                <p>&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>오늘 납품된 품목</font> <Button type="primary"  style={{borderRadius:'8px'}} onClick={getMaterialList}><font style={{paddingRight:'0.7%',fontFamily:'jua'}}>상세정보</font></Button></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2vh'}}>{parseInt(orderCount,10)} 가지</font></p>
                <hr style={{opacity:'0.4'}}/>

                <p>&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>납품된 품목 총 수량</font></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2vh'}}>{materialQtyCount}</font></p>
                <hr style={{opacity:'0.4'}}/>

                <p>&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>매출액</font></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2vh'}}>{money.replace(pattern,'$&,')} 원</font></p>
                <hr style={{opacity:'0.4'}}/>

                <p>&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>대표자</font></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2vh'}}>정*일</font></p>
                <hr style={{opacity:'0.4'}}/>

                <p>&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>연락처</font></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2vh'}}>{infoPhone}{handphone? ' / ' + handphone: ''}</font></p>
                <hr style={{opacity:'0.4'}}/>

                <p>&nbsp;<font style={{fontFamily:'jua',fontSize:'3vh'}}>주소</font></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<font style={{fontFamily:'Hanna',fontSize:'2vh'}}>{address}</font></p>
     

                <div style={{width:'100%',height:'150px',border:"1px solid"}}>
                지도 정보 준비중입니다.
                </div>
           
            </Modal>
       </div>
    )


}

export default DealerinfoModalComponent; 