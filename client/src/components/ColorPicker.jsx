import { Check, Palette } from 'lucide-react'
import React, { useState } from 'react'

const ColorPicker = ({ sectionColors, onChange }) => {
   const colors=[
       {nam: "red", value: "#EF4444"},
       {nam: "orange", value: "#F97316"},
       {nam: "amber", value: "#F59E0B"},
       {nam: "yellow", value: "#EAB308"},
       {nam: "lime", value: "#84CC16"},
       {nam: "green", value: "#22C55E"},
       {nam: "emerald", value: "#10B981"},
       {nam: "teal", value: "#14B8A6"},
       {nam: "cyan", value: "#06B6D4"},
       {nam: "sky", value: "#0EA5E9"},
       {nam: "blue", value: "#3B82F6"},
       {nam: "indigo", value: "#6366F1"},
       {nam: "violet", value: "#8B5CF6"},
       {nam: "purple", value: "#A855F7"},
       {nam: "fuchsia", value: "#D946EF"},
       {nam: "pink", value: "#EC4899"},
       {nam: "rose", value: "#F43F5E"},
       
   ]
   const[isOpen,setIsOpen]=useState(false)

  return (
    <div className='relative'>
        <button onClick={()=>setIsOpen(!isOpen)}  className='flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg'>
            <Palette size={16}/><span className='max-sm:hidden'>Accent</span>
        </button>
        {isOpen &&(
            <div className='grid grid-cols-6 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm'>
                {colors.map((color)=>(
                    <div key={color.value} className='relative cursor-pointer group flex flex-col items-center' onClick={()=>{onChange(color.value); setIsOpen(false)}}>
                        <div className="relative w-8 h-8 rounded-full border border-gray-300 group-hover:border-gray-500 transition-colors" style={{backgroundColor:color.value}}>
                            {sectionColors === color.value &&(
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <Check className='w-4 h-4 text-white'/>
                                </div>
                            )}
                        </div>
                        <p className='text-[10px] text-center mt-1 text-gray-600 capitalize'>{color.nam}</p>
                    </div>
                ))}

            </div>
        )}

    </div>
  )
}

export default ColorPicker