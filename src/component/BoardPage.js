import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router'
import Table from 'react-bootstrap/Table'


function BoardPage() {
    let params = useParams()
    const [boardData, setBoardData] = useState([])
    const [boardId, setBoardId] = useState(Number(params.boardId))
    useEffect(() => {
        axios.get(`/api/boardDetail/${boardId}`).then(res => {
            setBoardData(res.data)
        })
    }, [])
    console.log(boardData)
    const Main = styled.div`
        background-color: white;
        display: grid;
        grid-template-columns: 1fr 5fr 1fr;
        grid-template-rows: 1fr 3fr 1fr;
    `;
    
    return (
        // <Main>
        //     {boardData[0] && 
        //         <div>
        //             <div>{boardData[0].BOARD_ID} : boardID </div> 
        //             <div>{boardData[0].TITLE} : boardID </div> 
        //             <div>{boardData[0].CONTENT} : boardID </div> 
        //             <div>{boardData[0].WRITER} : boardID </div> 
        //         </div>
        //     }
        // </Main>
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>제 목 </th>
            <th>내 용</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
              {boardData[0] &&
                <tr>
                    <td>{boardData[0].BOARD_ID}</td>
                    <td>{boardData[0].TITLE}</td>
                    <td>{boardData[0].CONTENT}</td>
                    <td>{boardData[0].WRITER}</td>
                </tr>
              }
        </tbody>
      </Table>
    )
}

export default BoardPage
