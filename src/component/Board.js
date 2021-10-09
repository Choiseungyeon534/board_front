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

function Board() {
    const history = useHistory();
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        axios.get('/api/board/allInfo').then(res => {
            setBoards(res.data)
        })
    },[])

    return (
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
    )
}

export default Board
