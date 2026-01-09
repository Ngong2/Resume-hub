import { BriefcaseBusiness, Globe, Icon, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({ data, onChange, removebackground, setRemoveBackground }) => { 

    const handleChange = (field, value) => { 
        onChange({...data, [field]: value})
    }
    const field=[
        {key:"full_name",label:"Full Name",icon:User,type:"text",required:true },
        {key:"email",label:"Email Address",icon:Mail,type:"email",required:true },
        {key:"phone",label:"Phone Number",icon:Phone,type:"tel", },
        {key:"location",label:"Location",icon:MapPin,type:"text", },
        {key:"profession",label:"Profession",icon:BriefcaseBusiness,type:"text", },
        {key:"linkedin",label:"Linkedin Profile",icon:Linkedin,type:"url", },
        {key:"website",label:"Personal website",icon:Globe,type:"url", },
    ]

    const handleImageUpload = (e) => { 
        const file = e.target.files[0];
        if (file) {
            handleChange("image", file);
        }
    }

    const handleToggleBackground = () => {
        setRemoveBackground(!removebackground);
    }

  return (
    <div>
        <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
        <p className='text-sm text-gray-600'>Get started the personal information</p>
        <div className='flex items-center gap-2'>
            <label className="cursor-pointer">
                {data?.image ?(
                    <img 
                        src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} // Fixed URL.createObjectURL
                        alt="user-image" 
                        className='w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80' 
                    />
                ) : (
                 <div className='inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer'>
                    <User className='size-10 p-2.5 border rounded-full'/>
                    <span>Upload user image</span>
                 </div>
                )}
                <input 
                    type="file" 
                    accept='image/jpeg,image/png' 
                    className='hidden'
                    onChange={handleImageUpload} 
                />
            </label>
            {typeof data?.image === 'object' && (
                <div className='flex flex-col gap-1 pl-4 text-sm'> {/* Fixed text-sm */}
                   <p>Remove background</p> {/* Changed P to p */}
                   <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                    <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        onChange={handleToggleBackground} 
                        checked={removebackground}  
                    />
                    <div className='w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-200'> {/* Fixed transition-color to transition-colors */}
                        <span className='dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4'></span> {/* Fixed translate-x-4 */}
                    </div>
                   </label>
                </div>
            )}

        </div>
        
        {field.map((fieldItem)=>{
            const IconComponent = fieldItem.icon;
            return(
                <div key={fieldItem.key} className='space-y-1 mt-5'>
                    <label className='flex items-center gap-2 text-sm font-medium text-gray-600'>
                    <IconComponent className='size-4'/>
                    {fieldItem.label}
                    {fieldItem.required &&  <span className='text-red-500'>*</span> }
                  </label>
                  <input 
                    type={fieldItem.type} 
                    value={data[fieldItem.key]  || "" } 
                    onChange={(e)=>handleChange(fieldItem.key, e.target.value)} 
                    className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm' 
                    placeholder={`Enter your ${fieldItem.label.toLowerCase()}`} 
                    required={fieldItem.required}
                  />
                </div>
            )

        })}
    </div>
  )
}

export default PersonalInfoForm