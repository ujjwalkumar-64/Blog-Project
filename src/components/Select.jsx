import React,{useId} from 'react'
 
function Select({ 
    options,
    label,
    className ="",
    ...props

},ref) {
    
    const id = useId()
    return (
       <div className='w-full'>
            {label && <label className=''
            htmlFor={id}>

            </label>
            }
            <select  
             {...props}
             id={id}
             ref={ref}
             className={`${className} px-3 py-2 bg-white text-black outline-none focus:bg-gray-50 duration-200 border-gray-200 w-full`}
             >
                {options?.map((option)=>  (
                    <option key={option} value={ option}>{option}
                    </option>
                )     // this syntax to check if not null to avoid crash
                )}
             </select>


       </div>
    )
}


export default React.forwardRef(Select)