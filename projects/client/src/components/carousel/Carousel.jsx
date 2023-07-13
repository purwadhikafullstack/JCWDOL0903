import React, {useState} from 'react'
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/outline'
import { MinusSmallIcon } from '@heroicons/react/20/solid'

const slides = [
    {
        url: 'https://images.unsplash.com/photo-1685287417745-0ed40cb5b3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
    },
    {
        url: 'https://images.unsplash.com/photo-1685495967988-931ada560ab3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80'
    },
    {
        url: 'https://images.unsplash.com/photo-1682936586985-5a61f5b0506b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
    },
]

export default function Carousel (){
    const [currentIndex, setCurrentIndex] = useState(0)

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex -1;
        setCurrentIndex(newIndex)
    }

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }
    return (      
        <div className='max-w-[1400px] h-[450px] w-full m-auto py-16 px-4 relative'>
            <div style={{backgroundImage: `url(${slides[currentIndex].url})`}}className='w-full h-full rounded-2xl bg-center bg-cover duration-500'>
                {/* Left Arrow */}
                <div className=' h-10 w-10 absolute top-[50%] -translate-x-0 translate-y[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <ChevronLeftIcon onClick={prevSlide} />
                </div>

                {/* Rigth Arrow */}
                <div className=' h-10 w-10 absolute top-[50%] -translate-x-0 translate-y[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <ChevronRightIcon onClick={nextSlide}/>
                </div>   

                <div className='absolute bottom-4 left-0 right-0 flex justify-center'>
                    {slides.map((slide, slideIndex) => (
                        <div key={slideIndex} onClick={() => goToSlide(slideIndex)}className='flex items-center justify-center text-2xl w-8 h-8 mx-1 cursor-pointer'>
                            <MinusSmallIcon />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )

}

