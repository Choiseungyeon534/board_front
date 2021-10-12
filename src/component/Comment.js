import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'



const CommentDiv = styled.div`
    width: 888px;
    margin: 20px;
    background-color: beige;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;

`;

function Comment({boardId}) {
    const [replyData, setReplyData] = useState([]);
    const [comment, setComment] = useState("");
    const [commentStatus, setCommentStatus] = useState(false);
    const [replyTime,setReplyTime] = useState("");

    const commentHandle = (e) => setComment(e.target.value);

    useEffect(() => {
        axios.get(`/api/reply/${boardId}`).then(res => {
            setReplyData(res.data)
        })
    }, [])


    useEffect(() => {
        axios.get(`/api/reply/${boardId}`).then(res => {
            setReplyData(res.data)
        })
    },[commentStatus])

    const commentSave = () => {
        let body = {
            writer : "hoonie",
            comment,
            boardId
        }
        
        axios.post('/api/replyWrite', body).then(res => {
            if(res.data.status==="성공") {
                setCommentStatus(!commentStatus)
                setComment("")
            } else {
                alert("등록에실패 다시 확인해")
            }
        })

    }

    return (
        <div>
            <input type="text" onChange={commentHandle} placeholder="댓글 쓰기" value={comment}/>
            <button onClick={commentSave}> 작성완료 </button>
            {replyData.map((reply,index) => {
                let replyTime = new Date(reply.time);
                let timeString_KR = replyTime.toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
                const writeDate = timeString_KR.split('오')[0]
                const writeTime = String(String(replyTime).split(' ')[4]).substring(0,5)

                return(
                    <CommentDiv key={index}>
                        <div>{reply.writer}</div>
                        <div>{reply.comment}</div>
                        <div>{writeDate}&nbsp;
                            {writeTime}
                        </div>
                    </CommentDiv>
                )
            })}
        </div>
    )
}

export default Comment
