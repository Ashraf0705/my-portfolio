// src/components/Scene.js
'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot } from '@react-three/drei';
import styled from 'styled-components';
import { colors } from '@/styles/theme';
import * as THREE from 'three';

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

function AnimatedModel() {
  // useRef gives us direct access to the 3D mesh
  const modelRef = useRef();

  // useFrame is a hook that runs on every rendered frame (60fps)
  useFrame((state, delta) => {
    if (modelRef.current) {
      // Constant rotation
      modelRef.current.rotation.x += delta * 0.1;
      modelRef.current.rotation.y += delta * 0.2;

      // Make it react to mouse movement
      const { x, y } = state.mouse;
      // Use THREE.MathUtils.lerp for smooth transitions
      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        modelRef.current.rotation.x + y * 0.1,
        0.05
      );
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        modelRef.current.rotation.y + x * 0.2,
        0.05
      );
    }
  });

  return (
    // We use the pre-built TorusKnot component from Drei for convenience
    <TorusKnot ref={modelRef} args={[0.8, 0.25, 200, 20]}>
      <meshStandardMaterial
        color={colors.accent}
        metalness={0.6}
        roughness={0.2}
      />
    </TorusKnot>
  );
}

const Scene = () => {
  return (
    <CanvasContainer>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <AnimatedModel />
      </Canvas>
    </CanvasContainer>
  );
};

export default Scene;