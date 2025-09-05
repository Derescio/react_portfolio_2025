import type { Route } from "./+types/index";


// export async function action({ request }: Route.ActionArgs) {
//     const formData = await request.formData();
//     const name = formData.get("name");
//     const email = formData.get("email");
//     const subject = formData.get("subject");
//     const message = formData.get("message");

//     const errors: Record<string, string> = {};
//     if (!name) {
//         errors.name = "Name is required";
//     }

//     if (!email) {
//         errors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toString())) {
//         errors.email = "Email is invalid";
//     }

//     if (!subject) {
//         errors.subject = "Subject is required";
//     }

//     if (!message) {
//         errors.message = "Message is required";
//     }
//     if (Object.keys(errors).length > 0) {
//         return { errors };
//     }

//     const data = {
//         name,
//         email,
//         subject,
//         message
//     };
//     return { message: "Form submitted successfully!", data };
// }


const Contact = ({ actionData }: Route.ComponentProps) => {
    // const errors = actionData?.errors || {};
    return (
        <div className='max-w-5xl mx-auto px-6 py-16 bg-gray-900'>
            <h2 className="text-2xl font-bold  text-white">Contact</h2>
            {/* {actionData?.message && (
                <div className="mt-4 text-green-500">{actionData.message}</div>
            )} */}
            <form action="https://formspree.io/f/mqadgyod" method="POST" className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 block w-full p-2 bg-gray-200 border border-gray-700 rounded-md"
                        placeholder="Your Name"
                    />
                    {/* {errors.name && <div className="mt-1 text-red-500">{errors.name}</div>} */}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 block w-full p-2 bg-gray-200 border border-gray-700 rounded-md"
                        placeholder="Your Email"
                    />
                    {/* {errors.email && <div className="mt-1 text-red-500">{errors.email}</div>} */}
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="mt-1 block w-full p-2 bg-gray-200 border border-gray-700 rounded-md"
                        placeholder="Subject  "
                    />
                    {/* {errors.subject && <div className="mt-1 text-red-500">{errors.subject}</div>} */}
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="mt-1 block w-full p-2 bg-gray-200 border border-gray-700 rounded-md"
                        placeholder="Your Message"
                    />
                    {/* {errors.message && <div className="mt-1 text-red-500">{errors.message}</div>} */}
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Send Message
                </button>
            </form>
        </div>
    );
}

export default Contact;