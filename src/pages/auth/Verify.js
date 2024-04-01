import React from 'react'
import {useDispatch} from "react-redux";
import { RESET, verifyUser } from '../../redux/features/auth/authSlice';
import { useParams } from 'react-router-dom';


const Verify = () => {
  const dispatch = useDispatch();
  const {verificationToken}= useParams()

  const verifyAccount = async ()=>{
    await dispatch(verifyUser(verificationToken))
    await dispatch(RESET())
  }

  return (
    <section>
        <div className='--center-all'>
            <h2>Account Verification</h2>
            <p>To verify your account, Click the button below..</p>
            <br/>
            <button onClick={verifyAccount} className='--btn --btn-primary'>Verify Account</button>
        </div>
    </section>
  )
}

export default Verify