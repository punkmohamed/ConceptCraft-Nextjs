import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white-100">
            <div className="max-w-2xl w-full text-center space-y-8">
                {/* 404 Number */}
                <div className="relative">
                    <h1 className="text-[120px] md:text-[200px] font-extrabold text-primary opacity-10">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-30-bold bg-white px-4">Page Not Found</span>
                    </div>
                </div>

                {/* Pattern Container */}
                <div className="pink_container rounded-[30px] border-[5px] border-black shadow-100 min-h-[200px]">
                    <div className="max-w-md space-y-4 flex items-center flex-col">
                        <h2 className="text-20-medium text-white text-center">
                            Oops! The page you're looking for seems to have wandered off...
                        </h2>
                        <p className="text-14-normal text-center">
                            Don't worry, you can always head back home and start fresh!
                        </p>

                        {/* Home Button */}
                        <Link href="/" className="mx-auto">
                            <Button className="login bg-secondary hover:bg-secondary/90 text-black-200 mt-6 flex items-center gap-2">
                                <Home className="size-5" />
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Decorative Tag */}
                <div className="flex justify-center">
                    <div className="tag">
                        Error 404
                    </div>
                </div>
            </div>
        </main>
    );
}