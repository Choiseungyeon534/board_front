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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleTitle = (e) => setTitle(e.target.value);
    const handleContent = (e) => setContent(e.target.value);

    const DIV = styled.div`
    width: 1000px;
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
    },[show])
    console.log("테스트 커밋")

    
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
            </tr>
          </thead>
          <tbody>
            {boards.map((board) => (
              <tr onClick={() => history.push(`/boardPage/${board.BOARD_ID}`)} key={board.BOARD_ID}>
                <td>{board.BOARD_ID}</td>
                <td>{board.TITLE}</td>
                <td>{board.CONTENT}</td>
                <td>{board.WRITER}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </DIV>
    </>
      )
  }

export default Board

