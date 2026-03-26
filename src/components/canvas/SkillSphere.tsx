import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useCursorStore } from '../../stores/useCursorStore';

interface SkillSphereProps {
    skills: string[];
}

export const SkillSphere: React.FC<SkillSphereProps> = ({ skills }) => {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState<string | null>(null);
    const setCursor = useCursorStore((state: any) => state.setVariant);

    // Generate fibrous spherical coordinates
    const words = useMemo(() => {
        const count = skills.length;
        const radius = 3;
        const temp: { position: [number, number, number], word: string }[] = [];
        
        const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
        
        for (let i = 0; i < count; i++) {
            const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
            const r = Math.sqrt(1 - y * y); // radius at y
            
            const theta = phi * i; // golden angle increment
            
            const x = Math.cos(theta) * r;
            const z = Math.sin(theta) * r;
            
            temp.push({ 
                position: [x * radius, y * radius, z * radius], 
                word: skills[i] 
            });
        }
        return temp;
    }, [skills]);

    useFrame(() => {
        if (groupRef.current && !hovered) {
            groupRef.current.rotation.y += 0.002;
            groupRef.current.rotation.x += 0.001;
        }
    });

    return (
        <group ref={groupRef}>
            {words.map(({ position, word }, i) => (
                <Word 
                    key={i} 
                    position={position} 
                    word={word} 
                    hovered={hovered === word}
                    onHover={(state: boolean) => {
                        setHovered(state ? word : null);
                        setCursor(state ? 'hover' : '3d');
                    }}
                />
            ))}
        </group>
    );
};

const Word = ({ position, word, hovered, onHover }: any) => {
    const scale = hovered ? 1.5 : 1;
    const ref = useRef<any>(null);

    useFrame(({ camera }) => {
        if (ref.current) {
            ref.current.quaternion.copy(camera.quaternion); // Always face camera
            ref.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
            ref.current.color = new THREE.Color(hovered ? "#00f0ff" : "white");
            ref.current.material.opacity = THREE.MathUtils.lerp(ref.current.material.opacity, hovered ? 1 : 0.6, 0.1);
        }
    });

    return (
        <Text
            ref={ref}
            position={position}
            fontSize={0.3}
            letterSpacing={0.05}
            onPointerOver={(e) => { e.stopPropagation(); onHover(true); }}
            onPointerOut={() => onHover(false as any)}
            material-toneMapped={false}
        >
            {word}
        </Text>
    );
};
