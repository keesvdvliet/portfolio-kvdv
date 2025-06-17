//React dependicies
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useLayoutEffect } from "react";
import { useTransform, useScroll, useTime } from "framer-motion";
import { degreesToRadians, progress, mix } from "popmotion";
import { TextureLoader } from "three";

//Import the component styling
import "../css/components/solarSystem.scss";

//Import textures
import sunTexture from "../../public/textures/sun_texture.jpg";
import earthTexture from "../../public/textures/earth_texture.jpg";
import marsTexture from "../../public/textures/mars_texture.jpg";
import uranusTexture from "../../public/textures/uranus_texture.jpg";
import ringsTexture from "../../public/textures/rings_texture.png";

//Define planets (texture / size / distance / rotationspeed )
const planets = {
  earth: [earthTexture, 0.25, 0.35, 0.025, false],
  mars: [marsTexture, 0.09, 0.95, 0.045, false],
  uranus: [uranusTexture, 0.3, 0.7, 0.035, true],
};

function Sun() {
  //Create the texture map
  const sunMap = useLoader(TextureLoader, sunTexture);

  //Render the sun
  return (
    <>
      <mesh rotation-x={0}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial map={sunMap} />
      </mesh>
    </>
  );
}

function Planet({ name }) {
  //Set the reference value for this planet
  const planetRef = useRef(null);
  const ringsRef = useRef(null);
  const planetData = planets[name];

  //Create the texture map
  const planetTexture = planetData[0];
  const planetMap = useLoader(TextureLoader, planetTexture);

  //Create a ring texture map
  const ringMap = useLoader(TextureLoader, ringsTexture);

  //Set the location and size parameters
  const planetSize = planetData[1];
  const planetDistance = planetData[2];
  const planetRotation = planetData[3];
  const planetRings = planetData[4];

  //Set time
  const time = useTime();

  //Function that sets the planets position in space
  useFrame(() => {
    const distanceFromSun = mix(1, 3.5, planetDistance);
    planetRef.current &&
      planetRef.current.position.setFromSphericalCoords(
        distanceFromSun,
        degreesToRadians(90),
        degreesToRadians(time.get() * -planetRotation)
      );

    //If this planet has rings, render them
    if (planetRings) {
      const distanceFromSun = mix(1, 3.5, planetDistance);
      ringsRef.current &&
        ringsRef.current.position.setFromSphericalCoords(
          distanceFromSun,
          degreesToRadians(90),
          degreesToRadians(time.get() * -planetRotation)
        );
    }
  });

  //Render this planet
  return (
    <>
      <mesh ref={planetRef} rotation-x={0}>
        <sphereGeometry args={[planetSize, 32, 16]} />
        <meshStandardMaterial map={planetMap} />
      </mesh>

      {planetRings && (
        <mesh ref={ringsRef} rotation-x={degreesToRadians(10)}>
          <cylinderGeometry
            args={[planetSize + 0.15, planetSize + 0.15, 0.01, 32]}
          />
          <meshStandardMaterial map={ringMap} transparent={true} />
        </mesh>
      )}
    </>
  );
}

function Star({ no }) {
  //Set the reference value for this star
  const starRef = useRef(null);

  //Function that sets the stars in a random position in space
  useLayoutEffect(() => {
    const distanceFromSun = mix(2, 3.5, Math.random());
    const y = mix(degreesToRadians(80), degreesToRadians(100), Math.random());
    const x = degreesToRadians(360) * no;

    starRef.current &&
      starRef.current.position.setFromSphericalCoords(distanceFromSun, y, x);
  });

  //Render this star
  return (
    <>
      <mesh ref={starRef}>
        <octahedronGeometry args={[0.01]} />
        <meshBasicMaterial color={"white"} />
      </mesh>
    </>
  );
}

function Scene({ scrollProgress }) {
  //Create the GL layer
  const gl = useThree((state) => state.gl);

  const yAngle = useTransform(
    scrollProgress,
    [0, 1],
    [0.001, degreesToRadians(180)]
  );
  const distance = useTransform(scrollProgress, [0, 1], [10, 5]);
  const time = useTime();

  //Camera object for the 3D scene (this is manipulated by the scroll progress)
  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      distance.get(), //Distance forwards / zoom
      degreesToRadians(-50) + yAngle.get(), //Y angle of the camera
      time.get() * 0.0005 //Rotation (we use this for the rotating stars FX)
    );
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  });

  //Create random star objects by for looping
  const stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push(<Star key={`star_${i}`} no={progress(0, 100, i)} />);
  }

  //Set pixel ratio
  useLayoutEffect(() => gl.setPixelRatio(1));

  //Render the full scene and add light object to it
  return (
    <>
      <ambientLight intensity={1} color={"white"} />

      <Sun />

      <Planet name={"earth"} />
      <Planet name={"mars"} />
      <Planet name={"uranus"} />

      {stars}
    </>
  );
}

export default function SolarSystem() {
  const sceneRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end end"],
  });

  return (
    <>
      <div className="solarSystem">
        <Canvas gl={{ antialias: false }}>
          <Scene scrollProgress={scrollYProgress} />
        </Canvas>
      </div>

      <div ref={sceneRef} className="solarScrollStretcher"></div>
    </>
  );
}
