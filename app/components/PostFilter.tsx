import React from 'react'

type PostFilterProps = {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const PostFilter = ({ searchQuery, onSearchChange }: PostFilterProps) => {
    return (
        <div className='mb-4'>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search posts..."
                className="border border-gray-300 rounded-md p-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}

export default PostFilter