import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { HomeSceneMode } from "./HomeAtmosphere";

const sceneModes: HomeSceneMode[] = ["dojo", "history", "world", "aurora"];
const sceneAccents: Record<HomeSceneMode, number> = {
  dojo: 0xb68e59,
  history: 0x9a4938,
  world: 0x8d9b80,
  aurora: 0x9b6550,
};

function addInkMountain(
  group: THREE.Group,
  points: [number, number][],
  color: number,
  opacity: number,
  z: number,
) {
  const shape = new THREE.Shape();
  shape.moveTo(-8, -5);
  points.forEach(([x, y], index) => {
    if (index === 0) shape.lineTo(x, y);
    else shape.quadraticCurveTo(
      (points[index - 1]![0] + x) / 2,
      (points[index - 1]![1] + y) / 2 + 0.12,
      x,
      y,
    );
  });
  shape.lineTo(8, -5);
  shape.closePath();

  const mountain = new THREE.Mesh(
    new THREE.ShapeGeometry(shape, 24),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
  );
  mountain.position.z = z;
  group.add(mountain);
}

function addInkLandscape(group: THREE.Group, accent: number) {
  const sun = new THREE.Mesh(
    new THREE.CircleGeometry(1.08, 48),
    new THREE.MeshBasicMaterial({
      color: 0x9c4938,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    }),
  );
  sun.position.set(3.6, 1.5, -4.8);
  group.add(sun);

  addInkMountain(
    group,
    [
      [-8, -1.9],
      [-6.4, 0.2],
      [-5.5, -0.45],
      [-3.6, 1.35],
      [-2.1, -0.2],
      [0.2, 1.05],
      [2.2, -0.42],
      [4.1, 0.65],
      [6.2, -0.38],
      [8, 0.5],
    ],
    0x5e655e,
    0.28,
    -4.2,
  );
  addInkMountain(
    group,
    [
      [-8, -2.9],
      [-6.6, -1.2],
      [-5.1, -1.75],
      [-3.4, -0.8],
      [-1.8, -1.85],
      [0, -0.9],
      [2.2, -1.65],
      [4.2, -0.9],
      [6.4, -1.65],
      [8, -0.85],
    ],
    accent,
    0.2,
    -3.5,
  );

  const ridgelinePoints = [
    new THREE.Vector3(-8, -2.7, -2.8),
    new THREE.Vector3(-5.7, -1.35, -2.8),
    new THREE.Vector3(-4.3, -1.8, -2.8),
    new THREE.Vector3(-2.2, -0.75, -2.8),
    new THREE.Vector3(-0.3, -1.65, -2.8),
    new THREE.Vector3(1.8, -0.9, -2.8),
    new THREE.Vector3(4, -1.7, -2.8),
    new THREE.Vector3(6.1, -1, -2.8),
    new THREE.Vector3(8, -1.8, -2.8),
  ];
  const brushLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(ridgelinePoints),
    new THREE.LineBasicMaterial({
      color: 0xd6c9b3,
      transparent: true,
      opacity: 0.2,
    }),
  );
  group.add(brushLine);
}

function addCylinderSegment(
  group: THREE.Group,
  start: THREE.Vector3,
  end: THREE.Vector3,
  radius: number,
  material: THREE.Material,
) {
  const direction = end.clone().sub(start);
  const length = direction.length();
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.82, radius, length, 10, 1),
    material,
  );
  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.normalize(),
  );
  group.add(mesh);
  return mesh;
}

function addTaekwondoPractitioner(group: THREE.Group) {
  const figure = new THREE.Group();
  figure.position.set(3.05, -1.5, 0.1);
  figure.scale.setScalar(1.22);
  group.add(figure);

  const dobok = new THREE.MeshStandardMaterial({
    color: 0xe1d9c7,
    roughness: 0.94,
    metalness: 0,
  });
  const shadow = new THREE.MeshStandardMaterial({
    color: 0x373634,
    roughness: 0.95,
    metalness: 0,
  });
  const belt = new THREE.MeshStandardMaterial({
    color: 0x842d27,
    roughness: 0.8,
  });
  const skin = new THREE.MeshStandardMaterial({
    color: 0x96745d,
    roughness: 0.95,
  });
  const dark = new THREE.MeshStandardMaterial({
    color: 0x282a29,
    roughness: 0.95,
  });

  const torso = new THREE.Mesh(
    new THREE.CylinderGeometry(0.38, 0.53, 1.12, 8),
    dobok,
  );
  torso.position.set(0, 0.82, 0);
  torso.rotation.z = -0.12;
  figure.add(torso);

  const collar = new THREE.Mesh(
    new THREE.ConeGeometry(0.24, 0.52, 4, 1, true),
    shadow,
  );
  collar.position.set(0, 1.07, 0.27);
  collar.rotation.set(0.18, Math.PI / 4, -0.14);
  figure.add(collar);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 12), skin);
  head.position.set(0.01, 1.67, 0);
  head.scale.set(0.84, 1.08, 0.83);
  figure.add(head);

  const beltBand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.46, 0.49, 0.105, 8),
    belt,
  );
  beltBand.position.set(0, 0.39, 0);
  figure.add(beltBand);
  addCylinderSegment(
    figure,
    new THREE.Vector3(0.19, 0.38, 0.18),
    new THREE.Vector3(0.51, 0.01, 0.2),
    0.055,
    belt,
  );
  addCylinderSegment(
    figure,
    new THREE.Vector3(-0.12, 0.38, 0.18),
    new THREE.Vector3(-0.38, 0.1, 0.2),
    0.055,
    belt,
  );

  const shoulder = new THREE.Vector3(0, 1.18, 0);
  const leftElbow = new THREE.Vector3(-0.58, 0.74, 0);
  const leftHand = new THREE.Vector3(-0.84, 1.02, 0.16);
  const rightElbow = new THREE.Vector3(0.53, 1.43, 0);
  const rightHand = new THREE.Vector3(0.18, 1.49, 0.29);
  addCylinderSegment(figure, shoulder, leftElbow, 0.19, dobok);
  addCylinderSegment(figure, leftElbow, leftHand, 0.12, skin);
  addCylinderSegment(figure, shoulder, rightElbow, 0.19, dobok);
  addCylinderSegment(figure, rightElbow, rightHand, 0.12, skin);

  const hip = new THREE.Vector3(0, 0.23, 0);
  const plantedKnee = new THREE.Vector3(-0.28, -0.62, 0.08);
  const plantedAnkle = new THREE.Vector3(-0.43, -1.49, 0.1);
  addCylinderSegment(figure, hip, plantedKnee, 0.24, dobok);
  addCylinderSegment(figure, plantedKnee, plantedAnkle, 0.16, dobok);
  addCylinderSegment(
    figure,
    plantedAnkle,
    new THREE.Vector3(-0.58, -1.56, 0.24),
    0.14,
    dark,
  );

  const kickLeg = new THREE.Group();
  kickLeg.position.copy(hip);
  figure.add(kickLeg);
  const kickKnee = new THREE.Vector3(0.47, -0.19, 0.08);
  const kickAnkle = new THREE.Vector3(1.32, 0.01, 0.1);
  const hipOrigin = new THREE.Vector3(0, 0, 0);
  const localKickKnee = kickKnee.clone().sub(hip);
  const localKickAnkle = kickAnkle.clone().sub(hip);
  addCylinderSegment(kickLeg, hipOrigin, localKickKnee, 0.24, dobok);
  addCylinderSegment(kickLeg, localKickKnee, localKickAnkle, 0.15, dobok);
  addCylinderSegment(
    kickLeg,
    localKickAnkle,
    new THREE.Vector3(1.59, 0.1, 0.1).sub(hip),
    0.13,
    shadow,
  );

  const groundShadow = new THREE.Mesh(
    new THREE.CircleGeometry(1.2, 36),
    new THREE.MeshBasicMaterial({
      color: 0x090b0a,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    }),
  );
  groundShadow.rotation.x = -Math.PI / 2;
  groundShadow.scale.set(1.4, 0.38, 1);
  groundShadow.position.set(0.15, -1.59, 0);
  figure.add(groundShadow);
  return { figure, torso, kickLeg };
}

