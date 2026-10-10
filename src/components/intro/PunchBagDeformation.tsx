import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export interface PunchSurfaceImpact {
  id: number;
  x: number;
  y: number;
  timestamp: number;
  radius: number;
  depth: number;
  variation: number;
  angle: number;
  ellipticity: number;
}

const MAX_IMPACTS = 16;

function DeformableSurface({
  impacts,
}: {
  impacts: PunchSurfaceImpact[];
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();
  const uniforms = useMemo(
    () => ({
      uResolution: { value: new THREE.Vector2(1, 1) },
      uImpactCount: { value: 0 },
      uImpacts: {
        value: Array.from(
          { length: MAX_IMPACTS },
          () => new THREE.Vector4(),
        ),
      },
      uImpactDetails: {
        value: Array.from(
          { length: MAX_IMPACTS },
          () => new THREE.Vector4(),
        ),
      },
    }),
    [],
  );

  useFrame(() => {
    uniforms.uResolution.value.set(size.width, size.height);
    const activeImpacts = impacts.slice(-MAX_IMPACTS);
    uniforms.uImpactCount.value = activeImpacts.length;

    activeImpacts.forEach((impact, index) => {
      const age = (performance.now() - impact.timestamp) / 1000;
      const recovery = Math.max(0, 1 - age / 4.1);
      const pulse = 0.84 + Math.sin(age * 8 + impact.variation) * 0.16;
      uniforms.uImpacts.value[index].set(
        impact.x / size.width,
        1 - impact.y / size.height,
        impact.radius / size.width,
        impact.depth * recovery * pulse,
      );
      uniforms.uImpactDetails.value[index].set(
        impact.angle,
        impact.ellipticity,
        impact.variation,
        0,
      );
    });

    if (mesh.current) {
      mesh.current.scale.set(viewport.width, viewport.height, 1);
    }
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[1, 1, 120, 80]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`
          uniform int uImpactCount;
          uniform vec4 uImpacts[${MAX_IMPACTS}];
          uniform vec4 uImpactDetails[${MAX_IMPACTS}];
          uniform vec2 uResolution;
          varying float vDent;
          varying float vRim;

          void main() {
            vec3 deformed = position;
            vDent = 0.0;
            vRim = 0.0;
            float aspect = uResolution.x / max(uResolution.y, 1.0);
            vec2 point = vec2(uv.x * aspect, uv.y);

            for (int i = 0; i < ${MAX_IMPACTS}; i++) {
              if (i < uImpactCount) {
                vec4 impact = uImpacts[i];
                vec4 details = uImpactDetails[i];
                vec2 center = vec2(impact.x * aspect, impact.y);
                vec2 offset = point - center;
                float cosine = cos(details.x);
                float sine = sin(details.x);
                vec2 rotated = vec2(
                  cosine * offset.x - sine * offset.y,
                  sine * offset.x + cosine * offset.y
                );
                rotated.x *= details.y;
                float radius = max(impact.z * aspect, 0.001);
                float distanceFromImpact = length(rotated);
                float normalizedDistance = distanceFromImpact / radius;
                float dent = exp(-normalizedDistance * normalizedDistance * 4.5);
                float ringDistance = (normalizedDistance - 0.88) * 8.0;
                float ring = exp(-ringDistance * ringDistance);
                float ridges = 1.0 + 0.16 * sin(atan(rotated.y, rotated.x) * 4.0 + details.z);
                vDent += dent * impact.w * ridges;
                vRim += ring * impact.w;
              }
            }

            deformed.z -= min(vDent, 0.22);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(deformed, 1.0);
          }
        `}
        fragmentShader={`
          varying float vDent;
          varying float vRim;

          void main() {
            float dent = clamp(vDent, 0.0, 1.0);
            float rim = clamp(vRim, 0.0, 1.0);
            float light = clamp(0.5 + dFdx(vDent) * 8.0 - dFdy(vDent) * 8.0, 0.0, 1.0);
            float alpha = clamp(dent * 0.27 + rim * 0.16, 0.0, 0.38);
            vec3 shadow = vec3(0.055, 0.032, 0.023);
            vec3 highlight = vec3(0.96, 0.76, 0.52);
            vec3 color = mix(shadow, highlight, clamp(light * rim * 1.8, 0.0, 0.42));
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}

export function PunchBagDeformation({
  impacts,
}: {
  impacts: PunchSurfaceImpact[];
}) {
  return (
    <div className="site-punch-canvas-wrap" aria-hidden="true">
      <Canvas
        className="site-punch-canvas"
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <DeformableSurface impacts={impacts} />
      </Canvas>
    </div>
  );
}
