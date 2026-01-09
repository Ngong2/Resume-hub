import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon, Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { ngongResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../config/api'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {

    const { token } = useSelector(state => state.auth)

    const colors = ["#9333ea", "#d97706", "#dec262", "#0284c7", "#16a34a"]
    const [allResumes, setAllResumes] = useState([])
    const [showCreateResume, setShowCreateResume] = useState(false)
    const [showUploadResume, setShowUploadResume] = useState(false)
    const [title, setTitle] = useState('')
    const [resume, setResume] = useState(null)
    const [editResumeId, setEditResumeId] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const loadAllResumes = async () => {
        try {
            const { data } = await api.get('/api/users/resumes',{ headers: { Authorization: `Bearer ${token}` } }
            )
            setAllResumes(data.resumes)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Failed to load resumes")
        }
    }

    const createResume = async (event) => {
        event.preventDefault()
        try {
            if (!title) return toast.error("Title is required")

            const { data } = await api.post(
                '/api/resumes/create',
                { title },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            setAllResumes([...allResumes, data.resume])
            setTitle('')
            setShowCreateResume(false)
            navigate(`/app/hub/${data.resume._id}`)

        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to create resume")
        }
    }

    // ================================
    // UPLOAD EXISTING RESUME
    // ================================
    const uploadResume = async (event) => {
        event.preventDefault()

        if (!resume) return toast.error("Please upload a resume PDF")
        if (!title) return toast.error("Resume title is required")

        const toastId = toast.loading("Uploading & analyzing resume...")
        setIsLoading(true)

        try {
            const resumeText = await pdfToText(resume)

            const { data } = await api.post(
                '/api/ai/upload-resume',
                { title, resumeText },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            toast.success("Resume uploaded successfully!", { id: toastId })

            setTitle('')
            setResume(null)
            setShowUploadResume(false)

            navigate(`/app/hub/${data.resumeId}`)

        } catch (error) {
            toast.error(
                error?.response?.data?.message ||  error.message || "Failed to upload resume",
                { id: toastId }
            )
        } finally {
            setIsLoading(false)
        }
    }

    const editTitle = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            if (!title) return toast.error("Title is required")

            const { data } = await api.put( '/api/resumes/update',
                { resumeId: editResumeId, resumeData: JSON.stringify({ title }) },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            setAllResumes(prev =>
                prev.map(r => r._id === editResumeId ? data.resume : r)
            )

            setEditResumeId('')
            setTitle('')
            setShowCreateResume(false)

        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Failed to update resume")
        } finally {
            setIsLoading(false)
        }
    }

    const deleteResume = async (resumeId) => {
        const confirm = window.confirm("Are you sure you want to delete this resume?")
        if (!confirm) return

        try {
            await api.delete(
                `/api/resumes/delete/${resumeId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            setAllResumes(prev =>
                prev.filter(resume => resume._id !== resumeId)
            )

            toast.success("Resume deleted")

        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Failed to delete resume")
        }
    }

    useEffect(() => {
        loadAllResumes()
    }, [])

    return (
        <div>
            <div className='max-w-7xl mx-auto px-4 py-8'>

                <div className='flex gap-4 mb-8'>
                    <button
                        onClick={() => setShowCreateResume(true)}
                        className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border border-dashed border-slate-300 hover:border-indigo-500'
                    >
                        <PlusIcon className='size-10 text-indigo-500' />
                        <p>Create Resume</p>
                    </button>

                    <button
                        onClick={() => setShowUploadResume(true)}
                        className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border border-dashed border-slate-300 hover:border-purple-500'
                    >
                        <UploadCloudIcon className='size-10 text-purple-500' />
                        <p>Upload Existing</p>
                    </button>
                </div>

                {/* Resumes Display Section */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {allResumes.map((resume, index) => (
                        <div key={resume._id || index} className='bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow'>
                            <div className='flex justify-between items-start mb-4'>
                                <div className='w-10 h-10 rounded-full flex items-center justify-center text-white font-bold' 
                                     style={{ backgroundColor: colors[index % colors.length] }}>
                                    {resume.title?.charAt(0) || 'R'}
                                </div>
                                <div className='flex gap-2'>
                                    <button 
                                        onClick={() => {
                                                setEditResumeId(resume._id)
                                                setTitle(resume.title)
                                                setShowCreateResume(true)
                                            }}
                                        className='p-1 hover:bg-slate-100 rounded'
                                    >
                                        <PencilIcon className='size-4 text-slate-600' />
                                    </button>
                                    <button 
                                        onClick={() => deleteResume(resume._id)}
                                        className='p-1 hover:bg-slate-100 rounded'
                                    >
                                        <TrashIcon className='size-4 text-red-500' />
                                    </button>
                                </div>
                            </div>
                            <h3 className='font-semibold text-lg mb-2'>{resume.title}</h3>
                            <p className='text-sm text-slate-500 mb-4'>
                                Last updated: {new Date(resume.updatedAt || Date.now()).toLocaleDateString()}
                            </p>
                            <button 
                                onClick={() => navigate(`/app/hub/${resume._id}`)}
                                className='w-full bg-indigo-50 text-indigo-600 py-2 rounded-md hover:bg-indigo-100 text-sm font-medium'
                            >
                                Open Resume
                            </button>
                        </div>
                    ))}
                </div>

                {/* Create Resume Modal */}
                {showCreateResume && (
                    <div className='fixed inset-0 z-50 bg-black/40 flex items-center justify-center'>
                        <div className='bg-white p-6 rounded-xl w-full max-w-md'>
                            <div className='flex justify-between items-center mb-4'>
                                <h2 className='text-xl font-bold'>Create New Resume</h2>
                                <button 
                                    onClick={() => {
                                        setShowCreateResume(false)
                                        setTitle('')
                                    }}
                                    className='p-1 hover:bg-slate-100 rounded'
                                >
                                    <XIcon className='size-5' />
                                </button>
                            </div>
                            <form onSubmit={editResumeId ? editTitle : createResume}>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Resume title"
                                    className='w-full mb-4 px-4 py-2 border rounded'
                                    required
                                />
                                <div className='flex gap-2'>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className='w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-70'
                                    >
                                        {editResumeId ? (isLoading ? 'Saving...' : 'Save') : 'Create Resume'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowCreateResume(false)
                                            setTitle('')
                                            setEditResumeId('')
                                        }}
                                        className='w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Upload Resume Modal */}
                {showUploadResume && (
                    <div className='fixed inset-0 z-50 bg-black/40 flex items-center justify-center'>
                        <div className='bg-white p-6 rounded-xl w-full max-w-md'>
                            <div className='flex justify-between items-center mb-4'>
                                <h2 className='text-xl font-bold'>Upload Resume</h2>
                                <button 
                                    onClick={() => {
                                        setShowUploadResume(false)
                                        setTitle('')
                                        setResume(null)
                                    }}
                                    className='p-1 hover:bg-slate-100 rounded'
                                >
                                    <XIcon className='size-5' />
                                </button>
                            </div>
                            <form onSubmit={uploadResume}>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Resume title"
                                    className='w-full mb-4 px-4 py-2 border rounded'
                                    required
                                />

                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={e => setResume(e.target.files[0])}
                                    className='mb-4'
                                />

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className='w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-70'
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2Icon className='animate-spin size-5' />
                                            Uploading...
                                        </>
                                    ) : (
                                        "Upload Resume"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard