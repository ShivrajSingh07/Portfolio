import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export const ContactGlobe = () => {
    const sphereRef = useRef<THREE.Mesh>(null);
    
    useFrame(({ clock }) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.y = clock.getElapsedTime() * 0.2;
            sphereRef.current.rotation.x = clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <Sphere args={[2.5, 32, 32]} ref={sphereRef}>
            <meshBasicMaterial 
                color="#00f0ff" 
                wireframe={true} 
                transparent 
                opacity={0.15} 
            />
        </Sphere>
    );
}
