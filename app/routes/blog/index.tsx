
// Import route types for loader and component props
import type { Route } from "./+types/index";
// Import the PostMeta type (single post meta object)
import type { PostMeta } from "~/types";
// Import UI components
import PostCard from "~/components/PostCard";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import PostFilter from "~/components/PostFilter";


// Loader function to fetch blog post metadata from a static JSON file
export async function loader({ request }: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
    try {
        // Construct the URL for the posts-meta.json file relative to the current request
        const url = new URL('/posts-meta.json', request.url);
        // Fetch the JSON file containing post metadata
        const response = await fetch(url.href);
        const data = await response.json();
        // Sort posts by date (newest first)
        data.sort((a: PostMeta, b: PostMeta) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return { posts: data };
    } catch (error) {
        // Log and throw an error if fetching fails
        console.error("Error fetching blog posts:", error);
        throw new Response("Failed to load blog posts", { status: 500 });
    }
}


// BlogPage component displays a paginated, filterable list of blog posts
const BlogPage = ({ loaderData }: Route.ComponentProps) => {
    // State for the search query input
    const [searchQuery, setSearchQuery] = useState("");
    // State for the current pagination page
    const [currentPage, setCurrentPage] = useState(1);
    // Number of posts to show per page
    const postsPerPage = 9;
    // Calculate total number of pages
    const totalPages = Math.ceil((loaderData?.posts.length || 0) / postsPerPage);
    // Calculate indices for slicing posts array
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // Get posts for the current page
    const posts = loaderData?.posts.slice(indexOfFirstPost, indexOfLastPost) || [];
    // Filter posts by search query (case-insensitive match on title)
    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-300 rounded-md'>
            {/* Blog heading */}
            <h2 className="text-2xl font-bold mb-8">Blog</h2>
            {/* Search/filter input for blog posts */}
            <PostFilter
                searchQuery={searchQuery}
                onSearchChange={(query) => {
                    setSearchQuery(query);
                    setCurrentPage(1); // Reset to first page on new search
                }}
            />
            {/* List of filtered blog posts */}
            <div className="space-y-4">
                {filteredPosts.length === 0 && (
                    <p className="text-gray-500">No posts found.</p>
                )}
                {filteredPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
            {/* Pagination controls if more than one page */}
            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
        </div>
    );
}

// Export the BlogPage component as default
export default BlogPage;