import React, { useEffect } from "react"
import{BrowserRouter as Router,Routes,Route} from "react-router-dom"
import SideDrawer from './layout/SideDrawer'
import './App.css'
import { toast, ToastContainer} from 'react-toastify';
import Home from './pages/Home';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import SubmitCommission from "./pages/SubmitCommission";
import { useDispatch } from "react-redux";
import { fetchLeaderBoard, fetchUser } from "./store/slices/userSlice";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import { getAllAuctionItems } from "./store/slices/auctionSlice";
import Leaderboard from "./pages/Leaderboard";
import Auctions from "./pages/Auctions";
import AuctionItem from "./pages/AuctionItem";
import CreateAuction from "./pages/CreateAuction";
import ViewMyAuction from "./pages/ViewMyAuction";
import ViewAuctionDetails from "./pages/home-sub-components/ViewAuctionDetails";
import Dashboard from "./pages/dashboard/Dashboard";
import Contact from "./pages/Contact";
import UserProfile from "./pages/UserProfile";

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchUser());
    dispatch(getAllAuctionItems());
    dispatch(fetchLeaderBoard())
  },[]);

  return (
    <Router>
      <SideDrawer/>
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/submit-commission" element={<SubmitCommission/>} />
        <Route path="/how-it-works-info" element={<HowItWorks/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}></Route>
        <Route path="/auctions" element={<Auctions/>}/>
        <Route path="/auction/item/:id" element={<AuctionItem/>}></Route>
        <Route path="/create-auction" element={<CreateAuction/>}></Route>
        <Route path="/view-my-auctions" element={<ViewMyAuction/>}></Route>
        <Route path="/auction/details/:id" element ={<ViewAuctionDetails/>}/>
        <Route path="/dashboard" element ={<Dashboard/>}/>
        <Route path="/contact" element ={<Contact/>}/>
        <Route path="/me" element ={<UserProfile/>}/>
      </Routes>
      <ToastContainer position='top-right'/>
    </Router>
  )
}

export default App
