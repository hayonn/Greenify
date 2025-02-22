import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber/native";
import { Dimensions } from "react-native";
import { DoubleSide, Vector2 } from "three";

export function WindowFrame() {
  return (
    <mesh position={[0, 4, -10]}>
      {/* 창틀 프레임 */}
      <boxGeometry args={[10, 6, 0.2]} />
      <meshStandardMaterial color="brown" />
    </mesh>
  );
}

export function WindowShader() {
  const shaderRef = useRef();
  const startTime = useRef(Date.now());

  // React Native에서 화면 크기 가져오기
  const { width, height } = Dimensions.get("window");

  useFrame(() => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = (Date.now() - startTime.current) / 1000;
      shaderRef.current.uniforms.uResolution.value = new Vector2(width, height);
    }
  });

  return (
    <mesh position={[0, 4, -9.9]}>
      {/* 창 내부 평면 */}
      <planeGeometry args={[9.5, 5.5]} />
      <shaderMaterial
        ref={shaderRef}
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: new Vector2(width, height) },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={DoubleSide}
      />
    </mesh>
  );
}

// Vertex Shader (기본 설정)
const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment Shader (구름 애니메이션 예시)
const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;

// 노이즈 함수
float noise(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// 구름 효과 생성
float cloud(vec2 p) {
  float n = 0.0;
  float scale = 1.0;
  for (int i = 0; i < 5; i++) {
    n += noise(p * scale) / scale;
    scale *= 2.0;
  }
  return n;
}

void main() {
  vec2 uv = vUv * uResolution / min(uResolution.x, uResolution.y);
  float c = cloud(uv + uTime * 0.1);
  gl_FragColor = vec4(vec3(c), 1.0);
}
`;

