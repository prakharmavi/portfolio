"use client";

import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    useGLTF,
    useAnimations,
    Bounds,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Hero3DProps = {
    url?: string; // GLB path under /public, e.g., "/me.glb"
    className?: string; // size container
};

function Character({
    url = "/me.glb",
    onMetrics,
}: {
    url?: string;
    onMetrics?: (metrics: {
        height: number;
        centerY: number;
        radius: number;
    }) => void;
}) {
    const group = useRef<THREE.Group>(null);
    const gltf = useGLTF(url);
    const { actions, names, mixer } = useAnimations(gltf.animations, group);

    useEffect(() => {
        if (!actions) return;
        // Play all available clips on loop
        names.forEach((name) => {
            const action = actions[name];
            if (action) {
                action.reset();
                action.setLoop(THREE.LoopRepeat, Infinity);
                action.clampWhenFinished = false;
                action.enabled = true;
                action.fadeIn(0.2).play();
            }
        });

        return () => {
            mixer.stopAllAction();
        };
    }, [actions, names, mixer]);

    useEffect(() => {
        const scene = gltf.scene;
        if (!group.current || !scene) return;
        // Compute bounds to ground the model (feet at y=0)
        const box = new THREE.Box3().setFromObject(scene);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        const sphere = new THREE.Sphere();
        box.getSize(size);
        box.getCenter(center);
        box.getBoundingSphere(sphere);
        group.current.position.y = -box.min.y;
        onMetrics?.({
            height: size.y,
            centerY: center.y,
            radius: sphere.radius,
        });
    }, [gltf, onMetrics]);

    return (
        <group ref={group}>
            <primitive object={gltf.scene} dispose={null} />
        </group>
    );
}

export default function Hero3D({ url = "/me.glb", className }: Hero3DProps) {
    const [targetY, setTargetY] = useState(1);
    const [radius, setRadius] = useState(1.2);
    return (
        <div
            className={`relative rounded-lg border ${
                className ?? "h-[60svh] md:h-[80svh] w-full"
            }`}
        >
            <Canvas
                dpr={[1, 1.5]}
                gl={{ antialias: true, powerPreference: "low-power" }}
                camera={{ position: [0, 1, 2.1], fov: 45 }}
            >
                {/* Single simple light for visibility */}
                <ambientLight intensity={1.5} />
                <Suspense fallback={null}>
                    <Bounds fit clip observe margin={0.85}>
                        <Character
                            url={url}
                            onMetrics={({ height, radius }) => {
                                setTargetY(height * 0.45);
                                setRadius(Math.max(0.5, radius));
                            }}
                        />
                    </Bounds>
                </Suspense>
                <OrbitControls
                    enableDamping
                    makeDefault
                    target={[0, targetY, 0]}
                    enablePan={false}
                    minDistance={radius * 1.8}
                    maxDistance={radius * 3.5}
                    maxPolarAngle={Math.PI * 0.9}
                    minPolarAngle={Math.PI * 0.05}
                />
            </Canvas>
            {/* Tooltip trigger (info) */}
            <div className="pointer-events-none absolute right-2 top-2 z-10">
                <div className="group relative inline-flex items-center gap-1 pointer-events-auto">
                    <span className="sr-only">Model interactions help</span>
                    <div
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-foreground/80 border shadow-sm hover:bg-accent hover:text-foreground transition-colors"
                        aria-describedby="hero3d-tooltip"
                        role="button"
                        tabIndex={0}
                    >
                        {/* Info icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm.75 14.5a.75.75 0 1 1-1.5 0v-5a.75.75 0 1 1 1.5 0v5ZM12 8.25a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75Z" />
                        </svg>
                    </div>
                    {/* Tooltip bubble */}
                    <div
                        id="hero3d-tooltip"
                        role="tooltip"
                        className="pointer-events-none absolute right-0 top-9 w-max max-w-[18rem] rounded-md border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md opacity-0 scale-95 translate-y-[-2px] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:translate-y-0 transition ease-out duration-150"
                    >
                        Drag to rotate. Scroll to zoom.
                    </div>
                </div>
            </div>
        </div>
    );
}

// Optionally preload the default model
useGLTF.preload("/me.glb");
