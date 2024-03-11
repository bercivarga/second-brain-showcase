/* eslint-disable react/no-unknown-property */

"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { Mesh } from "three";

import { Button } from "@/components/ui/button";

const PARTICLE_COUNT = 1000;

const SPEED_FAST = 20;
const SPEED_NORMAL = 1;

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

function colorPicker(randomizer: number) {
  switch (true) {
    case randomizer < 0.1:
      return "lightblue";
    case randomizer < 0.2:
      return "lightgreen";
    case randomizer < 0.3:
      return "lightpink";
    case randomizer < 0.4:
      return "lightyellow";
    case randomizer < 0.5:
      return "lightcoral";
    case randomizer < 0.6:
      return "lightseagreen";
    case randomizer < 0.7:
      return "lightcyan";
    case randomizer < 0.8:
      return "lightgoldenrodyellow";
    case randomizer < 0.9:
      return "lightgray";
    default:
      return "lightgrey";
  }
}

function generateParticles() {
  const particles = new Array(PARTICLE_COUNT).fill(null).map(() => {
    const x = (Math.random() - 0.5) * 10;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 20;
    const color = colorPicker(Math.random());

    return { x, y, z, color };
  });

  return particles;
}

function Particle({
  speed,
  particleData,
}: {
  speed: number;
  particleData: ReturnType<typeof generateParticles>[0];
}) {
  const particleRef = useRef<Mesh>(null);

  const { x, y, z, color } = particleData;

  useFrame(() => {
    if (!particleRef.current) return;

    particleRef.current.position.z += 0.01 * speed;

    if (particleRef.current.position.z > 10) {
      particleRef.current.position.x = (Math.random() - 0.5) * 10;
      particleRef.current.position.y = (Math.random() - 0.5) * 10;
      particleRef.current.position.z = Math.min((Math.random() - 0.5) * 10, -5);
    }
  });

  return (
    <mesh ref={particleRef} position={[x, y, z]}>
      <sphereGeometry args={[0.02, 10, 10]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Scene({ buttonHovered }: { buttonHovered: boolean }) {
  const speedRef = useRef(SPEED_NORMAL);

  const particles = useMemo(() => generateParticles(), []);

  useFrame(() => {
    if (buttonHovered) {
      speedRef.current = lerp(speedRef.current, SPEED_NORMAL, 0.1);
    } else {
      speedRef.current = lerp(speedRef.current, SPEED_FAST, 0.1);
    }
  });

  return (
    <>
      {particles.map((particleData, index) => (
        <Particle
          key={index}
          speed={speedRef.current}
          particleData={particleData}
        />
      ))}
    </>
  );
}

export default function LandingBgAnimation({
  isSignedIn,
}: {
  isSignedIn: boolean;
}) {
  const [buttonHovered, setButtonHovered] = useState(false);

  function handleMouseEnter() {
    setButtonHovered(true);
  }

  function handleMouseLeave() {
    setButtonHovered(false);
  }

  const mouseEvents = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <Canvas>
          <color attach="background" args={["#020617"]} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Scene buttonHovered={buttonHovered} />
        </Canvas>
      </div>
      <div className="flex flex-col gap-4 p-6 md:items-center md:text-center">
        <h2 className="text-white">
          Welcome to your
          <br /> Second Brain
        </h2>
        {!isSignedIn && (
          <div className="max-w-lg text-white">
            <p>
              Second Brain is your companion for organizing your thoughts and
              ideas. Collect and visualize your knowledge in one place.
            </p>
            <p>Sign in or sign up in order to explore the app.</p>
          </div>
        )}
        <div className="flex gap-2">
          {isSignedIn ? (
            <Link href="/notes">
              <Button {...mouseEvents}>To notes</Button>
            </Link>
          ) : (
            <>
              <Link href="/sign-in">
                <Button {...mouseEvents}>Sign in</Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outline" {...mouseEvents}>
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
