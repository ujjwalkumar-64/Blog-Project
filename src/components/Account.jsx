import React,{useEffect,useState} from 'react'
 import {Container} from '../components'
import appwriteService from '../appwrite/auth'
import { useSelector } from 'react-redux'

export default function Account() {

    // const [name, setName] = useState()
    // const [email,setEmail] = useState()
    
    //   appwriteService.getCurrentUser().then((data)=>{
    //      setName(data.name)
    //      setEmail(data.email)

// })

    const userData = useSelector((state)=>state.auth.userData)

    if(userData){
        return (
            <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap flex-col items-center  '>
                    <h1 className='font-semibold'>Hello {userData.name}</h1>
                    <h2 className='font-semibold'>Email : {userData.email}</h2>
                </div>
            </Container>
        </div>

        )
    }
   
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container  >
                    <div className='flex felx-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                Login to see data
                            </h1>
                        </div>
                    </div>
                 </Container>
            </div>
        )
    }

