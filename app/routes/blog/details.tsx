import ReactMarkdown from 'react-markdown';
import type { Route } from './+types/details';
import type { PostMeta, StrapiPost, StrapiResponse } from '~/types';
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

    // const url = new URL(`/posts-meta.json`, request.url);
    // const response = await fetch(url.href);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts?filters[slug][$eq]=${slug}&populate=*`);
    const postjson: StrapiResponse<StrapiPost> = await response.json();

    if (!response.ok) {
        throw new Response("Post not found", { status: 404 });
    }

    const index = postjson.data.map((item) => ({
        id: String(item.id),
        title: item.title,
        documentId: item.documentId,
        slug: item.slug,
        excerpt: item.excerpt,
        date: item.date,
        image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
        body: item.body
    }));
    const postMeta = index[0];
    if (!postMeta) {
        throw new Response("Post not found", { status: 404 });
    }
    // if (!postjson.data || postjson.data.length === 0) {
    //     throw new Response("Post not found", { status: 404 });
    // }
    //Dynamically import the raw markdown
    // const markdownUrl = await import(`../../posts/${slug}.md?raw`);
    //const markdown = markdownUrl.default;

    console.log(postMeta)

    return {
        postMeta,
        // markdown: postMeta.body || "", // or fetch markdown if needed
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
            <p className="text-sm text-gray-400 mb-6">
                {postMeta.excerpt}
            </p>
            {postMeta.image && (<img src={postMeta.image} alt={postMeta.title} className="w-full h-60 object-cover mb-6 rounded" />)}
            {/* {postMeta.body && (<div key={postMeta.id} className="max-w-none mb-12 prose prose-invert text-white">
                {postMeta.body[0].children[0].text}
            </div>)} */}

            <div className="max-w-none mb-12 prose prose-invert text-white">
                <ReactMarkdown>
                    {Array.isArray(postMeta.body) && postMeta.body.length > 0
                        ? postMeta.body[0].children.map((child: { text: any; }) => child.text).join(" ")
                        : typeof postMeta.body === "string"
                            ? postMeta.body
                            : ""}
                </ReactMarkdown>
            </div>
            <Link to="/blog" className="text-blue-500 hover:underline">
                Back to Blog
            </Link>
        </div>
    );
}

export default BlogDetailsPage;