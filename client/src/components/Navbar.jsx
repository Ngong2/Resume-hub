import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Logout } from '../app/features/authSlice'

const Navbar = () => {
   
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const logoutUser = () => {
        navigate("/")
        dispatch(Logout())
    }

    return (
        <div className='shadow-sm bg-white border-b border-gray-100'>
            <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3 text-slate-700'>
                <Link to={"/"} className='flex items-center'>
                    <img src="ResumeHub.svg" alt="ResumeHub" className='h-9 w-auto' />
                </Link>
                <div className='flex items-center gap-3 text-sm'>
                    <p className='max-sm:hidden text-gray-600'>Hello, {user.name}</p>
                    <button 
                        onClick={logoutUser} 
                        className='bg-white hover:bg-gray-50 border border-gray-200 px-5 py-1.5 rounded-md active:scale-98 transition-all text-gray-700 hover:text-gray-900'
                    >
                        Sign Out
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar