import * as THREE from "three";

const BREAK_LINE = [
  [-0.035, -0.5],
  [0.025, -0.38],
  [-0.03, -0.27],
  [0.035, -0.16],
  [-0.025, -0.055],
  [0.03, 0.055],
  [-0.035, 0.16],
  [0.025, 0.27],
  [-0.03, 0.38],
  [0.035, 0.5],
] as const;

function createBoardShape(
  side: "left" | "right",
  width: number,
  height: number,
) {
  const shape = new THREE.Shape();

  if (side === "left") {
    shape.moveTo(-width / 2, -height / 2);
    BREAK_LINE.forEach(([x, y]) => shape.lineTo(x * height, y * height));
    shape.lineTo(-width / 2, height / 2);
  } else {
    shape.moveTo(BREAK_LINE[0][0] * height, BREAK_LINE[0][1] * height);
    shape.lineTo(width / 2, -height / 2);
    shape.lineTo(width / 2, height / 2);
    BREAK_LINE.slice(1)
      .reverse()
      .forEach(([x, y]) => shape.lineTo(x * height, y * height));
  }

  shape.closePath();
  return shape;
}

export function createBoardGeometry(
  side: "left" | "right",
  width: number,
  height: number,
) {
  const geometry = new THREE.ExtrudeGeometry(
    createBoardShape(side, width, height),
    {
      depth: 0.34,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.055,
      bevelThickness: 0.055,
      curveSegments: 3,
    },
  );
  const positions = geometry.attributes.position;
  const uvs = geometry.attributes.uv;

  for (let index = 0; index < positions.count; index += 1) {
    uvs.setXY(
      index,
      (positions.getX(index) + width / 2) / width,
      (positions.getY(index) + height / 2) / height,
    );
  }

  uvs.needsUpdate = true;
  return geometry;
}

function createInkEmblem(image: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("No se pudo preparar el emblema para la tabla.");
  }

  context.drawImage(image, 0, 0);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);

  for (let index = 0; index < pixels.data.length; index += 4) {
    const luminance =
      (pixels.data[index] * 0.2126 +
        pixels.data[index + 1] * 0.7152 +
        pixels.data[index + 2] * 0.0722) /
      255;
    pixels.data[index] = 57;
    pixels.data[index + 1] = 37;
    pixels.data[index + 2] = 22;
    pixels.data[index + 3] *= luminance;
  }

  context.putImageData(pixels, 0, 0);
  return canvas;
}

export function createBoardTexture(
  emblem: HTMLImageElement,
  width: number,
  height: number,
) {
  const canvas = document.createElement("canvas");
  canvas.width = 1800;
  canvas.height = Math.round(canvas.width / (width / height));
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("No se pudo preparar la textura de la tabla.");
  }

  const wood = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  wood.addColorStop(0, "#d18a4e");
  wood.addColorStop(0.2, "#f6b66f");
  wood.addColorStop(0.55, "#e99f59");
  wood.addColorStop(1, "#a9572d");
  context.fillStyle = wood;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const glow = context.createRadialGradient(
    canvas.width / 2,
    canvas.height * 0.38,
    0,
    canvas.width / 2,
    canvas.height * 0.38,
    canvas.width * 0.7,
  );
  glow.addColorStop(0, "rgba(255, 220, 159, 0.72)");
  glow.addColorStop(1, "rgba(255, 220, 159, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let index = 0; index < 150; index += 1) {
    const y = (index / 150) * canvas.height;
    context.beginPath();
    context.moveTo(0, y);
    context.bezierCurveTo(
      canvas.width * 0.28,
      y + Math.sin(index * 0.43) * canvas.height * 0.008,
      canvas.width * 0.72,
      y - Math.cos(index * 0.31) * canvas.height * 0.006,
      canvas.width,
      y + Math.sin(index * 0.19) * canvas.height * 0.005,
    );
    context.strokeStyle =
      index % 5 === 0 ? "rgba(80, 43, 23, 0.13)" : "rgba(255, 226, 176, 0.14)";
    context.lineWidth = index % 11 === 0 ? 3 : 1;
    context.stroke();
  }

  const titleSize = Math.min(canvas.width * 0.078, canvas.height * 0.115);
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#412817";
  context.font = `600 ${Math.round(titleSize * 0.32)}px Georgia, serif`;
  context.fillText("균형", canvas.width / 2, canvas.height * 0.065);
  context.font = `600 ${Math.round(titleSize)}px Georgia, serif`;
  context.fillText("Equilibrio", canvas.width / 2, canvas.height * 0.14);

  const inkEmblem = createInkEmblem(emblem);
  const emblemSize = Math.min(canvas.width * 0.52, canvas.height * 0.49);
  context.drawImage(
    inkEmblem,
    (canvas.width - emblemSize) / 2,
    canvas.height * 0.25,
    emblemSize,
    emblemSize,
  );

  context.strokeStyle = "rgba(83, 49, 27, 0.48)";
  context.lineWidth = Math.max(2, canvas.width * 0.0015);
  for (let index = 0; index < 5; index += 1) {
    const y = canvas.height * (0.81 + index * 0.012);
    context.beginPath();
    context.moveTo(0, y);
    context.bezierCurveTo(
      canvas.width * 0.25,
      y - canvas.height * 0.035,
      canvas.width * 0.72,
      y + canvas.height * 0.035,
      canvas.width,
      y - canvas.height * 0.008,
    );
    context.stroke();
  }

  const mottoSize = Math.min(canvas.width * 0.029, canvas.height * 0.045);
  context.fillStyle = "#412817";
  context.font = `600 ${Math.round(mottoSize)}px Georgia, serif`;
  context.letterSpacing = `${Math.round(mottoSize * 0.35)}px`;
  context.fillText(
    "SUEÑA  ·  CREE  ·  LUCHA",
    canvas.width / 2,
    canvas.height * 0.855,
  );

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export function createDustTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("No se pudo preparar la textura del polvo.");
  }

  const glow = context.createRadialGradient(32, 32, 0, 32, 32, 30);
  glow.addColorStop(0, "rgba(255, 237, 208, 0.9)");
  glow.addColorStop(0.35, "rgba(221, 168, 111, 0.48)");
  glow.addColorStop(1, "rgba(117, 72, 40, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

export function seededValue(index: number, offset: number) {
  const value = Math.sin(index * 127.1 + offset * 311.7) * 43758.5453;
  return value - Math.floor(value);
}
