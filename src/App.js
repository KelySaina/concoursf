import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import RouteAcceuil from './pages/RouteAcceuil';
import Client from './pages/Client';
import Assistant from './pages/Assistant';

function App() {

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<RouteAcceuil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/client" element={<Client />} />
          <Route path="/assistant" element={<Assistant />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
