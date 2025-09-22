import Link from "next/link";
import ContactModalTrigger from "@/components/ContactModalTrigger";
import { RainbowButton } from "@/components/ui/rainbow-button";

export default function Navbar() {
    return (
        <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
            <nav className="mt-4 relative max-w-2xl w-full bg-white border border-gray-200 rounded-[24px] mx-2 flex flex-wrap md:flex-nowrap items-center justify-between p-1 ps-4 md:py-0 sm:mx-auto">
                <div className="flex items-center">
                    {/* Logo */}
                    <Link
                        className="flex-none inline-flex items-baseline rounded-md text-xl font-semibold tracking-tight text-gray-900 focus:outline-hidden font-display text-3d"
                        href="/"
                        aria-label="prakhar.ca — home"
                    >
                        <span className="leading-none">prakhar</span>
                        <span className="ml-0.5 font-normal text-gray-500">.ca</span>
                    </Link>
                    {/* End Logo */}

                    <div className="ms-1 sm:ms-2"></div>
                </div>

                <div className="flex items-center gap-1 md:order-4 md:ms-4">
                    <div className="md:hidden">
                        {/* Toggle Button */}
                        <button
                            type="button"
                            className="hs-collapse-toggle flex justify-center items-center size-9.5 border border-gray-200 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200"
                            id="hs-navbar-header-floating-collapse"
                            aria-expanded="false"
                            aria-controls="hs-navbar-header-floating"
                            aria-label="Toggle navigation"
                            data-hs-collapse="#hs-navbar-header-floating"
                        >
                            <svg
                                className="hs-collapse-open:hidden shrink-0 size-3.5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="3" x2="21" y1="6" y2="6" />
                                <line x1="3" x2="21" y1="12" y2="12" />
                                <line x1="3" x2="21" y1="18" y2="18" />
                            </svg>
                            <svg
                                className="hs-collapse-open:block hidden shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                        {/* End Toggle Button */}
                    </div>
                </div>

                <div
                    id="hs-navbar-header-floating"
                    className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block"
                    aria-labelledby="hs-navbar-header-floating-collapse"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-3 mt-3 md:mt-0 py-2 md:py-0 md:ps-7">
                        <Link
                            className="py-0.5 md:py-3 px-4 md:px-1 text-gray-500 hover:text-gray-800 focus:outline-hidden"
                            href="/#about"
                        >
                            About
                        </Link>
                        <Link
                            className="py-0.5 md:py-3 px-4 md:px-1 text-gray-500 hover:text-gray-800 focus:outline-hidden"
                            href="/#projects"
                        >
                            Projects
                        </Link>
                        <ContactModalTrigger>
                            <RainbowButton asChild size="sm" className="rounded-full">
                                <button type="button" aria-label="Contact">
                                    Contact
                                </button>
                            </RainbowButton>
                        </ContactModalTrigger>
                    </div>
                </div>
            </nav>
        </header>
    );
}