function createAuroraRibbon(color: number, phase: number) {
  const segments = 72;
  const positions = new Float32Array((segments + 1) * 2 * 3);
  const colors = new Float32Array(positions.length);
  const indices: number[] = [];
  const baseColor = new THREE.Color(color);
  const highlightColor = baseColor.clone().lerp(new THREE.Color(0xc8b28a), 0.55);

  for (let segment = 0; segment <= segments; segment += 1) {
    const progress = segment / segments;
    const x = (progress - 0.5) * 12;
    const centerY = 1.05 + Math.sin(progress * 12 + phase) * 0.45;
    const halfWidth = (0.08 + Math.sin(progress * Math.PI) * 0.58) / 2;
    const z = Math.cos(progress * 8 + phase) * 0.25;
    const colorMix = Math.sin(progress * Math.PI);

    for (let edge = 0; edge < 2; edge += 1) {
      const vertex = segment * 2 + edge;
      const offset = vertex * 3;
      const vertexColor = baseColor
        .clone()
        .lerp(highlightColor, colorMix * (edge === 0 ? 0.65 : 1));
      positions[offset] = x;
      positions[offset + 1] = centerY + (edge === 0 ? -halfWidth : halfWidth);
      positions[offset + 2] = z;
      colors[offset] = vertexColor.r;
      colors[offset + 1] = vertexColor.g;
      colors[offset + 2] = vertexColor.b;

      if (segment < segments) {
        const current = segment * 2 + edge;
        const next = (segment + 1) * 2 + edge;
        if (edge === 0) indices.push(current, next, current + 1);
        else indices.push(current, next - 1, next);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
    }),
  );
}

function collectMaterials(group: THREE.Group) {
  const materials = new Set<THREE.Material>();
  group.traverse((object) => {
    if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
      const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
      objectMaterials.forEach((material) => materials.add(material));
    }
  });
  materials.forEach((material) => {
    material.userData.baseOpacity = material.opacity;
    material.transparent = true;
  });
  return [...materials];
}

function updateOpacity(
  group: THREE.Group,
  materials: THREE.Material[],
  amount: number,
) {
  group.visible = amount > 0.005;
  materials.forEach((material) => {
    const baseOpacity = material.userData.baseOpacity as number | undefined;
    if (baseOpacity !== undefined) material.opacity = baseOpacity * amount;
  });
}

