import React from "react";

export const StarField = () => {
    return (
        <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[#0a0a0a]"></div>
            {/* Subtle ambient glow */}
            <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-cyan-500/5 blur-[100px] rounded-full mix-blend-screen animate-pulse duration-[4000ms]" />
            <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-blue-600/5 blur-[100px] rounded-full mix-blend-screen animate-pulse duration-[5000ms]" />

            {/* Tiny stars overlay */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }}
            />
        </div>
    );
};
