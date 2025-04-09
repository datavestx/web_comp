  const canvas = document.getElementById("colorCanvas");
  const ctx = canvas.getContext("2d");
  const pointer = document.getElementById("pointer");
  const color1Box = document.getElementById("color1");
  const color2Box = document.getElementById("color2");
  const colorMixBox = document.getElementById("colorMix");
  const hexValue = document.getElementById("hexValue");
  let color1 = "#ffffff";
  let color2 = "#ffffff";
  let selectingColor = 1;
  function drawGradient() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.17, "yellow");
    gradient.addColorStop(0.34, "lime");
    gradient.addColorStop(0.51, "cyan");
    gradient.addColorStop(0.68, "blue");
    gradient.addColorStop(0.85, "magenta");
    gradient.addColorStop(1, "red");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  drawGradient();
  function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
  }
  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  }
  function blendColors(hex1, hex2, ratio = 0.5) {
    const c1 = hexToRgb(hex1);
    const c2 = hexToRgb(hex2);
    const r = Math.round(c1.r * (1 - ratio) + c2.r * ratio);
    const g = Math.round(c1.g * (1 - ratio) + c2.g * ratio);
    const b = Math.round(c1.b * (1 - ratio) + c2.b * ratio);
    return rgbToHex(r, g, b);
  }
  function updateGradientBox() {
    const mixed = blendColors(color1, color2, 0.5);
    setColorBox("colorMix", mixed);
  }
  function updateColor(x, y) {
    const rect = canvas.getBoundingClientRect();
    const cx = Math.max(0, Math.min(x - rect.left, canvas.width - 1));
    const cy = Math.max(0, Math.min(y - rect.top, canvas.height - 1));
    const pixel = ctx.getImageData(cx, cy, 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
    pointer.style.left = `${cx}px`;
    pointer.style.top = `${cy}px`;
    if (selectingColor === 1) {
      color1 = hex;
      setColorBox("color1", hex);
      hexValue.textContent = `Color 1: ${hex}`;
    } else {
      color2 = hex;
      setColorBox("color2", hex);
      hexValue.textContent = `Color 2: ${hex}`;
    }
    updateGradientBox();
  }
  let dragging = false;
  canvas.addEventListener("mousedown", (e) => {
    dragging = true;
    updateColor(e.clientX, e.clientY);
  });
  window.addEventListener("mousemove", (e) => {
    if (dragging) updateColor(e.clientX, e.clientY);
  });
  window.addEventListener("mouseup", () => {
    dragging = false;
  });
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    dragging = true;
    const touch = e.touches[0];
    updateColor(touch.clientX, touch.clientY);
  });
  canvas.addEventListener("touchmove", (e) => {
    if (!dragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    updateColor(touch.clientX, touch.clientY);
  });
  canvas.addEventListener("touchend", () => {
    dragging = false;
  });
  // Toggle warna 1 / warna 2
  color1Box.addEventListener("click", () => selectingColor = 1);
  color2Box.addEventListener("click", () => selectingColor = 2);
  function addHighlight(box) {
    box.classList.add("highlight");
  }
    
  function removeHighlight(box) {
    box.classList.remove("highlight");
  }  
  function addHighlight(box) {
    box.classList.add("highlight");
  }
  function removeHighlight(box) {
    box.classList.remove("highlight");
  }
  color1Box.addEventListener("click", () => addHighlight(color1Box));
  color1Box.addEventListener("mouseup", () => removeHighlight(color1Box));
  color1Box.addEventListener("mouseleave", () => removeHighlight(color1Box));    
  color2Box.addEventListener("click", () => addHighlight(color2Box));
  color2Box.addEventListener("mouseup", () => removeHighlight(color2Box));
  color2Box.addEventListener("mouseleave", () => removeHighlight(color2Box));
  function setColorBox(elementId, color) {
    const box = document.getElementById(elementId);
    const label = document.getElementById(elementId + "Label");
    box.style.backgroundColor = color;
    label.textContent = color.toUpperCase();
  }
  setColorBox("color1", "#ff0000");
  setColorBox("color2", "#00ff00");
  setColorBox("colorMix", "#808000");