import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Listings from '../Listings/Listings';
import About from '../About/About';
import Registration from '../Registration/Registration';
import Profile from '../Profile/Profile';
import CreateListing from '../CreateListing/CreateListing';

function App(){
  return(
    <BrowserRouter>
    <Routes>
    <Route path="/" exact element={<Home />}/>
    <Route path="/Login" exact element={<Login />}/>
    <Route path="/Listings" exact element={<Listings />}/>
    <Route path="/About" exact element={<About />}/>
    <Route path="/Registration" exact element={<Registration />}/>
    <Route path="/Profile" exact element={<Profile />}/>
    <Route path="/CreateListing" exact element={<CreateListing />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App
