import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line, Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';

export const NeuralBrain: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const numPoints = 200;
  const { positions, edges } = useMemo(() => {
    const pos = new Float32Array(numPoints * 3);
    const pts: THREE.Vector3[] = [];
    
    // Distribute points spherically but flattened slightly on Y and elongated on Z 
    for (let i = 0; i < numPoints; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = 2.2 * Math.cbrt(Math.random()); 
        
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta) * 0.8;
        const z = r * Math.cos(phi) * 1.2;
        
        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;
        pts.push(new THREE.Vector3(x, y, z));
    }
    
    // Connect nearest neighbors within a distance threshold
    const edgeData: THREE.Vector3[][] = [];
    for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
            if (pts[i].distanceTo(pts[j]) < 0.7) {
                edgeData.push([pts[i], pts[j]]);
            }
        }
    }
    
    return { positions: pos, edges: edgeData };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
        groupRef.current.rotation.y += 0.001; // slow continuous rotation
        
        // Tilt slightly towards cursor mapping coordinates seamlessly mapping screen boundaries to acceptable rads
        const targetX = (state.pointer.y * Math.PI) / 8;
        const targetZ = -(state.pointer.x * Math.PI) / 8;
        
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetZ, 0.05);
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <Points positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#00f0ff"
                size={0.06}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
        
        {edges.map((edge, i) => (
            <Line 
                key={i} 
                points={edge}
                color="#7b2ff7"
                opacity={0.15}
                transparent
                lineWidth={1}
            />
        ))}
      </group>
      
      {/* Postprocessing effects requested by spec */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
        <ChromaticAberration offset={new THREE.Vector2(0.002, 0.002)} />
      </EffectComposer>
    </>
  );
};
