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

    // const getTime = () => {
    //     let today = new Date();
    //     let year = today.getFullYear();
    //     let month = today.getMonth() +1;
    //     let date = today.getDate();
    //     let hours = today.getHours(); 
    //     let minutes = today.getMinutes(); 
    //     let time = year+'.'+month+'.'+date+' '+hours+':'+minutes
    //     return time
    // }

    const commentSave = () => {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() +1;
        let date = today.getDate();
        let hours = today.getHours(); 
        let minutes = today.getMinutes(); 
        let time = year+'.'+month+'.'+date+' '+hours+':'+minutes
        let body = {
            writer : "hoonie",
            comment,
            // time:getTime(),
            time,
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
            {replyData.map((reply,index) => (
                <CommentDiv>
                    <div>{reply.writer}</div>
                    <div>{reply.comment}</div>
                    <div>{reply.time}</div>
                </CommentDiv>
            ))}
        </div>
    )
}

export default Comment
