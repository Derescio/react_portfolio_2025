import type { Project } from "~/types";
import { Link } from "react-router";

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <>
            <Link to={`/projects/${project.documentId}`} className="block transform transition duration hover:scale-[1.02" aria-label={project.title}>
                <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg overflow-hidden shadow-sm transition hover:shadow-md">
                    <img src={project.image} alt={project.title} className="w-full h-40 object-cover mb-4" />
                    <div className="p-5">
                        <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                        <p className="text-sm text-gray-300 mb-2">{project.description}</p>
                        <div className="flex justify-between items-center text-sm text-gray-200">
                            <span>{new Date(project.date).toLocaleString()}</span>
                            <span>{project.category}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default ProjectCard;