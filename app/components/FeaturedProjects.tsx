import React from 'react'
import type { Project } from '~/types'
import ProjectCard from './ProjectCard';

const FeaturedProjects = ({ projects, count }: { projects: Project[], count: number }) => {


    return (
        <section>
            {projects.length > 0 && (
                <>
                    <h2 className='text-2xl font-bold mb-8'>Featured Projects</h2>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {/* Map through featured projects and display them */}
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </>
            )}
        </section>
    )
}

export default FeaturedProjects
