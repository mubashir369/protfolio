"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

function StarField(props: any) {
  const ref = useRef<THREE.Points>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [gyroCoords, setGyroCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null && isMobile) {
        // gamma is left/right [-90, 90], beta is front/back [-180, 180]
        const targetX = (e.gamma / 45) * (Math.PI / 4); 
        // Assume holding phone at ~45deg angle naturally
        const targetY = ((e.beta - 45) / 45) * (Math.PI / 4);
        setGyroCoords({ x: targetX, y: targetY });
      }
    };

    if (typeof window.DeviceOrientationEvent !== "undefined") {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [isMobile]);

  // Custom random point generation within a sphere, optimizing dynamically for mobile
  const sphere = useMemo(() => {
    const count = isMobile ? 2000 : 5000;
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = Math.cbrt(Math.random()) * 1.5;
        p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [isMobile]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
      
      let targetX = 0;
      let targetY = 0;

      if (isMobile) {
        // Gyroscope tracking for mobile
        targetX = gyroCoords.x;
        targetY = gyroCoords.y;
      } else {
        // Mouse tracking for desktop
        targetX = (state.pointer.x * Math.PI) / 4;
        targetY = (state.pointer.y * Math.PI) / 4;
      }
      
      ref.current.rotation.y += 0.05 * (targetX - ref.current.rotation.y);
      ref.current.rotation.x += 0.05 * (targetY - ref.current.rotation.x);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color={props.color || "#3b82f6"}
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Hero3D() {
  const { resolvedTheme } = useTheme();
  const particleColor = resolvedTheme === "light" ? "#3b82f6" : "#60a5fa";

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarField color={particleColor} />
      </Canvas>
    </div>
  );
}
