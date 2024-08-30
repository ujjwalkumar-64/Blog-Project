import React ,{useCallback, useEffect} from 'react'
import {Button,Input,RTE,Select} from '../index'
import { useNavigate } from 'react-router-dom'
import appwriteService from '../../appwrite/config'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'


export default function PostForm({post}) {
    const {register, handleSubmit, watch , setValue, control , getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id ||  '',
            content: post?.content || '',
            status: post?.status || "active",

        },

    })

    const navigate =  useNavigate()
    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) =>{
        console.log('Submit function called with data:', data);

        if(post){
            console.log('Updating existing post');
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) :null
            console.log('File uploaded:', file);

            if(file) {
                console.log('Deleting old file:', post.featuredImage);
               await appwriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file? file.$id : undefined ,
            })
            console.log('Post updated:', dbPost);

            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else{
                console.log('Creating new post');
                // user create new file
                const file= await  appwriteService.uploadFile(data.image[0]);
                console.log('File uploaded:', file);

                // todo check like upper if file is there or not , is it possible?

                if(file){
                    const fileId =file.$id
                    data.featuredImage = fileId

                    const dbPost=  await appwriteService.createPost({
                        ...data,
                        userId : userData.$id,  // userdata store se aayega

                    }) 
                    console.log('Post created:', dbPost);

                    if(dbPost){
                        console.log('Navigating to post:', dbPost.$id);
                        navigate(`/post/${dbPost.$id}`)
                    }
                    else{console.log('No post returned from server');}
                }
            }
        }
    

    // new fact slug transform ---  do input field hai  ek title ek slug ,, title watch krna hai aur slug me value generate krna hai .. agar user kahi space diya to uss space ko dace se replace kr ((wo rejux se krena hai)) 


    // watch -- use effect me jayega kyunki dependency change ho rha

    const slugTransform = useCallback( (value)=> {
        if(value && typeof value==="string"){
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-z\d\s]+/g, '-')  // inke alawa sabko das me convert 
            .replace(/\s/g, '-')  // space ko das se replace 

             
        }
        return ''  // else case
    },[])

    // use of slugtransform

    useEffect( () => {
        const subscription = watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title,
                    {shouldValidate:true}
                ))
            }
        })

        return ()=>{
            subscription.unsubscribe()  // for memory management and optimasation
        }

    },[watch, slugTransform,setValue])

    return (
         <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 scroll-px-24'> 
                <Input
                 label= 'Title:'
                 placeholder='Title'
                 className='mb-4'
                 {...register("title",{
                    required:true
                 })}

                />

                <Input
                label="Slug"
                placeholder="Slug"
                className="mb-4"
                {...register("slug",{
                    required:true
                })}
                onInput = {(e)=>{
                    setValue("slug",slugTransform(e.currentTarget.value),{
                        shouldValidate:true
                    });
                }}
                /> 

                <RTE
                    label='Content :'
                    name='content'
                    control={control}
                    defaultValue={getValues('content')}
                />

             </div>

             <div className='w-1/3 px-2'>
                <Input
                    label='Featured Image:'
                     type='file'
                    className='mb-4'
                    accept='image/jpg, image/png ,image/jpeg ,image/gif'
                    {...register('image',{
                        required:!post
                    })}
                />

            {post && (
                <div className='w-full mb-4'>
                    <img
                     src={appwriteService.getpreviewFile(post.featuredImage)} 
                     alt={post.title}
                     className='rounded-lg'
                      />
                </div>
            )}

            <Select
                options= {["active","inactive"]}
                label="Status"
                className="mb-4"
                {...register("status",{
                    required:true,
                     
                })}
            
            />

            <Button
                type="submit"
                bgColor={post?"bg-green-500":undefined}
                className='w-full'
            >
                {post ?"Update": "Submit"}
            </Button> 

             </div>
         </form>
    )
}
