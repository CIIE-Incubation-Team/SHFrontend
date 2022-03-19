import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login';
import ChangeState from './Pages/ChangeState';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login></Login>}>
        </Route>
        <Route path='/changeState' element={<ChangeState></ChangeState>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
