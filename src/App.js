import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignIn from './pages/SignIn';

function App() {

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
