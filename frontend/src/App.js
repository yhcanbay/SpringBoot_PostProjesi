
import './App.css';

import { BrowserRouter , Switch , Route,} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Switch>
          <Route path="/" exact Component={Home}>Home</Route>
          <Route path="/users/:userId" Component={User}>User</Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
