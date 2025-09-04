import React from 'react'
import type { PostMeta } from '~/types'

const LatestPost = ({ posts, limit }: { posts: PostMeta[], limit: number }) => {
    return (
        <section className='max-w-6xl mx-auto px-6 py-12'>
            <h2 className='text-2xl font-bold mb-8'>Latest Posts</h2>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {posts.slice(0, limit).map(post => (
                    <div key={post.id}>
                        <h3 className='text-lg font-semibold'>{post.title}</h3>
                        <p className='text-sm text-gray-600'>{post.excerpt}</p>
                        <p className='text-xs text-gray-500'>{new Date(post.date).toLocaleDateString()}</p>
                        <a href={`/blog/${post.slug}`} className='text-blue-500 hover:underline'>Read more</a>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default LatestPost


