// src/components/InteractiveBackground.js
'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background: radial-gradient(circle at 20% 80%, rgba(0, 191, 255, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(0, 191, 255, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(0, 191, 255, 0.1) 0%, transparent 50%),
              linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%);
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const lightningRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.life = Math.random() * 200 + 100;
        this.maxLife = this.life;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        // Mouse attraction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          this.vx += dx * force * 0.0001;
          this.vy += dy * force * 0.0001;
        }

        // Boundary wrapping
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Fade out
        this.opacity = (this.life / this.maxLife) * 0.5;
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#00BFFF';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00BFFF';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Lightning system
    class Lightning {
      constructor(startX, startY, endX, endY) {
        this.points = [];
        this.opacity = 1;
        this.life = 30;
        this.maxLife = this.life;
        
        // Generate lightning path
        this.generatePath(startX, startY, endX, endY);
      }

      generatePath(startX, startY, endX, endY) {
        const segments = 8;
        const roughness = 50;
        
        this.points.push({ x: startX, y: startY });
        
        for (let i = 1; i < segments; i++) {
          const progress = i / segments;
          const x = startX + (endX - startX) * progress + (Math.random() - 0.5) * roughness;
          const y = startY + (endY - startY) * progress + (Math.random() - 0.5) * roughness;
          this.points.push({ x, y });
        }
        
        this.points.push({ x: endX, y: endY });
      }

      update() {
        this.life--;
        this.opacity = this.life / this.maxLife;
      }

      draw(ctx) {
        if (this.points.length < 2) return;

        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = '#00BFFF';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00BFFF';
        
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        
        for (let i = 1; i < this.points.length; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        
        ctx.stroke();
        ctx.restore();
      }
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 100; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    // Generate lightning
    const generateLightning = () => {
      if (Math.random() < 0.02) { // 2% chance per frame
        const side = Math.floor(Math.random() * 4);
        let startX, startY, endX, endY;
        
        switch (side) {
          case 0: // Left side
            startX = 0;
            startY = Math.random() * height;
            endX = width * 0.3;
            endY = Math.random() * height;
            break;
          case 1: // Right side
            startX = width;
            startY = Math.random() * height;
            endX = width * 0.7;
            endY = Math.random() * height;
            break;
          case 2: // Top
            startX = Math.random() * width;
            startY = 0;
            endX = Math.random() * width;
            endY = height * 0.3;
            break;
          case 3: // Bottom
            startX = Math.random() * width;
            startY = height;
            endX = Math.random() * width;
            endY = height * 0.7;
            break;
        }
        
        lightningRef.current.push(new Lightning(startX, startY, endX, endY));
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        particle.update();
        particle.draw(ctx);
        
        if (particle.life <= 0) {
          particlesRef.current[index] = new Particle();
        }
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.save();
            ctx.globalAlpha = (100 - distance) / 100 * 0.1;
            ctx.strokeStyle = '#00BFFF';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Generate and update lightning
      generateLightning();
      lightningRef.current.forEach((lightning, index) => {
        lightning.update();
        lightning.draw(ctx);
        
        if (lightning.life <= 0) {
          lightningRef.current.splice(index, 1);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // Touch tracking for mobile
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <BackgroundContainer>
      <Canvas ref={canvasRef} />
    </BackgroundContainer>
  );
};

export default InteractiveBackground;

