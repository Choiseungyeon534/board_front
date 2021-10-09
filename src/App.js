import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import Board from './component/Board';
import BoardPage from './component/BoardPage';
import Login from './component/Login';
import SignUp from './component/SignUp';

function App() {

  
  return (
    <BrowserRouter>        
          <Switch>              
            <Route exact path="/" component={Login}/>    
            <Route path="/signup" component={SignUp}/>
            <Route path="/board" component={Board}/>
            <Route path="/boardPage/:boardId" component={BoardPage}/>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
