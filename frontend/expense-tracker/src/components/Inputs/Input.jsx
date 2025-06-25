import React, { use, useState } from "react"
import {FaRegEye , FaRegEyeSlash} from 'react-icons/fa6'
import { useNavigate } from "react-router-dom";
const Input = ({value , onChange, placeholder ,label,type }) =>{
    const [showPassword ,setShowPassword] = useState(false)

    const toggleShowpassword =()=>{
        setShowPassword(!showPassword);

    };

  return (
    <div>
         <label className="text-[13px] text-slate-800">{label}</label>
           <div className="input-box">
            <input 
            type={type == 'password' ? showPassword ? 'text' : 'password' :type}
            placeholder={placeholder}
            className="w-full   bg-transparent outline-none "
            value={value}
            onChange={(e) => onChange(e)}
            />

            {type="password" &&(
                <>
                {showPassword ?(
                <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={()=>toggleShowpassword()}
                 />
                 ):(
                         <FaRegEyeSlash
                         size={22}
                         className="text-slate-400 cursor-pointer"
                         onClick={()=>toggleShowpassword()}
                 />
                        )
                 }

                
                
                </>
            )

            }

           </div>
     
    </div>
  )
}

export default Input
