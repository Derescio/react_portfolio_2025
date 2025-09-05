import { useState } from "react";
import ProjectCard from "~/components/ProjectCard";
import type { Route } from "./+types/index";
import type { Project, StrapiProject, StrapiResponse } from "~/types";
import Pagination from "~/components/Pagination";
import { AnimatePresence, motion } from "framer-motion";






export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/projects?populate=*`);
        const json: StrapiResponse<StrapiProject> = await res.json();
        // console.log(json)
        const projects = json.data.map((item) => ({
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
        return { projects };
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}


const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const { projects } = loaderData as { projects: Project[] };
    const categories = ['All', ...new Set(projects.map(project => project.category))];

    // Filter projects by selected category
    const filteredProjects = selectedCategory === 'All'
        ? projects
        : projects.filter(project => project.category === selectedCategory);

    const projectsPerPage = 5;
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    // const startIndex = (currentPage - 1) * projectsPerPage;
    // const endIndex = startIndex + projectsPerPage;

    const indexOfLast = currentPage * projectsPerPage;
    const indexOfFirst = indexOfLast - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);


    return (
        <section>
            <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <h2 className="text-2xl font-bold mb-8 ">Projects</h2>
            <AnimatePresence mode="wait">
                <motion.div layout className="grid gap-6 sm:grid-cols-2">
                    {currentProjects.map((project) => (
                        <motion.div key={project.id} layout>
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}

                </motion.div>
            </AnimatePresence>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

        </section>
    );
}

export default ProjectsPage;