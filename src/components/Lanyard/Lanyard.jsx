/* eslint-disable react/no-unknown-property */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture, Environment } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 16], gravity = [0, -40, 0], fov = 20, transparent = true, cardImage = null, ropeLength = 0.5 }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full relative z-30 pointer-events-none">
      <Canvas
        camera={{ position: position, fov: fov }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        className="pointer-events-auto"
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Physics interpolate gravity={gravity} timeStep={1 / 60}>
          <Band transparent={transparent} cardImage={cardImage} ropeLength={ropeLength} />
        </Physics>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 10, transparent = true, cardImage = null, ropeLength = 0.5 }) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 };
  const { nodes, materials } = useGLTF('/card.glb');
  
  // Create a profile material if image is provided
  const profileTexture = cardImage ? useTexture(cardImage) : null;
  if (profileTexture) {
    profileTexture.wrapS = THREE.RepeatWrapping;
    profileTexture.wrapT = THREE.RepeatWrapping;
  }


  const [cursorHovered, setCursorHovered] = useState(false);

  useEffect(() => {
    if (cursorHovered) {
      document.body.style.cursor = 'grab';
    } else {
      document.body.style.cursor = 'auto';
    }
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [cursorHovered]);

  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], ropeLength]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], ropeLength]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], ropeLength]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  const texture = useTexture('/lanyard.png');
  const photoTexture = useTexture(cardImage || '/lanyard.png');
  
  const hasPhoto = !!cardImage;
  
  // Compute exact card bounds from GLB geometry
  const cardBounds = React.useMemo(() => {
    const geo = nodes.card.geometry;
    geo.computeBoundingBox();
    const bb = geo.boundingBox;
    const w = bb.max.x - bb.min.x;
    const h = bb.max.y - bb.min.y;
    const cx = (bb.max.x + bb.min.x) / 2;
    const cy = (bb.max.y + bb.min.y) / 2;
    return { w, h, cx, cy };
  }, [nodes.card.geometry]);

  if (hasPhoto) {
    photoTexture.colorSpace = THREE.SRGBColorSpace;
    // Center-crop the photo to fit the card aspect ratio
    const cardAspect = cardBounds.w / cardBounds.h;
    if (photoTexture.image) {
      const imgAspect = photoTexture.image.width / photoTexture.image.height;
      if (imgAspect > cardAspect) {
        photoTexture.repeat.set(cardAspect / imgAspect, 1);
        photoTexture.offset.set((1 - cardAspect / imgAspect) / 2, 0);
      } else {
        photoTexture.repeat.set(1, imgAspect / cardAspect);
        photoTexture.offset.set(0, (1 - imgAspect / cardAspect) / 2);
      }
    }
  }



  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            {hasPhoto ? (
              <group>
                {/* White card border using original GLB geometry */}
                <mesh geometry={nodes.card.geometry}>
                  <meshBasicMaterial map={materials.base.map} toneMapped={false} />
                </mesh>
                {/* Photo inset inside the border */}
                <mesh position={[cardBounds.cx, cardBounds.cy, 0.01]}>
                  <planeGeometry args={[cardBounds.w * 0.88, cardBounds.h * 0.88]} />
                  <meshBasicMaterial map={photoTexture} toneMapped={false} />
                </mesh>
              </group>
            ) : (
              <mesh geometry={nodes.card.geometry}>
                <meshBasicMaterial map={materials.base.map} />
              </mesh>
            )}
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
