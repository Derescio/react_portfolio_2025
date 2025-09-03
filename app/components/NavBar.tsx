import { useState } from "react"
import { NavLink } from "react-router"
import { FaLaptopCode, FaTimes, FaBars } from "react-icons/fa"

function NavBar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const baseClasses = "transition text-white hover:text-blue-200"
    const activeClasses = "text-blue-400 font-semibold"
    return (
        <nav className='bg-gray-800 border-b-gray-700 shadow-md sticky top-0 z-20'>
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2 text-lg font-semibold ml-4">
                    <NavLink to="/" className="text-gray-300 hover:text-white">
                        <FaLaptopCode className="inline-block mr-2 text-blue-400" />
                        <span className="text-white">My Portfolio</span>
                    </NavLink>

                </div>
                {/* Desktop Navigaton */}
                <div className="hidden md:flex space-x-4">

                    <NavLink to="/" className={({ isActive }) => isActive ? activeClasses : baseClasses}>Home</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? activeClasses : baseClasses}>About</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? activeClasses : baseClasses}>Contact</NavLink>
                    <NavLink to="/projects" className={({ isActive }) => isActive ? activeClasses : baseClasses}>Projects</NavLink>
                    <NavLink to="/blog" className={({ isActive }) => isActive ? activeClasses : baseClasses}>Blog</NavLink>
                </div>
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button title="Toggle Menu" onClick={toggleMenu} className="text-gray-300 hover:text-white cursor-pointer">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>
            {/* Mobile Nav Menu */}
            {isOpen && (
                <div className="md:hidden bg-gray-800 border-t-gray-700 px-6 py-4 space-y-2 flex flex-col">
                    <NavLink to="/" className={({ isActive }) => isActive ? activeClasses : baseClasses} onClick={() => setIsOpen(!isOpen)}>Home</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? activeClasses : baseClasses} onClick={() => setIsOpen(!isOpen)}>About</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? activeClasses : baseClasses} onClick={() => setIsOpen(!isOpen)}>Contact</NavLink>
                    <NavLink to="/projects" className={({ isActive }) => isActive ? activeClasses : baseClasses} onClick={() => setIsOpen(!isOpen)}>Projects</NavLink>
                    <NavLink to="/blog" className={({ isActive }) => isActive ? activeClasses : baseClasses} onClick={() => setIsOpen(!isOpen)}>Blog</NavLink>
                </div>
            )}
        </nav>
    )
}

export default NavBar