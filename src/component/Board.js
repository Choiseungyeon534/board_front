import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth:1000 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">게시판_id</TableCell>
            <TableCell align="center">작성자</TableCell>
            <TableCell align="center">제목</TableCell>
            <TableCell align="center">내용</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {boards.map((row) => (
            <TableRow onClick={() => history.push(`/boardPage/${row.BOARD_ID}`)}
              key={row.BOARD_ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.BOARD_ID}</TableCell>
              <TableCell align="center">{row.WRITER}</TableCell>
              <TableCell align="center">{row.TITLE}</TableCell>
              <TableCell align="center">{row.CONTENT}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
    )
}

export default Board
