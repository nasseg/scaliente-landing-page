"use client";

import React from 'react';

export default function BackgroundEffect() {
    return (
        <div className="fixed inset-0 -z-50 w-full h-full pointer-events-none overflow-hidden bg-black">
            <iframe
                src="/bg_effect.html"
                className="w-full h-full border-0 absolute top-0 left-0"
                title="Background Effect"
            />
        </div>
    );
}
