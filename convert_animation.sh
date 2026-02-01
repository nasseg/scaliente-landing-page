#!/bin/bash

# Default speed up factor (1.0 = normal, 2.0 = 2x faster, etc)
SPEED="${1:-1.0}"
FPS="30"

convert_file() {
    INPUT="$1"
    OUTPUT="${INPUT%.webm}.mp4"

    # Calculate PTS factor (inverse of speed)
    PTS_FACTOR=$(awk "BEGIN {print 1/$SPEED}")

    if [ -f "$INPUT" ]; then
        echo "Processing $INPUT (Speed: ${SPEED}x) to MP4 High Quality..."
        
        # FFmpeg settings for high quality MP4:
        # -c:v libx264 : Best compatibility / performance balance
        # -crf 18      : Visually lossless quality (lower is better, 18-23 is standard range)
        # -preset slow : Better compression efficiency (smaller size for same quality)
        # -pix_fmt yuv420p : Essential for playback on all devices/browsers
        # -an          : Remove audio (silent background)
        # -movflags +faststart : Web optimization (starts playing before full download)

        ffmpeg -y -i "$INPUT" \
            -filter:v "setpts=${PTS_FACTOR}*PTS,fps=$FPS,scale=trunc(iw/2)*2:trunc(ih/2)*2" \
            -c:v libx264 \
            -crf 18 \
            -preset slow \
            -pix_fmt yuv420p \
            -an \
            -movflags +faststart \
            "$OUTPUT"
            
        echo "✅ Created $OUTPUT"
    else
        echo "⚠️  Skipping $INPUT (File not found)"
    fi
}

echo "Starting Batch Conversion to MP4 (High Quality, Speed: ${SPEED}x)..."

convert_file "animation_desktop.webm"
convert_file "animation_mobile.webm"

# Fallback
if [ -f "animation.webm" ]; then
    convert_file "animation.webm"
fi

echo "All done!"
