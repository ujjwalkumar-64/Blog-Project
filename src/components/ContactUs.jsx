import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import{Button,Input,Logo} from './index'
import { useForm } from 'react-hook-form'
import appwriteService from '../appwrite/config'

export default function ContactUs({post}) {

    const navigate= useNavigate()
    const userdata =   useSelector((state)=>state.auth.userData)
         useEffect(()=>{
            if(!userdata) { navigate('/login')}

         },[])
  
         const {register,handleSubmit,setValue} = useForm()

         useEffect(()=>{
            if(userdata){
                setValue('name',userdata.name)
                setValue('email',userdata.email)
            }
         },[userdata,setValue])

         const submit = async (data) => {
            console.log('Form data:', data);
            try {
                await appwriteService.submitContact({ ...data });
                navigate('/')
            } catch (error) {
                console.error('Error submitting contact form:', error);
            }
        };

    return (
        <>
            <form onSubmit={handleSubmit(submit)}>
               
               <div className='space-y-5'>
                <Input
                label="Full Name"
                placeholder="Enter your name"
                {...register('name',{
                    required:true
                })}
                />

                <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...register("email",{
                    required:true,
                    validate: {
                        matchPatern: (value) =>/^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/.test(value) || "Email address must be a valid address",
                         
                    }
                })}
                />
                 
                 <Input
                 label='Comment'
                 placeholder='Write your comment '
                 {
                    ...register('comment',{
                        required:true
                    })
                 }
                 />

                <Button 
                type='submit'
                className='w-full'
                >
                    Submit
                </Button>
               </div>
               
                
            </form>
            
        </>
    )
}
