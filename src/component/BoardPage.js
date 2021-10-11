import Button from '@restart/ui/esm/Button'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal'
import Input from './Input';

const Board = styled.div`
    width: 888px;
    height: 666px;
    border-radius: 10px;
    border: 1px solid #EBECEF;
    margin: 20px;
    position: relative;
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
const BOTTOM = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
`;

function BoardPage() {
    let params = useParams()
    const history = useHistory();
    
    const [boardData, setBoardData] = useState([])
    const [boardId, setBoardId] = useState(Number(params.boardId))
    const [boardTime, setBoardTime] = useState('')
    const [editStatus,setEditStatus] = useState(false);
    const [show, setShow] = useState(false);
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleTitle = (e) => setTitle(e.target.value);
    const handleContent = (e) => setContent(e.target.value);


    let timeString_KR = boardTime.toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
    const writeDate = timeString_KR.split('오')[0]
    const writeTime = String(String(boardTime).split(' ')[4]).substring(0,5)
    
    useEffect(() => {
        axios.get(`/api/boardDetail/${boardId}`).then(res => {
            setBoardData(res.data)
            setBoardTime(new Date(res.data[0].TIME))
        })
    }, [editStatus])
    
    const backClick = () => {
        history.go(-1)
    }

    const deleteApi = (boardId) => {
        axios.get(`/api/boardDelete/${boardId}`).then(res => {
            if(res.data.status==="삭제성공") {
                backClick()
            } else {
                alert("게시글 삭제하는데 실패했다")
            }
        })
    }

    const editApi = (boardId) => {
        let body = {
          user_id: "vkdnj4158@naver.com",
          title,
          content,
        }
        axios.post(`/api/boardEdit/${boardId}`,body).then(res => {
            if(res.data.status==="수정성공") {
                setShow(false)
                setTitle("")
                setContent("")
                setEditStatus(!editStatus)
            } else {
                alert("게시글 수정하는데 실패했다")
            }
        })
    }

    

    return (
        <>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>게시글 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input type="text" onChange={handleTitle} placeholder="title" value={title}/>
          <Input type="text" onChange={handleContent} placeholder="content" value={content}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button onClick={() => editApi(params.boardId)} variant="primary">작성 완료</Button>
        </Modal.Footer>
      </Modal>
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
            <BOTTOM>
                <Button onClick={handleShow}>수정</Button>
                <Button onClick={() => deleteApi(params.boardId)}>삭제</Button>
            </BOTTOM>
        </Board>
        </>
    )
   
}

export default BoardPage
