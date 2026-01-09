import { Loader2, Sparkle } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../config/api'
import toast from 'react-hot-toast'

const ProfessionalSummaryForm = ({ data, onChange }) => {

  const token = useSelector(state => state.auth?.token)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    if (!token) {
      toast.error("Unauthorized: Please login")
      return
    }

    try {
      setIsGenerating(true)

      const prompt = `enhance my professional summary "${data}"`

      const response = await api.post(
        '/api/ai/enhance-pro-sum',
        { userContent: prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      onChange(response.data.enhancedContent)

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unauthorized or Server Error"
      )
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-gray-900'>
          Professional Summary
        </h3>

        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className='flex items-center gap-2 px-2 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:opacity-50'
        >
          {isGenerating
            ? <Loader2 className='size-4 animate-spin' />
            : <Sparkle size={16} />
          }
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <textarea
        value={data || ""}
        onChange={e => onChange(e.target.value)}
        rows={7}
        className='w-full p-3 mt-2 border rounded-lg'
        placeholder='Write your professional summary...'
      />
    </div>
  )
}

export default ProfessionalSummaryForm
