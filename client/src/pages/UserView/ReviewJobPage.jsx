import { Button } from '@/components/ui/button'
import {  CircleCheckBig, Home, User } from 'lucide-react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function ReviewJobPage() {
    useEffect(()=> {
        window.scrollTo( 0 , 0 )
    })
    const navigate = useNavigate();
    return (
        <div className='flex justify-center items-center flex-col h-screen'>
            <div>
                <CircleCheckBig  className='size-28 mb-5 text-green-700'/>
            </div>
            <div>
                <h2 className='text-secondary font-bold text-xl text-center dark:text-primary'>Thank you for submitting your business! .</h2>
                    <p className='text-black font-bold text-md text-center dark:text-primary'>Our team will review your application and provide feedback via email shortly</p>
            </div>
            <div className='flex gap-5'>
                <Button className="bg-secondary mt-10 dark:text-primary"
                    onClick={()=> navigate('/user/home') }
                >
                    <Home className='mr-2 dark:text-primary'/>
                    Go To Home 
                </Button>
                <Button className="bg-secondary mt-10 dark:text-primary" 
                    onClick={()=> navigate('/user/userProfile') }
                >
                    <User className='mr-2 dark:text-primary'/>
                    Go To Profile 
                </Button>

            </div>
        </div>
    )
}

export default ReviewJobPage
