import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import type { Project, StrapiPost, StrapiProject, StrapiResponse } from "~/types";
import AboutPreview from "~/components/AboutPreview";
import type { PostMeta } from "~/types";
import LatestPost from "~/components/LatestPost";
import type { body } from "framer-motion/client";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Web Developer, Canada" },
        { name: "description", content: "Custom Website Development" },
    ];
}

export const loader = async ({ request }: Route.LoaderArgs): Promise<{ projects: Project[], posts: PostMeta[] }> => {
    const url = new URL(request.url);

    const [projectsRes, postsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`),
        fetch(`${import.meta.env.VITE_API_URL}/posts?sort[0][date]=desc&populate=*`),
    ]);
    if (!postsRes.ok || !projectsRes.ok) {
        throw new Response("Failed to fetch post/metadata", { status: 500 });
    }


    const projectsJson: StrapiResponse<StrapiProject> = await projectsRes.json();
    const projects = projectsJson.data.map((item) => ({
        id: item.id.toString(),
        documentId: item.documentId,
        title: item.title,
        description: item.description,
        image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
        url: item.url,
        date: item.date,
        category: item.category,
        featured: item.featured,
    }));

    const postJson: StrapiResponse<StrapiPost> = await postsRes.json();

    const posts = postJson.data.map((item) => ({
        id: item.id.toString(),
        documentId: item.documentId,
        title: item.title,
        slug: item.slug,
        image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
        date: item.date,
        excerpt: item.excerpt,
        body: item.body,

    }));


    // const [projects, posts] = await Promise.all([
    //     projectsRes.json(),
    //     postsRes.json()
    // ]);
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