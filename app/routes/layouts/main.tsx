import { Outlet } from "react-router";
import Hero from "~/components/Hero";
const MainLayout = () => {
    return (
        <>

            <section className="max-w-7xl mx-auto px-6 my-8 ">
                <Outlet />
            </section>
        </>
    );
}

export default MainLayout;