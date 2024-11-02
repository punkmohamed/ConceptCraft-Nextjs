import React from 'react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-white">
            {/* Main loader container */}
            <div className="relative">
                {/* Animated circles */}
                <div className="relative size-24 animate-[spin_3s_linear_infinite]">
                    <div className="absolute size-full rounded-full border-[6px] border-primary border-t-transparent animate-[spin_1.5s_linear_infinite]" />
                    <div className="absolute size-full rounded-full border-[6px] border-secondary border-b-transparent animate-[spin_2s_linear_infinite_reverse]" />
                </div>

                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 rounded-full bg-black-200" />
            </div>

            {/* Loading text with tag style */}
            <div className="mt-8">
                <div className="tag bg-white border-[3px] border-black">
                    Loading...
                </div>
            </div>

            {/* Decorative dots */}
            <div className="flex gap-2 mt-4">
                <div className="size-2 rounded-full bg-primary animate-[bounce_1s_infinite]" style={{ animationDelay: '0s' }} />
                <div className="size-2 rounded-full bg-primary animate-[bounce_1s_infinite]" style={{ animationDelay: '0.2s' }} />
                <div className="size-2 rounded-full bg-primary animate-[bounce_1s_infinite]" style={{ animationDelay: '0.4s' }} />
            </div>
        </div>
    );
};

export default Loader;