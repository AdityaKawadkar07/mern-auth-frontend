import React, { useState } from 'react'
import styles from "./auth.module.scss"
import Card from '../../components/card/Card'
import { AiOutlineMail } from "react-icons/ai";
import { Link } from 'react-router-dom';
import PasswordInput from '../../components/passwordInput/PasswordInput';
import { toast } from 'react-toastify';
import { validateEmail } from '../../redux/features/auth/authService';
import { useDispatch } from 'react-redux';
import { RESET, forgotPassword } from '../../redux/features/auth/authSlice';

const Forgot = () => {
    const[email,setEmail]=useState("")

    const dispatch = useDispatch()


    const forgot=async (e)=>{
      e.preventDefault()

        if(!email){
            toast.error("Please Enter an email")
        }
        if(!validateEmail(email)){
            toast.error("Please enter a valid email")
        }

        const userData = {
          email
        }

        await dispatch(forgotPassword(userData));
        await dispatch(RESET(userData));

    };

  return (
    <div className={`container ${styles.auth}`}>
        <Card>
            <div className={styles.form}>
            <div className='--flex-center'>
            <AiOutlineMail size={35}/>
            </div>
            <h2>Forgot Password</h2>
            
            <form onSubmit={forgot}>
                <input type='email' placeholder='Email' name='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                <button type='submit' className='--btn --btn-primary --btn-block'>
                    Get Reset Email
                </button>
                <div className={styles.links}>
                 <p><Link to="/">-Home</Link></p>
                 <p><Link to="/login">- Login</Link></p>
            </div>
            </form>
            
            </div>
        </Card>
    </div>
  )
}

export default Forgot