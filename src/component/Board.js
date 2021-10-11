import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import styled from 'styled-components'
import { useHistory } from 'react-router';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Input from './Input';

function Board() {
    const history = useHistory();
    const [boards, setBoards] = useState([]);
    const [show, setShow] = useState(false);
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [deleteStatus,setDeleteStatus] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleTitle = (e) => setTitle(e.target.value);
    const handleContent = (e) => setContent(e.target.value);

    const DIV = styled.div`
      width: 1000px;
      height: 75vh;
    `;

    const saveWriter = () => {
      let body = {
        user_id: "vkdnj4158@naver.com",
        title,
        content,
      }
      axios.post('/api/boardInput',body).then(res => {
        console.log(res,"dd")
        if(res.data.status==="성공") {
          setShow(false)
          setTitle("")
          setContent("")
        } else {
          alert("등록에실패 다시 확인해")
        }
      })
    }


    useEffect(() => {
        axios.get('/api/board/allInfo').then(res => {
            setBoards(res.data)
        })
    },[show,deleteStatus])

    const deleteApi = (e, boardId) => {
      e.stopPropagation()
      axios.get(`/api/boardDelete/${boardId}`).then(res => {
        console.log(res.data)
        if(res.data.status==="삭제성공") {
          setDeleteStatus(!deleteStatus)
        } else {
          alert("데이터 삭제하는데 실패했다")
        }
      })
    }
    
    return (
    <>
      <Button variant="primary" onClick={handleShow}>
          게시글 작성하기
      </Button>

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
          <Button onClick={saveWriter} variant="primary">작성 완료</Button>
        </Modal.Footer>
      </Modal>
      <DIV>
        <Table striped hover size="xs" >
          <thead>
            <tr>
              <th></th>
              <th>제목</th>
              <th>내용</th>
              <th>작성자</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {boards.map((board,index) => (
              <>
              <tr onClick={() => history.push(`/boardPage/${board.BOARD_ID}`)} key={board.BOARD_ID}>
                <td>{index+1}</td>
                <td>{board.TITLE}</td>
                <td>{board.CONTENT}</td>
                <td>{board.WRITER}</td>
                <td style={{background:"#b5c7ed" , color:"white"}} onClick={(e) => deleteApi(e, board.BOARD_ID)}>게시글 삭제하기</td>
              </tr>
              {/* <div style={{background:"blue"}} onClick={() => deleteApi(board.BOARD_ID)}>위 게시글 삭제하기</div> */}
              </>
            ))}
          </tbody>
        </Table>
      </DIV>
    </>
      )
  }

export default Board

