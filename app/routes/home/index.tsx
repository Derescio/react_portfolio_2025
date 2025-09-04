import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import type { Project } from "~/types";
import AboutPreview from "~/components/AboutPreview";
import type { PostMeta } from "~/types";
import LatestPost from "~/components/LatestPost";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Web Developer, Canada" },
        { name: "description", content: "Custom Website Development" },
    ];
}

export const loader = async ({ request }: Route.LoaderArgs): Promise<{ projects: Project[], posts: PostMeta[] }> => {
    const url = new URL(request.url);

    const [projectsRes, postsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/projects`),
        fetch(new URL('/posts-meta.json', request.url))
    ]);
    if (!postsRes.ok || !projectsRes.ok) {
        throw new Response("Failed to fetch post/metadata", { status: 500 });
    }
    const [projects, posts] = await Promise.all([
        projectsRes.json(),
        postsRes.json()
    ]);
    return { projects, posts };
};

const Home = ({ loaderData }: Route.ComponentProps) => {

    const { projects, posts } = loaderData as { projects: Project[], posts: PostMeta[] };
    //Sort Posts
    const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return <>

        <FeaturedProjects projects={projects} count={projects.length - 5} />
        <AboutPreview />
        <LatestPost posts={sortedPosts} limit={3} />
    </>;
}

export default Home;