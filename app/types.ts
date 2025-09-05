

export type PostMeta = {
    id: string;
    documentId: string;
    title: string;
    excerpt: string;
    date: string;
    slug: string;
    image?: string;
    author?: string;
    category?: string;
    featured?: boolean;
    body?: string;
};

export type StrapiResponse<T> = {
    data: T[];
}
export type StrapiProject = {
    id: number;
    title: string;
    documentId: string;
    description: string;
    image?: {
        url: string
        format?: {
            thumbnail?: string
            medium?: string
            large?: string
            small?: string
            xlarge?: string
        }
    }
    url: string;
    date: string;
    category: string;
    featured: boolean;
}
export type StrapiPost = {
    id: number;
    title: string;
    documentId: string;
    slug: string;
    image?: {
        url: string
        format?: {
            thumbnail?: string
            medium?: string
            large?: string
            small?: string
            xlarge?: string
        }
    }
    excerpt: string;
    date: string;
    body: string;

}

export type Project = {
    id: string;
    documentId: string;
    title: string;
    description: string;
    image: string;
    url: string;
    date: string;
    category: string;
    featured: boolean;

}