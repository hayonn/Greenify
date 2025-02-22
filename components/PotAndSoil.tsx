import { useGLTF } from "@react-three/drei/native"

export default function PotAndSoil() {
  // GLTF 모델 로드
  const pot = useGLTF(require("../assets/models/pot.gltf"));
  const soil = useGLTF(require("../assets/models/dirt.gltf"));

  return (
    <>
      <primitive
        object={pot.scene}
        position={[0, 0.5, -5]}
        scale={[2, 2, 2]}
        rotation={[0, 0, 0]}
      />
      <primitive
        object={soil.scene}
        position={[0, 0.5, -5]}
        scale={[2, 2, 2]}
        rotation={[0, 0, 0]}
      />
    </>
  );
}
