import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Login from './Login';
import Dashboard from './Dashboard';
import AddData from './AddData';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => 
{
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/dashboard" exact element={<Dashboard/>}/>
        <Route path='/add_data' exact element={<AddData/>}/>
      </Routes>
    </Router>
  );
}

export default App;
