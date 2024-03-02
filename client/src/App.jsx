/* eslint-disable no-unused-vars */
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
    <Header />
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/dashboard' element={<DashBoard />} />
     </Routes>
     <Footer />
    </BrowserRouter>
  )
}

export default App
