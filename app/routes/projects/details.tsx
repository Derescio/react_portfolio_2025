import type { Route } from "./+types/details"
import type { Project } from "~/types";
import { Link } from "react-router";
import { FaLink } from "react-icons/fa";

export async function loader({ params, request }: Route.ClientLoaderArgs): Promise<{ project: Project }> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/${params.id}`);
    if (!res.ok) {
        throw new Error("Failed to fetch project");
    }

    const data = await res.json();
    return { project: data };
}

export function HydrateFallback() {
    <div>
        <h2>Project Details</h2>
        <p>Loading project details...</p>
    </div>

}

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
    const { project } = loaderData as { project: Project };
    return (
        <>
            <Link to="/projects">
                <div className="flex items-center gap-2 mb-6">
                    Back to Projects
                    <FaLink />
                </div>
            </Link>
            <div className="grid gap-8 md:grid-cols-2 items-start">
                <div>
                    <img src={project.image} alt={project.title} className="w-full rounded-lg shadow-2xl" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-blue-400 mb-4">{project.title}</h1>

                    <p className="text-gray-800 text-sm mb-4">{project.date}</p>
                    <p className="text-gray-800 text-sm mb-4">{project.category}</p>
                    <p className="text-gray-800 text-sm mb-4">{project.description}</p>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        View Live Site
                    </a>
                </div>
            </div>

        </>
    )
}

export default ProjectDetailsPage