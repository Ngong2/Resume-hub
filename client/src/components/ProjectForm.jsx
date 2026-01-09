import { Plus, Trash2 } from 'lucide-react';
import React from 'react'

const ProjectForm = ({data, onChange}) => {
      const addProject =()=>{
        const newProject ={
            name:"",
            type:"",
            description:"",
        };
        onChange([...(data || []), newProject])
    }
    const removeProject =(index)=>{
    const updated = (data || []).filter((_, i) => i !== index);
    onChange(updated)
    }
      const updateProject=(index,field,value)=>{
    const updated = [...(data || [])];
       updated[index] = { ...(updated[index] || {}), [field]: value }
    
    try { console.debug('updateProject', index, field, value, updated[index]) } catch (e) {}
     onChange(updated)
    }

  return (
    
     <div>
          <div>
            <div className='flex items-center justify-between'>
              <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
                Project
              </h3>
              <p className='text-sm text-gray-500'>Add your project</p>
    
              <button
                onClick={addProject}
                className='flex items-center gap-2 px-2 py-1 text-sm bg-indigo-200 text-indigo-700 rounded hover:bg-blue-300 transition-colors'
              >
                <Plus size={16} />
                Add Project
              </button>
            </div>
          </div>
            <div className='space-y-4 mt-6'>
              {(data || []).map((project, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className='flex justify-between items-start'>
                    <h4>Project #{index + 1}</h4>
                    <button
                      onClick={() => removeProject(index)}
                      className='text-red-500 hover:text-red-700 transition-colors'
                    >
                      <Trash2 className='size-4' />
                    </button>
                  </div>
    
                  <div className='grid gap-3'>
                    <input
                      name={`project-name-${index}`}
                      autoComplete="off"
                      value={project.name || ""}
                      onChange={(e) => updateProject(index, "name", e.target.value)}
                      type="text"
                      placeholder='Project Name'
                      className='px-3 py-2 text-sm rounded-lg'
                    />

                   <input
                      name={`project-type-${index}`}
                      autoComplete="off"
                      value={project.type || ""}
                      onChange={(e) => updateProject(index, "type", e.target.value)}
                      type="text"
                      placeholder='Project Type'
                      className='px-3 py-2 text-sm rounded-lg'
                    />

                    <textarea
                      name={`project-description-${index}`}
                      autoComplete="off"
                      rows={4} value={project.description || ""}
                      onChange={(e) => updateProject(index, "description", e.target.value)}
                      placeholder='Describe your project.......!'
                      className='w-full px-3 py-2 text-sm rounded-lg resize-none'
                    />
                  </div>
    
                </div>
              ))}
            </div>
        </div>
 )
}

export default ProjectForm