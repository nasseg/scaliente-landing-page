'use client';
import { useEffect, useRef, useState } from 'react';

const AnimationRecorder = () => {
    const iframeRef = useRef(null);
    const [status, setStatus] = useState('Select a format to record');
    const [progress, setProgress] = useState(0);
    const [mode, setMode] = useState('desktop');

    const dimensions = {
        desktop: { width: 1920, height: 1080 },
        mobile: { width: 1080, height: 1920 }
    };

    const startRecordingProcess = (selectedMode) => {
        setMode(selectedMode);
        setStatus(`Preparing ${selectedMode}... Reloading animation.`);

        const iframe = iframeRef.current;
        if (iframe) {
            iframe.src = '/bg_effect.html';

            const handleLoad = () => {
                iframe.removeEventListener('load', handleLoad);
                setTimeout(() => recordStream(selectedMode), 500);
            };
            iframe.addEventListener('load', handleLoad);
        }
    };

    const recordStream = (currentMode) => {
        const iframe = iframeRef.current;
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        const canvas = innerDoc.querySelector('canvas');

        if (!canvas) {
            setStatus('Error: Canvas not found');
            return;
        }

        // REDUCED TO 30 FPS to minimize lag
        const FPS = 30;
        const DURATION_MS = 30000;

        setStatus(`Recording ${currentMode} (30s @ 30fps)...`);

        const stream = canvas.captureStream(FPS);
        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm; codecs=vp9',
            // Lower bitrate slightly for 30fps
            videoBitsPerSecond: 15000000
        });

        const chunks = [];
        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `animation_${currentMode}.webm`;
            a.click();
            setStatus(`Saved animation_${currentMode}.webm!`);
            setProgress(0);
        };

        mediaRecorder.start();

        let elapsed = 0;
        const interval = setInterval(() => {
            elapsed += 100;
            setProgress(Math.min(100, Math.round((elapsed / DURATION_MS) * 100)));
            if (elapsed >= DURATION_MS) {
                clearInterval(interval);
                mediaRecorder.stop();
            }
        }, 100);
    };

    return (
        <div className="fixed inset-0 bg-neutral-900 flex flex-col items-center justify-center font-sans">
            <div className="absolute top-6 z-50 bg-black/80 text-white p-6 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl flex flex-col items-center gap-4">
                <h1 className="text-xl font-bold">Multi-Format Recorder</h1>
                <p className="text-xs text-gray-400">FPS set to 30 to reduce render lag</p>

                <div className="flex gap-4">
                    <button
                        onClick={() => startRecordingProcess('desktop')}
                        disabled={status.includes('Recording')}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg font-medium transition-colors"
                    >
                        Record Desktop
                    </button>
                    <button
                        onClick={() => startRecordingProcess('mobile')}
                        disabled={status.includes('Recording')}
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-lg font-medium transition-colors"
                    >
                        Record Mobile
                    </button>
                </div>

                <div className="w-full text-center opacity-80 font-mono text-sm">{status}</div>

                {progress > 0 && (
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div className="bg-orange-500 h-full transition-all duration-100 linear" style={{ width: `${progress}%` }} />
                    </div>
                )}
            </div>

            <div
                className="relative transition-all duration-500 ease-in-out border-4 border-white/5 shadow-2xl bg-black"
                style={{
                    width: dimensions[mode].width === 1920 ? '80vw' : '40vh',
                    aspectRatio: `${dimensions[mode].width} / ${dimensions[mode].height}`
                }}
            >
                <iframe
                    ref={iframeRef}
                    src="/bg_effect.html"
                    className="w-full h-full border-0 block"
                />
            </div>
        </div>
    );
};

export default AnimationRecorder;
