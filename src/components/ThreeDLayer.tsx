import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useMap } from "react-leaflet";

const objectPositions = [
  { lat: 37.5665, lng: 126.9780 }, // 서울
  { lat: 35.1796, lng: 129.0756 }, // 부산
  { lat: 37.4563, lng: 126.7052 }, // 인천
];

const ThreeDLayer = () => {
  const map = useMap();
  const threeContainerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);

  useEffect(() => {
    if (!threeContainerRef.current) return;

    console.log("🗺️ Leaflet 지도 객체:", map);

    // 🌍 Three.js 기본 설정
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    console.log("✅ Three.js 씬 생성됨");

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 500);
    cameraRef.current = camera;
    console.log("🎥 Three.js 카메라 설정 완료");

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "1000"; // 🟢 지도 위로 배치
    renderer.domElement.style.pointerEvents = "none"; // 📌 지도 이벤트 충돌 방지

    threeContainerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    console.log("🎨 Three.js 렌더러 생성 완료");

    // 🏗️ 3D 오브젝트 추가
    const geometry = new THREE.BoxGeometry(50, 50, 50);
    const material = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });

    objectPositions.forEach(({ lat, lng }, index) => {
      const point = map.latLngToLayerPoint([lat, lng]); // 🟢 Leaflet 좌표 변환
      console.log(`📌 변환된 좌표 (${index + 1}): 위도 ${lat}, 경도 ${lng} → 픽셀 좌표 (${point.x}, ${point.y})`);

      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(point.x - width / 2, -point.y + height / 2, 0); // 📌 Three.js 좌표 적용
      scene.add(cube);
      console.log(`🟩 3D 큐브 추가됨 (${index + 1}): Three.js 좌표 (${cube.position.x}, ${cube.position.y}, ${cube.position.z})`);
    });

    // 🎥 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      console.log("🔄 애니메이션 프레임 실행됨");
    };
    animate();

    return () => {
      console.log("🧹 Three.js 정리됨");
      if (threeContainerRef.current) {
        threeContainerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [map]);

  return <div ref={threeContainerRef} className="three-container"></div>;
};

export default ThreeDLayer;
