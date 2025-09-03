import React from 'react'
import { Link } from 'react-router'

const Hero = () => {
    return (
        <header className="text-center py-20 px-4 bg-gray-900 text-white transition-colors duration-300">
            <h2 className="text-4xl font-bold mb-4">
                Hi, I'm Damion
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
                I'm a passionate developer with a knack for creating stunning web applications.
            </p>
            <div className="flex justify-center gap-4">
                <Link to="/projects" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    View My Work
                </Link>
                <Link to="/contact" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Contact Me
                </Link>
            </div>
        </header>
    )
}

export default Hero
