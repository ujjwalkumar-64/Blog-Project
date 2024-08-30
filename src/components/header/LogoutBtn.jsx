import React from 'react'
import {logOut} from'../../store/authSlice'
import autheService from '../../appwrite/auth'

import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
 
export default function LogoutBtn() {
     
     const navigate= useNavigate();
    const dispatch= useDispatch();

    const logoutHandler =  () => {

         
            autheService.logOut().then(()=>{
            dispatch(logOut()) 
              // stor eke andar info update rahe
            
              navigate('/login')
               
               
        })
            
        
        
        
    }


    return (
        <button 
         className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
         onClick={logoutHandler}
         >
                Logout
        </button>
    )
}
