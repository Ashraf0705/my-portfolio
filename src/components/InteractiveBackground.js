// src/components/InteractiveBackground.js
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import styled from 'styled-components';
import { colors } from '@/styles/theme';
import * as THREE from 'three';

// --- THE DEFINITIVE, HIGH-IMPACT SHADER ---
const vertexShader = `
  uniform vec2 u_mouse;
  uniform float u_time;

  attribute vec3 a_velocity;
  attribute float a_size;
  
  varying float v_intensity;

  void main() {
    vec3 pos = position;
    
    // Calculate distance and direction from mouse
    float dist = distance(pos.xy, u_mouse);
    vec2 dir = normalize(u_mouse - pos.xy);
    
    // The core "comet tail" logic
    float force = max(0.0, 1.0 - dist * 2.0); // Stronger pull closer to the mouse
    vec3 velocity = a_velocity + vec3(dir * force * 0.1, 0.0);
    
    // Friction to slow down
    velocity *= 0.96;
    pos += velocity;

    // Intensity for brightness
    v_intensity = force;

    vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = a_size * (15.0 / -modelViewPosition.z);
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

const fragmentShader = `
  uniform vec3 u_color;
  varying float v_intensity;

  void main() {
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - step(0.5, strength);
    
    // Mix between white (distant) and accent color (close)
    vec3 color = mix(vec3(1.0), u_color, v_intensity * 2.0);
    
    gl_FragColor = vec4(color, strength * (v_intensity * 0.8 + 0.1));
  }
`;

function CosmicDust() {
  const pointsRef = useRef();
  const { viewport } = useThree();

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_color: { value: new THREE.Color(colors.accent) },
  }), []);

  const { particles, velocities, sizes } = useMemo(() => {
    const count = 20000; // MASSIVE number of particles
    const particles = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      particles[i * 3 + 0] = (Math.random() - 0.5) * viewport.width * 2.5;
      particles[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2.5;
      particles[i * 3 + 2] = 0;
      velocities[i * 3 + 0] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
      sizes[i] = 1.0 + Math.random();
    }
    return { particles, velocities, sizes };
  }, [viewport]);

  useFrame((state) => {
    const { clock, mouse } = state;
    if (pointsRef.current) {
      pointsRef.current.material.uniforms.u_time.value = clock.getElapsedTime();
      pointsRef.current.material.uniforms.u_mouse.value.lerp(new THREE.Vector2(mouse.x * viewport.width / 2, mouse.y * viewport.height / 2), 0.1);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
        <bufferAttribute attach="attributes-a_velocity" count={velocities.length / 3} array={velocities} itemSize={3} />
        <bufferAttribute attach="attributes-a_size" count={sizes.length} array={sizes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; // THE KEY: Place it behind all other content
`;

const InteractiveBackground = () => {
  return (
    <CanvasContainer>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <CosmicDust />
      </Canvas>
    </CanvasContainer>
  );
};

export default InteractiveBackground;