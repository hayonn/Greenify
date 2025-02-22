import { DoubleSide } from "three";

function Floor() {
  return (
    <mesh rotation-x={-Math.PI / 2}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial color={0x8b4513} />
    </mesh>
  );
}

function Wall() {
  return (
    <mesh position={[0, 10, -10]} rotation-y={0}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial attach="material" color="lightblue" side={DoubleSide}/>
    </mesh>
  );
}

export default function Room(){
    return(
        <>
            <Floor />
            <Wall />
        </>
        )
}