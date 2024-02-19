'use client';
import './cookieclicker.css';
import React, { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { OBJLoader} from 'three-stdlib';

const pointLightColors = ['#ff0051', '#0099ff', '#00ff99', '#ff99ff'];
function ClickableCookie({ url, textureUrl, onClick, onLightChange }) {
    const texture = useLoader(TextureLoader, textureUrl);
    const obj = useLoader(OBJLoader, url);
    const ref = useRef();
    const [scale, setScale] = useState(1);
    const [currentLightIndex, setCurrentLightIndex] = useState(0);

    const handleCookieClick = (event) => {
        event.stopPropagation();
        onClick();
        setScale(1.1); 
        setTimeout(() => setScale(1), 150);

        const nextIndex = (currentLightIndex + 1) % pointLightColors.length;
        setCurrentLightIndex(nextIndex); 
        onLightChange(pointLightColors[nextIndex]);
    };
  
    useEffect(() => {
      // Auto-center the object based on its bounding box
      if (ref.current) {
        ref.current.rotation.y = Math.PI;
        const box = new THREE.Box3().setFromObject(ref.current);
        const center = box.getCenter(new THREE.Vector3());
        ref.current.position.x -= center.x;
        ref.current.position.y -= center.y;
        ref.current.position.z -= center.z;

        
      }
    }, [obj]);
  
    useEffect(() => {
      if (ref.current) {
        // Apply the texture to each child mesh
        ref.current.traverse((child) => {
            if (child.isMesh) {
                const standardMaterial = new THREE.MeshStandardMaterial({
                    map: texture,
                    metalness: 0.4, // Adjust for desired reflectivity
                    roughness: 0.1, // Adjust for desired roughness
                });
                child.material = standardMaterial;
            }
        });
      }
    }, [texture]);
  
    return <primitive ref={ref} object={obj} scale={scale} onClick={handleCookieClick} />;
}

function CameraCenterer() {
    const { camera, scene } = useThree();
    camera.position.z = 5;
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    return null;
}

function PlusOneEffect({ id, onEnd }) {
    const generateRandomPosition = () => {
        const radius = 1; 
        const angle = Math.random() * Math.PI * 2; 
        const x = Math.cos(angle) * radius;
        const y = 1.5
        const z = Math.sin(angle) * radius;
        return [x, y, z]; 
    };

    const [position, setPosition] = useState(generateRandomPosition());
    const [visible, setVisible] = useState(true);
  
    useEffect(() => {
        let timeoutId = setTimeout(() => {
            // Use functional update to ensure we're working with the latest state
            setVisible((vis) => {
                if (vis) {
                    onEnd(id); // Only call onEnd if the text is currently visible
                }
                return false;
            });
        }, 1000);
        let intervalId = setInterval(() => {
        setPosition((prev) => [prev[0], prev[1] + 0.01, prev[2]]);
        }, 16);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };

    }, [id, onEnd]);
  
    if (!visible) return null;
  
    return <Text position={position} fontSize={0.5} color="red">+1</Text>;
  }
  


const CookieClicker = ({ updateScore }) => {
    const [effects, setEffects] = useState([]);
    const [lightColor, setLightColor] = useState(pointLightColors[0]);

    const handleCookieClick = () => {
        updateScore(1);
        const uniqueId = `${Date.now()}-${Math.random()}`;
        setEffects((prevEffects) => [
            ...prevEffects,
            { id: uniqueId, createdAt: Date.now() }
        ]);
    };

    const removeEffect = (effectId) => {
        setEffects((currentEffects) => currentEffects.filter((effect) => effect.id !== effectId));
    };

    return (
        <div className='canvas-wrapper'>
            <Canvas>
                <CameraCenterer/>
                <ambientLight intensity={0.8} />
                <pointLight
                    color={lightColor}
                    position={[0, 5, 5]}
                    decay={-2}
                />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
                <Suspense fallback={null}>
                    <ClickableCookie
                        url="/models/cookie/cookie.obj"
                        textureUrl="/models/cookie/cookie-texture.jpg"
                        onClick={handleCookieClick}
                        onLightChange={setLightColor} 
                    />
                    {effects.map((effect) => (
                        <PlusOneEffect key={effect.id} id={effect.id} onEnd={() => removeEffect(effect.id)} />
                    ))}
                </Suspense>
            </Canvas>
        </div>

    );
};

export default CookieClicker;
