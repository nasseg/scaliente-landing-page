'use client';
import { useRef, useState } from 'react';

const AnimationRecorder = () => {
    const iframeRef = useRef(null);
    const [status, setStatus] = useState('Select a format to record');
    const [progress, setProgress] = useState(0);
    const [mode, setMode] = useState('desktop');
    const [result, setResult] = useState(null);

    const dimensions = {
        desktop: { width: 1920, height: 1080 },
        mobile: { width: 1080, height: 1920 }
    };

    const startRecordingProcess = (selectedMode) => {
        setMode(selectedMode);
        setResult(null);
        setStatus(`Preparing ${selectedMode}... Reloading animation.`);

        const iframe = iframeRef.current;
        if (iframe) {
            iframe.src = '/bg_effect.html';

            const handleLoad = () => {
                iframe.removeEventListener('load', handleLoad);
                setStatus('Warming up WebGL (3s)...');
                setTimeout(() => recordStream(selectedMode), 3000);
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

        // Force canvas to target resolution regardless of CSS size
        const dim = dimensions[currentMode];
        canvas.width = dim.width;
        canvas.height = dim.height;

        const DURATION_MS = 10000; // 10 seconds

        setStatus(`Recording ${currentMode} (10s @ ${dim.width}x${dim.height})...`);

        const stream = canvas.captureStream(0);
        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm; codecs=vp9',
            videoBitsPerSecond: 20000000
        });

        const chunks = [];
        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.push(e.data);
        };

        mediaRecorder.onstop = async () => {
            const blob = new Blob(chunks, { type: 'video/webm' });

            setStatus('Converting to MP4 with ffmpeg...');
            setProgress(100);

            const formData = new FormData();
            formData.append('video', blob, `bg_effect_${currentMode}.webm`);
            formData.append('mode', currentMode);

            try {
                const res = await fetch('/api/convert-video', {
                    method: 'POST',
                    body: formData,
                });
                const data = await res.json();

                if (data.success) {
                    setResult(data);
                    setStatus('Done! WebM + MP4 saved to public/video/');
                } else {
                    setStatus(`Error: ${data.error}`);
                }
            } catch (err) {
                setStatus(`Upload error: ${err.message}`);
            }
            setProgress(0);
        };

        mediaRecorder.start();

        const startTime = performance.now();

        const captureFrame = () => {
            const elapsed = performance.now() - startTime;
            setProgress(Math.min(99, Math.round((elapsed / DURATION_MS) * 100)));

            if (stream.getVideoTracks()[0]?.requestFrame) {
                stream.getVideoTracks()[0].requestFrame();
            }

            if (elapsed < DURATION_MS) {
                requestAnimationFrame(captureFrame);
            } else {
                mediaRecorder.stop();
            }
        };

        requestAnimationFrame(captureFrame);
    };

    return (
        <div className="fixed inset-0 bg-neutral-900 flex flex-col items-center justify-center font-sans">
            <div className="absolute top-6 z-50 bg-black/80 text-white p-6 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl flex flex-col items-center gap-4 max-w-md">
                <h1 className="text-xl font-bold">Animation Recorder</h1>
                <p className="text-xs text-gray-400">10s capture + auto ffmpeg conversion</p>

                <div className="flex gap-4">
                    <button
                        onClick={() => startRecordingProcess('desktop')}
                        disabled={status.includes('Recording') || status.includes('Warming') || status.includes('Converting')}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg font-medium transition-colors"
                    >
                        Record Desktop
                    </button>
                    <button
                        onClick={() => startRecordingProcess('mobile')}
                        disabled={status.includes('Recording') || status.includes('Warming') || status.includes('Converting')}
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

                {result && (
                    <div className="text-xs text-green-400 text-left w-full mt-2 space-y-1">
                        <p>WebM: <code>{result.webm}</code></p>
                        <p>MP4: <code>{result.mp4}</code></p>
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
