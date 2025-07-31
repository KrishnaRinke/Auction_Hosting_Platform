import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
import { register } from '../store/slices/userSlice';


const SignUp = () => {
    const[userName,setUserName] = useState("");
    const[email,setEmail] = useState("");
    const[phone,setPhone] = useState("");
    const[address,setAddress] = useState("");
    const[role,setRole] = useState("");
    const[password,setPassword] = useState("");
    const[bankAccountNumber,setBankAccountNumber] = useState("");
    const[bankAccountName,setBankAccountName] = useState("");
    const[bankName,setBankName] = useState("");
    const[razorpayAccountNumber,setRazorPayAccountNumber] = useState("");
    const[googlepayupiid,setGooglePayUPIId] = useState("");
    const[profileImage,setProfileImage] = useState("");
    const[profileImagePreview,setProfileImagePreview] = useState("");

    const {loading,isAuthenticated} = useSelector(state => state.user)
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    
    const handleRegister = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userName",userName);   
        formData.append("email",email);
        formData.append("phone",phone);
        formData.append("password",password);
        formData.append("address",address);
        formData.append("role",role);
        formData.append("profileImage",profileImage);
        role === "Auctioneer" && (formData.append("bankAccountName",bankAccountName),
        formData.append("bankAccountNumber",bankAccountNumber),
        formData.append("bankName",bankName),
        formData.append("razorpayAccountNumber",razorpayAccountNumber),
        formData.append("googlepayupiid",googlepayupiid));
       
        dispatch(register(formData));
    };

    useEffect(()=>{
        if(isAuthenticated){
            navigateTo("/");
        }
    },[dispatch,loading,isAuthenticated]);

    const imageHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setProfileImage(file);
            setProfileImagePreview(reader.result);
        }
    }


  return (
    <>
     <section className='w-full ml-0 m-0 h-fit px-5 pt-10 lg:pl-[320px] flex flex-col min-h-screen py-2 justify-center'>
        
        <div className='bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md'>

       <h1 className='text-[#d6482b] text-2xl font-bold mb-1 min-[380px]:text-3xl md:text-4xl xl:text-5xl 2xl:text-8xl'> Register</h1>
         
        <form className='flex flex-col gap-1.5 w-full mt-1 ' onSubmit={handleRegister}>
            <p className='font-semibold text-1 md:text-xl'>Personal Details</p>
            <div className='flex flex-col gap-4 sm:flex-row'>
                  <div className='flex flex-col sm:flex-1'>
                    <label className='text-[16px] text-stone-600'>Full Name</label>
                    <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none'/>
                  </div>

                  <div className='flex flex-col sm:flex-1'>
                    <label className='text-[16px] text-stone-600'>Email</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none'/>
                  </div>
            </div>

            <div className='flex flex-col gap-4 sm:flex-row'>
            <div className='flex flex-col sm:flex-1'>
                    <label className='text-[16px] text-stone-600 '>Phone No</label>
                    <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none'/>
                  </div>

                  <div className='flex flex-col sm:flex-1'>
                    <label className='text-[16px] text-stone-600'>Address</label>
                    <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none'/>
                  </div>
            </div>

            <div className='flex flex-col gap-4 sm:flex-row'>
                   <div className='flex flex-col sm:flex-1'>
                    <label className='text-[16px] text-stone-600'>Role</label>
                    <select value={role} onChange={(e)=>setRole(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none '>
                        <option value="">Select Role</option>
                        <option value="Auctioneer">Auctioneer</option>
                        <option value="Bidder">Bidder</option>
                    </select>
                  </div>

                  <div className='flex flex-col sm:flex-1'>
                    <label className='text-[16px] text-stone-600'>Password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none'/>
                  </div>
            </div>
            <div className='flex flex-col sm:flex-1 gap-2'>
            <label className='text-[16px] text-stone-600'>Profile Image</label>
            <div className='flex items-center gap-3'>
                <img src={profileImagePreview ? profileImagePreview: "/imageHolder.jpg"} alt="profileImagePreview" className='w-14 h-14 rounded-full' />

                <input type="file" onChange={imageHandler} />

            </div>
            </div>
            <div className='flex flex-col gap-2 '>
            <label className='font-semibold text-xl md-2xl flex flex-col'>Payment Method Details <span className='text-[12px] text-stone-500'>
                Fill the payment details only if you are registering as an Auctioneer </span></label>

                <div className='flex flex-col gap-2'>
                    <label className='text-[16px] text-stone-500'>Bank Details</label>
                    <div className='flex flex-col gap-1 sm:flex-row sm:gap-4'>
                      <select value={bankName} onChange={(e) => {
                        setBankName(e.target.value) 
                      }} className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1"isabled={role === "Bidder"} >
                        <option value="">Select Your Bank</option>
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="HSBC Bank">HSBC Bank</option>
                        <option value="Yes Bank">Yes Bank</option>
                        <option value="PNB Bank">PNB Bank</option>
                        <option value="Kotak M Bank">Kotak M Bank</option>
                        <option value="Canara Bank">Canara Bank</option>
                        <option value="Bank Of India">Bank Of India</option>
                        <option value="Union Bank">Union Bank</option>
                      </select>
                        <input type="text" value={bankAccountNumber} placeholder='IFSC Code' onChange={(e)=>setBankAccountNumber(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1' />
                        <input type="text" value={bankAccountName} placeholder='Bank Account Username' onChange={(e)=>setBankAccountName(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1' />
                    </div>
                </div>
                <div>
                  <label className='text-[16px] text-stone-600 font-semibold'>RazorPay or GooglePay Details</label>
                  <div className='flex flex-col gap-2 sm:flex-row sm:gap-4'>
                    <input type="number" value={razorpayAccountNumber} placeholder='Razorpay Account Number' onChange={(e)=>setRazorPayAccountNumber(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1 ' disabled={role === "Bidder"} />


                    <input type="email" value={googlepayupiid} placeholder='googlepay upi ' onChange={(e)=>setGooglePayUPIId(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1' disabled={role === "Bidder"} />

                  </div>
                </div>
            </div>

         <button className='bg-[#d6482b] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-2 px-1 rounded-md text-white w-[100px] mx-auto lg:w-[300px] my-4' type='submit' disabled={loading}>{loading && "Registering...."}{!loading && "Register"}</button>

        </form>

        </div>
        
        </section> 
    </>
  )
}

export default SignUp
