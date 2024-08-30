import React from 'react'
import {Container, Logo , LogoutBtn} from  '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'   //go to store to check user is login or not
import { useNavigate } from 'react-router-dom'
 


export default function Header( ) {
    const authStatus = useSelector((state)=> state.auth.status)
    const navigate = useNavigate()

    // array pe traverse , ussme object krke navigation me add
    // slug is jaha url jayega

    const navItems= [
        {
            name:'Home',
            slug:'/',
            active:true
        },
        {
            name:'Login',
            slug:'/login',
            active : !authStatus,
        },
        {
            name:'Signup',
            slug:'/signup',
            active: !authStatus,
        },
        {
            name:'All Posts',
            slug:'/all-posts',
            active: authStatus,
        },
        {
            name: 'Add Post',
            slug:'/add-post',
            active: authStatus,
        },
    ]

    return (
       <header className='py-3 shadow bg-gray-500'>
        <Container>
            <nav className='flex'>
                 <div className='mr-4'>
                   <Link to='/'>
                        <Logo width='70px'/>
                   </Link>
                 </div>

                <ul className='flex ml-auto'>
                    {navItems.map( (item) => 
                        item.active ? (
                            <li key={item.name }>  {/* jo html repeat hoga ussme key */}
                                <button
                                onClick={() => navigate(item.slug) }  // navigate me url jaha le jana hai
                                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'  
                                > {item.name} </button>
                            </li>
                        ): null
                    )}

                    {authStatus && (
                        <li>
                            <LogoutBtn/> 
                        </li>
                    )}  

                    {/* authStatus && ()  iska matlab hai ye run tabhi karega jo bhi bracket me hai jab authStatus true hoga   ...  js syntax */}

                </ul>
            </nav>
        </Container>
       </header>
    )
}