export default function HomeScene3d() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    } catch (error) {
      console.error("No fue posible iniciar el fondo 3D de la página inicial.", error);
      return;
    }

    const home = document.querySelector<HTMLElement>(".home-experience");
    if (!home) {
      renderer.dispose();
      throw new Error("No se encontró el contenedor de la experiencia de inicio.");
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 100);
    camera.position.set(0, 0, 13);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "home-atmosphere__canvas";
    host.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xd8c8ae, 1.8);
    scene.add(ambient);
    const keyLight = new THREE.DirectionalLight(0xffdfb0, 2.4);
    keyLight.position.set(-3, 6, 8);
    scene.add(keyLight);

    const groups = new Map<HomeSceneMode, THREE.Group>();
    sceneModes.forEach((mode) => {
      const group = new THREE.Group();
      group.visible = mode === "dojo";
      groups.set(mode, group);
      scene.add(group);
      addInkLandscape(group, sceneAccents[mode]);
    });

    const practitioners = [
      {
        mode: "dojo" as const,
        ...addTaekwondoPractitioner(groups.get("dojo")!),
      },
      {
        mode: "history" as const,
        ...addTaekwondoPractitioner(groups.get("history")!),
      },
    ];

    const floor = new THREE.GridHelper(20, 40, 0xb68e59, 0x51504a);
    floor.position.set(0, -2.8, -2);
    const floorMaterials = Array.isArray(floor.material) ? floor.material : [floor.material];
    floorMaterials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.26;
    });
    groups.get("dojo")!.add(floor);
    groups.get("history")!.add(floor.clone());

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1.8, 28, 20),
      new THREE.MeshBasicMaterial({
        color: sceneAccents.world,
        wireframe: true,
        transparent: true,
        opacity: 0.27,
      }),
    );
    globe.position.set(2.4, -0.25, -1.6);
    groups.get("world")!.add(globe);
    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.009, 4, 96),
      new THREE.MeshBasicMaterial({
        color: 0xc6ae8c,
        transparent: true,
        opacity: 0.46,
      }),
    );
    orbit.position.copy(globe.position);
    orbit.rotation.set(0.55, 0.25, -0.35);
    groups.get("world")!.add(orbit);

    const networkNodes = [
      new THREE.Vector3(1.2, 0.9, -0.55),
      new THREE.Vector3(3.45, 0.75, -0.65),
      new THREE.Vector3(2.9, -0.55, -0.1),
      new THREE.Vector3(1.55, -0.95, -0.55),
      new THREE.Vector3(2.1, 0.05, 0.15),
    ];
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xc6ae8c,
      transparent: true,
      opacity: 0.85,
    });
    networkNodes.forEach((position) => {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 8, 6),
        nodeMaterial.clone(),
      );
      node.position.copy(position);
      groups.get("world")!.add(node);
    });
    [[0, 4], [4, 1], [4, 2], [4, 3], [0, 3], [1, 2]].forEach(
      ([from, to]) => {
        const connection = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            networkNodes[from]!,
            networkNodes[to]!,
          ]),
          new THREE.LineBasicMaterial({
            color: 0xc6ae8c,
            transparent: true,
            opacity: 0.3,
          }),
        );
        groups.get("world")!.add(connection);
      },
    );

    const firstRibbon = createAuroraRibbon(sceneAccents.aurora, 0);
    const secondRibbon = createAuroraRibbon(0x777f79, 2.4);
    secondRibbon.position.y = -0.85;
    secondRibbon.position.z = -0.7;
    secondRibbon.rotation.z = -0.08;
    groups.get("aurora")!.add(firstRibbon, secondRibbon);

    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(320 * 3);
    for (let index = 0; index < positions.length; index += 3) {
      positions[index] = (Math.random() - 0.5) * 18;
      positions[index + 1] = (Math.random() - 0.5) * 10;
      positions[index + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xc9b18a,
        size: 0.024,
        transparent: true,
        opacity: 0.35,
        sizeAttenuation: true,
      }),
    );
    scene.add(particles);

    const materialsByMode = new Map<HomeSceneMode, THREE.Material[]>();
    sceneModes.forEach((mode) => {
      materialsByMode.set(mode, collectMaterials(groups.get(mode)!));
    });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = new THREE.Vector2();
    const targetPointer = new THREE.Vector2();
    let activeMode: HomeSceneMode = "dojo";
    let pageProgress = 0;
    let scrollDirection = 1;
    let previousScrollY = window.scrollY;
    let frame = 0;
    let lastTime = 0;
    let currentOpacities = new Map<HomeSceneMode, number>();
    sceneModes.forEach((mode) =>
      currentOpacities.set(mode, mode === activeMode ? 1 : 0),
    );

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.x = camera.aspect < 0.8 ? 1.25 : 0;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    });
    resizeObserver.observe(host);

    const setMode = (element: Element, mode: HomeSceneMode) => {
      activeMode = mode;
      if (reducedMotion.matches) {
        sceneModes.forEach((sceneMode) =>
          currentOpacities.set(sceneMode, sceneMode === activeMode ? 1 : 0),
        );
        groups.forEach((group, sceneMode) =>
          updateOpacity(
            group,
            materialsByMode.get(sceneMode)!,
            currentOpacities.get(sceneMode) ?? 0,
          ),
        );
        renderer.render(scene, camera);
      }
      home.dataset.activeScene = mode;
      home.style.setProperty("--active-section", element.id || mode);
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          )[0];
        const mode = visible?.target.getAttribute("data-home-scene");
        if (visible && mode && sceneModes.includes(mode as HomeSceneMode)) {
          setMode(visible.target, mode as HomeSceneMode);
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    home.querySelectorAll("[data-home-scene]").forEach((section) =>
      sectionObserver.observe(section),
    );

    const onPointerMove = (event: PointerEvent) => {
      targetPointer.set(
        (event.clientX / window.innerWidth - 0.5) * 2,
        (event.clientY / window.innerHeight - 0.5) * 2,
      );
    };
    const onPointerLeave = () => targetPointer.set(0, 0);
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - previousScrollY) > 2) {
        scrollDirection = currentScrollY > previousScrollY ? 1 : -1;
      }
      previousScrollY = currentScrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      pageProgress = scrollable > 0 ? window.scrollY / scrollable : 0;
      home.style.setProperty("--home-scroll", `${pageProgress}`);
    };
    const onVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else {
        lastTime = 0;
        if (!reducedMotion.matches) frame = window.requestAnimationFrame(renderFrame);
        else renderer.render(scene, camera);
      }
    };

    function renderFrame(now: number) {
      frame = 0;
      if (document.hidden) return;
      const delta = Math.min((now - (lastTime || now)) / 1000, 0.05);
      lastTime = now;
      const blend = 1 - Math.exp(-delta * 3.2);
      pointer.lerp(targetPointer, 1 - Math.exp(-delta * 1.5));
      camera.position.x += (pointer.x * 0.16 - camera.position.x) * blend;
      camera.position.y +=
        (-pointer.y * 0.1 + (0.5 - pageProgress) * 0.12 - camera.position.y) *
        blend;
      camera.rotation.y = -pointer.x * 0.008;
      camera.rotation.x = pointer.y * 0.005;

      groups.forEach((group, mode) => {
        const current = currentOpacities.get(mode) ?? 0;
        const target = mode === activeMode ? 1 : 0;
        const opacity = current + (target - current) * blend;
        currentOpacities.set(mode, opacity);
        updateOpacity(group, materialsByMode.get(mode)!, opacity);
        if (opacity > 0.005) {
          group.rotation.y = Math.sin(now * 0.00012) * 0.018;
          group.position.y = Math.sin(now * 0.0002 + sceneModes.indexOf(mode)) * 0.035;
        }
      });
      practitioners.forEach(({ mode, figure, torso, kickLeg }) => {
        const visibleAmount = currentOpacities.get(mode) ?? 0;
        if (visibleAmount < 0.01) return;
        const movement = scrollDirection * visibleAmount;
        figure.rotation.z += (movement * 0.035 - figure.rotation.z) * blend;
        torso.rotation.z +=
          (-0.12 + movement * 0.12 - torso.rotation.z) * blend;
        const kickAngle =
          Math.sin(pageProgress * Math.PI * 6) * 0.1 +
          scrollDirection * 0.16;
        kickLeg.rotation.z +=
          (kickAngle * visibleAmount - kickLeg.rotation.z) * blend;
        figure.position.x +=
          (3.05 + Math.sin(now * 0.00018) * 0.025 - figure.position.x) * blend;
      });
      particles.rotation.y += 0.00012;
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(renderFrame);
    }

    home.addEventListener("pointermove", onPointerMove, { passive: true });
    home.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    onScroll();
    sectionObserver.takeRecords();
    const firstSection = home.querySelector<HTMLElement>("[data-home-scene]");
    if (firstSection) setMode(firstSection, "dojo");
    if (!reducedMotion.matches) frame = window.requestAnimationFrame(renderFrame);
    else renderer.render(scene, camera);

    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        groups.forEach((group, mode) =>
          updateOpacity(group, materialsByMode.get(mode)!, mode === activeMode ? 1 : 0),
        );
        renderer.render(scene, camera);
      } else if (!frame && !document.hidden) {
        lastTime = 0;
        frame = window.requestAnimationFrame(renderFrame);
      }
    };
    reducedMotion.addEventListener("change", onMotionPreferenceChange);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      sectionObserver.disconnect();
      home.removeEventListener("pointermove", onPointerMove);
      home.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.Points
        ) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="home-atmosphere__renderer" />;
}
