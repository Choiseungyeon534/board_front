import React, { useEffect, useState } from 'react'
import axios from 'axios';
function App() {
    const [data,setData] = useState({});
    useEffect(() => {
        axios.get('/api').then(res => {
            setData(res.data)
            console.log(res.data)
        })
    },[])
    
    return (
        <div>
            {data.message}
            {data.age}
            {data.status}
            {data.description}
            {data.location}
            {data.time}
        </div>
    )
}

export default App