import type { PostMeta } from '~/types'
import { Link } from 'react-router';


const PostCard = ({ post }: { post: PostMeta }) => {
    return (
        <article className="border p-4 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p>{new Date(post.date).toLocaleDateString()}</p>
            {post.image && (<img src={post.image} alt={post.title} className="w-full h-40 object-cover mb-4" />)}
            <p>{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
                Read more
            </Link>
        </article>
    );
}

export default PostCard;