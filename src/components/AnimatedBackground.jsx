'use client';
import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let gradientAngle = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener('resize', resize);

        // Particle class
        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.color = Math.random() > 0.5 ? '249, 115, 22' : '255, 255, 255'; // Orange or white
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Create particles
        const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Gradient orbs
        const orbs = [
            { x: 0.3, y: 0.3, radius: 0.4, color: 'rgba(249, 115, 22, 0.15)', speed: 0.0003 },
            { x: 0.7, y: 0.6, radius: 0.35, color: 'rgba(249, 115, 22, 0.1)', speed: 0.0004 },
            { x: 0.5, y: 0.8, radius: 0.3, color: 'rgba(251, 146, 60, 0.08)', speed: 0.0002 },
        ];

        let time = 0;

        const animate = () => {
            time += 1;

            // Clear with dark background
            ctx.fillStyle = 'rgba(9, 9, 11, 1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw animated gradient orbs
            orbs.forEach((orb, index) => {
                const offsetX = Math.sin(time * orb.speed + index) * 100;
                const offsetY = Math.cos(time * orb.speed * 1.5 + index) * 80;

                const gradient = ctx.createRadialGradient(
                    orb.x * canvas.width + offsetX,
                    orb.y * canvas.height + offsetY,
                    0,
                    orb.x * canvas.width + offsetX,
                    orb.y * canvas.height + offsetY,
                    orb.radius * Math.max(canvas.width, canvas.height)
                );

                gradient.addColorStop(0, orb.color);
                gradient.addColorStop(1, 'rgba(9, 9, 11, 0)');

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });

            // Draw flowing lines
            ctx.strokeStyle = 'rgba(249, 115, 22, 0.03)';
            ctx.lineWidth = 1;

            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                const startY = (canvas.height / 6) * (i + 1);
                ctx.moveTo(0, startY + Math.sin(time * 0.002 + i) * 50);

                for (let x = 0; x < canvas.width; x += 50) {
                    const y = startY + Math.sin((x * 0.003) + time * 0.002 + i) * 50;
                    ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections between nearby particles
            ctx.strokeStyle = 'rgba(249, 115, 22, 0.05)';
            ctx.lineWidth = 0.5;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.globalAlpha = (1 - distance / 150) * 0.3;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
};

export default AnimatedBackground;
