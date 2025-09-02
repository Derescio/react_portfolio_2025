import type { Route } from "./+types/index";


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Web Developer, Canada" },
        { name: "description", content: "Custom Website Development" },
    ];
}


export default function Home() {
    console.log("Home test")
    return <>Welcome to the Home Page</>;
}
