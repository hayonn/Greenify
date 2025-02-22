import useControls from "r3f-native-orbitcontrols"
import { useState,Suspense } from "react"
import { View } from 'react-native';
import { Canvas } from "@react-three/fiber/native"
import { PerspectiveCamera,Mesh,DoubleSide } from "three"
import Room from './components/Room'
import PotAndSoil from './components/PotAndSoil'
import { Environment } from "@react-three/drei/native";


export default function HomeScreen() {
  const [OrbitControls, events] = useControls()
  
  return (
    <View style={{ flex: 1 }} {...events}>
      <Canvas camera={{ position: [0, 5, 20], fov: 50, near: 1, far: 100 }}>
        <OrbitControls/>
        <directionalLight 
        position={[5, 10, 5]} // 조명의 위치
        intensity={1}         // 조명의 강도
        castShadow            // 그림자를 활성화
        />
        <ambientLight />
        <Room/>
        <PotAndSoil/>
      </Canvas>
    </View>
  )
}