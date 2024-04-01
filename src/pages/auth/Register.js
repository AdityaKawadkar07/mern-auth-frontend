import React, { useEffect, useState } from 'react'
import styles from "./auth.module.scss"
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/passwordInput/PasswordInput';
import { TiUserAddOutline } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { toast } from 'react-toastify';
import { validateEmail } from '../../redux/features/auth/authService';
import {useDispatch, userDispatch, useSelector} from "react-redux";
import { RESET, register, sendVerificationEmail } from '../../redux/features/auth/authSlice';
// import Loader from '../../components/loader/Loader';


const initialState={
    name:"",
    email:"",
    password:"",
    password2:""
}

const Register = () => {
    const[formData,setFormData]=useState(initialState)
    const {name,email,password,password2}=formData;

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isLoading, isLoggedIn, isSuccess, message} = useSelector((state)=> state.auth)

    const [uCase,setUCase]=useState(false)
    const [num,setNum]=useState(false)
    const [sChar,setSChar]=useState(false)
    const [passLength,setPassLength]=useState(false)
    const timesIcon=<FaTimes color="red" size={15}/>
    const checkIcon=<BsCheck2All color="green" size={15}/>

    const switchIcon=(condition)=>{
        if(condition){
            return checkIcon
        }
        return timesIcon
    }

    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setFormData({...formData,[name]:value})
    };


    useEffect(()=>{
        //check lower and Uppercase
        if(password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)
        ){
            setUCase(true)
        }
        else{
            setUCase(false)
        }

        //check for numbers
        if(password.match(/([0-9])/))
        {
            setNum(true)
        }
        else{
            setNum(false)
        }
        //check for special chracter
        if(password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)
        )
        {
            setSChar(true)
        }
        else{
            setSChar(false)
        }
        //check for PASSWORD LENGTH
        if(password.length > 5)
        {
            setPassLength(true)
        }
        else{
            setPassLength(false)
        }
    },[password])

    const registerUser=async (e)=>{
        e.preventDefault()

        if(!name || !email || !password){
            toast.error("All fields are required")
        }
        if(password.length < 6){
            toast.error("Password must be up to 6 characters")
        }
        if(!validateEmail(email)){
            toast.error("Please enter a valid email")
        }
        if(password !== password2){
            toast.error("Password do not match")
        }

        const userData={
            name,email,password
        }

        // console.log(userData);
        await dispatch(register(userData));
        await dispatch(sendVerificationEmail())

    };

    useEffect(()=>{
        if(isSuccess && isLoggedIn){
            navigate("/profile")
        }

        dispatch(RESET())
    },[isLoggedIn,isSuccess,dispatch,navigate])


  return (
    <div className={`container ${styles.auth}`}>
        {/* {isLoading && <Loader />} */}
        <Card>
            <div className={styles.form}>
            <div className='--flex-center'>
            <TiUserAddOutline size={35}/>
            </div>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
                <input type='text' placeholder='Name' required name='name' value={name} onChange={handleInputChange} />
                <input type='email' placeholder='Email' name='email' value={email} onChange={handleInputChange} />
                {/* <input type="password" placeholder='Password' name='password' value={password} onChange={handleInputChange} /> */}
                <PasswordInput placeholder='Password' name='password' value={password} onChange={handleInputChange}/>
                <PasswordInput placeholder='Confirm Password' name='password2' value={password2} onChange={handleInputChange} onPaste={(e)=>{
                    e.preventDefault()
                    toast.error("cannot paste into input field")
                    return false
                }}/>

                {/* Password Strength */}
                <Card cardClass={styles.group}>
                    <ul className='form-list'>
                        <li>
                        <span className={styles.indicator}>
                            {switchIcon(uCase)}
                            &nbsp; Lowercase & Uppercase
                        </span>
                        </li>
                        <li>
                        <span className={styles.indicator}>
                            {switchIcon(num)}
                            &nbsp; Special Character (!@#$%^&*)
                        </span>
                        </li>
                        <li>
                        <span className={styles.indicator}>
                            {switchIcon(sChar)}
                            &nbsp; Lowercase & Uppercase
                        </span>
                        </li>
                        <li>
                        <span className={styles.indicator}>
                            {switchIcon(passLength)}
                            &nbsp; At least 6 Character
                        </span>
                        </li>
                    </ul>
                </Card>

                <button type='submit' className='--btn --btn-primary --btn-block'>
                    Register
                </button>
            </form>
        
            <span className={styles.register}>
                 <Link to="/">Home</Link>
                 <p>&nbsp; Already have an account?</p>
                 <Link to="/login">Login</Link>
            </span>
            </div>
        </Card>
    </div>
  )
}

export default Register;