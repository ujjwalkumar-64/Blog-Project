import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'
import conf from '../conf/conf'

export default  function RTE({name,control,label,defaultValue =""} ) {
    
    // EVENT TRACKING ON FIeld here we on change 

    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>
                {label}
            </label>}
            <Controller
                name={name || 'control'}
                control={control}
                render={({field :{onChange}}) => (
                   //yaha jisko render karana hai on change event pe

                   <Editor
                    apiKey={conf.tinyMceKey}
                    initialValue={defaultValue}
                    init={{
                        initialValue:defaultValue,
                        height: 500,
                        menubar:true,
                        plugins:[
                            "image",
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                            "anchor",
                        ],
                        toolbar : 'undo redo | formatselect | bold italic underline | \ alignleft aligncenter alignright alignjusrtify | \ bulllist numlist outdent indent | removeformat | help ',
                        content_style:"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    }}
                    onEditorChange={onChange}
                   
                   />
                )}
            />

        </div>
    )
}
