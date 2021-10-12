import React, { useEffect, useState } from 'react';
import { BrowserRouter,Switch,Route,Redirect } from 'react-router-dom';
import Board from './component/Board';
import BoardPage from './component/BoardPage';
import Login from './component/Login';
import SignUp from './component/SignUp';

function App() {
  const[isLoggedIn,setIsLoggedIn] = useState(false);
  useEffect(() => {
    let item = localStorage.getItem("id");
    if(item == null) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
    }
  }, [])

  window.addEventListener('storage',() => setIsLoggedIn(!isLoggedIn))

  console.log(isLoggedIn)
  return (
    <BrowserRouter>
    <Switch>        
            <Route exact path="/" component={Login}/>
            <Route path="/board" component={Board}/>
            <Route path="/boardPage/:boardId" component={BoardPage}/>
            <Route path="/signup" component={SignUp}/>
    {isLoggedIn ? <Redirect to="/board" /> : <Redirect to="/" />}
    </Switch>
      </BrowserRouter>
      
  );
}

export default App;
