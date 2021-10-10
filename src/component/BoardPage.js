import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components'

function BoardPage() {
    let params = useParams()
    const [boardData, setBoardData] = useState([])
    const [boardId, setBoardId] = useState(Number(params.boardId))
    const history = useHistory();
    const [boardTime, setBoardTime] = useState('')

    let timeString_KR = boardTime.toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
    const writeDate = timeString_KR.split('오')[0]
    const writeTime = String(String(boardTime).split(' ')[4]).substring(0,5)


    
    useEffect(() => {
        axios.get(`/api/boardDetail/${boardId}`).then(res => {
            setBoardData(res.data)
            setBoardTime(new Date(res.data[0].TIME))
        })
    }, [])
    
    const backClick = () => {
        history.go(-1)
    }

    const Board = styled.div`
        width: 888px;
        height: 666px;
        border-radius: 10px;
        border: 1px solid #EBECEF;
        margin: 20px;
    `;
    const INFO = styled.div`
        height: 130px;
        border-bottom: 1px solid #EBECEF ;
        margin: 20px;
    `;
    const BACK = styled.div`
        height: 40px;
        color: #59DA50;
        display: flex;
        align-items: flex-end;
        margin-bottom: 15px;
        font-size: 14px;
        cursor: pointer;
    `;
    const TITLE = styled.div`
        height: 40px;
        font-size: 35px;
        display: flex;
        align-items: flex-end;
    `;
    const HEADER = styled.div`
        display: grid;
        grid-template-columns: 6fr 1fr;
        margin-left: 8px;
    `;
    const TIME = styled.div`
        font-size: 12px;
        color: #BDBDBD;
    `;
    const CONTENT = styled.div`
        margin: 20px;
    `;
    return (
       
            <Board>
                {boardData[0] && 
                    <div>
                        <INFO>
                            <BACK onClick={backClick}>게시판 | 목록 &gt; </BACK>
                            <TITLE>{boardData[0].TITLE}</TITLE>
                            <HEADER>
                                <div>{boardData[0].WRITER}</div>
                                <TIME>{writeDate} <span/>
                                {writeTime}</TIME>
                            </HEADER>
                        </INFO>
                        <CONTENT>{boardData[0].CONTENT}</CONTENT>
                    </div>
                }
            </Board>
     
    )
   
}

export default BoardPage
