import ReactMarkdown from 'react-markdown';
import type { Route } from './+types/details';
import type { PostMeta } from '~/types';
import { Link } from 'react-router';


type BlogDetailsPageprops = {
    loaderData: {
        postMeta: PostMeta;
        markdown: string;
    }
}

export async function loader({ request, params }: Route.LoaderArgs) {

    const { slug } = params;

    if (!slug) {
        throw new Response("Missing slug", { status: 400 });
    }

    const url = new URL(`/posts-meta.json`, request.url);
    const response = await fetch(url.href);

    if (!response.ok) {
        throw new Response("Post not found", { status: 404 });
    }

    const index = await response.json();
    const postMeta = index.find((p: PostMeta) => p.slug === slug);
    if (!postMeta) {
        throw new Response("Post not found", { status: 404 });
    }
    //Dynamically import the raw markdown
    const markdownUrl = await import(`../../posts/${slug}.md?raw`);
    //const markdown = markdownUrl.default;


    return {
        postMeta,
        markdown: markdownUrl.default
    };
}

const BlogDetailsPage = ({ loaderData }: BlogDetailsPageprops) => {
    const { postMeta, markdown } = loaderData;


    return (
        <div className='max-w-3xl mx-auto px-6 py-12 bg-gray-800 rounded-md'>

            <h1 className='text-3xl font-bold mb-4 text-white'>{postMeta.title}</h1>
            <p className="text-sm text-gray-400 mb-6">
                {new Date(postMeta.date).toLocaleDateString()}
            </p>
            <div className="max-w-none mb-12 prose prose-invert text-white">
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
            <Link to="/blog" className="text-blue-500 hover:underline">
                Back to Blog
            </Link>
        </div>
    );
}

export default BlogDetailsPage;