import { Check, Layout } from 'lucide-react'
import React, { useState } from 'react'

const TemplateSelector = ({selectedTemplate,onChange}) => {
    const [isOpen, setIsOpen]=useState(false)
    const templates=[
        {
            id:"classic",
            name:"Classic",
            preview:"A clean, traditional resume format with clear section professional typography"
        
        },
         {
            id:"modern",
            name:"Modern",
            preview:"Sleek design with strategic use of color and modern font choices"
        
        }, {
            id:"minimal-image",
            name:"Minimal Image",
            preview:"Minimal design with single image and clean typography"
        
        },
         {
            id:"minimal",
            name:"Minimal",
            preview:"Ultra-clean design that puts your content front and center"
        
        },
    ]
    
  return (

    <div className='relative'>
        <button onClick={()=>setIsOpen(!isOpen)} className='flex items-center gap-1 text-sm text-indigo-600 bg-gradient-to-br from-indigo-50 to-indigo-100 ring-1 ring-indigo-300 hover:ring-2 transition-all px-3 py-2 rounded-lg'>
            <Layout size={14}/><span className='max-sm:hidden'>Template</span>
        </button>
        {isOpen &&(
          <div className='absolute top-full w-80 p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-lg'>
           {templates.map((template)=>(
            <div key={template.id} onClick={()=>{ onChange(template.id);setIsOpen(false)}} className={`relative p-3 border rounded-md cursor-pointer transition-all ${selectedTemplate === template.id ?
                "border-indigo-400 bg-indigo-50"
                :"border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`} >
               {selectedTemplate === template.id &&(
                <div className='absolute top-2 right-2'>
                <div className='size-5 bg-indigo-400 rounded flex items-center justify-center'>
                    <Check className='w-3 h-3 text-white'/>
                </div>
                </div>
               )}
                <div className='space-y-1 pr-6'>
                   <h4 className='font-medium text-gray-800'>{template.name}</h4>
                   <div className='mt-2 p-2 bg-indigo-50 rounded text-xs text-gray-600'>{template.preview}</div>
                </div>
            </div>
           ))}
          </div>
        )}
    </div>
  )
}

export default TemplateSelector