import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import type { Project } from "~/types";
import AboutPreview from "~/components/AboutPreview";


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Web Developer, Canada" },
        { name: "description", content: "Custom Website Development" },
    ];
}

export const loader = async ({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
    const data = await res.json();
    return { projects: data };
};

const Home = ({ loaderData }: Route.ComponentProps) => {
    const { projects } = loaderData as { projects: Project[] };

    return <>

        <FeaturedProjects projects={projects} count={projects.length - 5} />
        <AboutPreview />
    </>;
}

export default Home;