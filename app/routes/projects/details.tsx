import type { Route } from "./+types/details"
import type { Project, StrapiProject, StrapiResponse } from "~/types";
import { Link } from "react-router";
import { FaLink } from "react-icons/fa";



// Loader function to fetch project details by documentId
export async function loader({ params, request }: Route.LoaderArgs) {
    // Fetch project by documentId from Strapi
    if (!params.id) {
        throw new Error("Project ID is required");
    }
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects?filters[documentId][$eq]=${params.id}&populate=*`);
    if (!res.ok) {
        throw new Error("Failed to fetch project with ID " + params.id);
    }
    // Create a variable to hold the JSON response in the correct type and shape
    const json: StrapiResponse<StrapiProject> = await res.json();

    //Assign the first item in the data array to a variable. Validate that the array is not empty first.
    const item = json.data[0];
    if (json.data.length === 0) {
        throw new Error("Project not found");
    }

    // Map the Strapi project to the frontend Project type
    const project: Project = {
        id: item.id.toString(),
        documentId: item.documentId,
        title: item.title,
        description: item.description,
        image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
        url: item.url,
        date: item.date,
        category: item.category,
        featured: item.featured,
    };
    return { project };
}

// export function HydrateFallback() {
//     <div>
//         <h2>Project Details</h2>
//         <p>Loading project details...</p>
//     </div>

// }

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
    // Extract project data from loaderData for display on the frontend
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