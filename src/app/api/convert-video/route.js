import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { execSync } from 'child_process';
import path from 'path';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('video');
        const rawMode = formData.get('mode') || 'mobile';

        // Whitelist mode to prevent command injection
        const allowedModes = ['mobile', 'desktop'];
        const mode = allowedModes.includes(rawMode) ? rawMode : 'mobile';

        if (!file) {
            return NextResponse.json({ error: 'No video file' }, { status: 400 });
        }

        // Validate file size (50MB max)
        const buffer = Buffer.from(await file.arrayBuffer());
        if (buffer.length > 50 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large' }, { status: 400 });
        }

        const outputDir = path.join(process.cwd(), 'public');
        const webmPath = path.join(outputDir, `bg_effect_${mode}.webm`);
        const mp4Path = path.join(outputDir, `bg_effect_${mode}.mp4`);

        // Save webm
        await writeFile(webmPath, buffer);

        // Convert to MP4 — straight conversion, no crossfade
        execSync(
            `ffmpeg -y -i "${webmPath}" -c:v libx264 -crf 26 -preset slow -vf "fps=60,pad=ceil(iw/2)*2:ceil(ih/2)*2" -an -movflags +faststart "${mp4Path}"`,
            { timeout: 120000 }
        );

        // Clean up webm
        execSync(`rm "${webmPath}"`);

        return NextResponse.json({
            success: true,
            mp4: `/bg_effect_${mode}.mp4`,
        });
    } catch (err) {
        console.error('Video conversion error:', err);
        return NextResponse.json({ error: 'Video conversion failed' }, { status: 500 });
    }
}
