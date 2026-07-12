(() => {
  const XLINK_NS = "http://www.w3.org/1999/xlink";

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const smoothStep = (a, b, value) => {
    const t = clamp((value - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };

  const length = (x, y) => Math.sqrt(x * x + y * y);

  const roundedRectSDF = (x, y, width, height, radius) => {
    const qx = Math.abs(x) - width + radius;
    const qy = Math.abs(y) - height + radius;
    return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
  };

  const generateReferenceMap = ({ width, height, fragment, scaleMultiplier = 0.5 }) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");

    if (!context || typeof ImageData === "undefined") {
      return null;
    }

    const data = new Uint8ClampedArray(width * height * 4);
    const rawValues = [];
    let maxScale = 0;

    for (let i = 0; i < data.length; i += 4) {
      const pixel = i / 4;
      const x = pixel % width;
      const y = Math.floor(pixel / width);
      const pos = fragment({ x: x / width, y: y / height });
      const dx = pos.x * width - x;
      const dy = pos.y * height - y;

      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
      rawValues.push(dx, dy);
    }

    maxScale = Math.max(maxScale * scaleMultiplier, 1);

    let index = 0;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = clamp((rawValues[index++] / maxScale + 0.5) * 255, 0, 255);
      data[i + 1] = clamp((rawValues[index++] / maxScale + 0.5) * 255, 0, 255);
      data[i + 2] = 0;
      data[i + 3] = 255;
    }

    context.putImageData(new ImageData(data, width, height), 0, 0);

    return {
      href: canvas.toDataURL("image/png"),
      scale: maxScale,
    };
  };

  const createDropletFragment = ({ rectWidth, rectHeight, radius, edgeOffset, centerStrength = 1 }) => (uv) => {
    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;
    const distanceToEdge = roundedRectSDF(ix, iy, rectWidth, rectHeight, radius);
    const displacement = smoothStep(0.8, 0, distanceToEdge - edgeOffset);
    const edgePull = smoothStep(0, 1, displacement);
    const cornerPull = smoothStep(0.55, 1.25, length(ix / rectWidth, iy / rectHeight));
    const scaled = edgePull * (1 + cornerPull * 0.18) * centerStrength;

    return {
      x: ix * scaled + 0.5,
      y: iy * scaled + 0.5,
    };
  };

  const setFeImageHref = (id, href, width, height, scale) => {
    const node = document.getElementById(id);
    const displacement = node && node.nextElementSibling;

    if (!node || !href) {
      return;
    }

    node.setAttribute("width", String(width));
    node.setAttribute("height", String(height));
    node.setAttribute("href", href);
    node.setAttributeNS(XLINK_NS, "href", href);

    if (displacement && displacement.tagName.toLowerCase() === "fedisplacementmap") {
      displacement.setAttribute("scale", String(scale));
    }
  };

  const panelMap = generateReferenceMap({
    width: 220,
    height: 220,
    scaleMultiplier: 0.58,
    fragment: createDropletFragment({
      rectWidth: 0.3,
      rectHeight: 0.3,
      radius: 0.6,
      edgeOffset: 0.15,
      centerStrength: 1,
    }),
  });

  const dockMap = generateReferenceMap({
    width: 700,
    height: 76,
    scaleMultiplier: 0.5,
    fragment: createDropletFragment({
      rectWidth: 0.42,
      rectHeight: 0.18,
      radius: 0.5,
      edgeOffset: 0.12,
      centerStrength: 1.04,
    }),
  });

  setFeImageHref("liquid-glass-map", panelMap && panelMap.href, 220, 220, panelMap && panelMap.scale);
  setFeImageHref("dock-liquid-glass-map", dockMap && dockMap.href, 700, 76, dockMap && dockMap.scale * 0.2);
})();
