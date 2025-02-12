import { useEffect } from "react";
import { useMap } from "react-leaflet";
import * as THREE from "three";

const ThreeDLayer = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) {
      console.error("❌ Leaflet Map이 아직 준비되지 않음");
      return;
    }

    console.log("🗺️ Leaflet Map 객체:", map);

    // Three.js 컨테이너 생성
    const threeContainer = document.createElement("div");
    threeContainer.style.position = "absolute";
    threeContainer.style.top = "0";
    threeContainer.style.left = "0";
    threeContainer.style.width = "100%";
    threeContainer.style.height = "100%";
    threeContainer.style.pointerEvents = "none"; //지도와의 충돌 방지
    threeContainer.style.zIndex="1000"; // 지도 위에 배치

    map.getContainer().appendChild(threeContainer);
    console.log("✅ Three.js 컨테이너 추가됨");

    // Three.js Scene, Camera, Renderer 생성
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeContainer.appendChild(renderer.domElement);

    console.log("🎨 Three.js Renderer 생성됨:", renderer);

    // WebGL 지원 여부 확인
    if (!renderer.domElement.getContext) {
      console.error("❌ WebGL을 지원하지 않는 환경입니다!");
      return;
    }

    // 3D 오브젝트 추가 (큐브)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    console.log("🟩 3D 큐브 추가됨");

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      console.log("🔄 애니메이션 실행됨");
    };
    animate();

    return () => {
      console.log("🧹 정리됨");
      threeContainer.remove();
    };
  }, [map]);

  return null;
};

export default ThreeDLayer;
