import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import{login as authLogin } from '../store/authSlice'
import {Button, Input ,Logo} from './index'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'

import {useForm} from 'react-hook-form'

export default function Login() {
    const navigate= useNavigate()
    const dispatch = useDispatch()

    const {register,handleSubmit} = useForm()
    const [error, setError] = useState('')

    const login = async(data) =>{
            setError("")
          try {
                const session = await authservice.login(data)
                if(session){
                    const userData= await authservice.getCurrentUser()
                    if(userData){
                        dispatch(authLogin(userData))
                        navigate('/')
                    }
                }
          } catch (error) {
                setError(error.message)
          }
    }

    return (
       <div className='flex items-center justify-center w-full'>
            <div className={ ` mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className=' mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                            <Logo width='100%'/>
                    </span>
                </div>
            
            <h2 className='text-center text-2xl font-bold leading-tight'>
                    Sign in to your account
            </h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Don&apos;t have any account?&nbsp;
                 <Link className='font-medium text-primary transition-all duration-200 hover:underline'>
                    Sign Up
                 </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>
                {error}
                </p>
            }

 {  // ........note.....  handleSubmit is a event  and dont use same name it already a method  came from useform .. it automatecally take value and we dont need to update state
 // register always spread like ...register it is a syntax  and pass key value and key uique same as name , and then object pass jisme bahut sare option milte hai .,, regix - regular experation 
  }
            
            
            <form onSubmit={handleSubmit(login)} 
            className='mt-8'>  
                <div className='space-y-5'>
                    <Input
                        label = "Email : "
                        placeholder = "Enter your email"
                        type ="email"
                        {...register("email",{
                            required: true,
                            validate: {
                                matchPatern: (value) =>/^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/.test(value) || "Email address must be a valid address",

                            }
                        }) }

                    />

                    <Input
                    label="Password"
                    type="password"
                    placeholder ="Enter your password"
                    {...register("password",{
                        required:true,
                    })}
                    />

                    <Button
                        type="submit"
                        className='w-full'
                    >Sign in </Button>
                    
                </div>
            
            </form>
       </div>
    </div>
    )
}
