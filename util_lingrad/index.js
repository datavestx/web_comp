    const canvas = document.getElementById("colorPicker");
    const ctx = canvas.getContext("2d");
    let dragging = false;
    let indicatorPos = null;

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      drawGradient();
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function drawGradient() {
      const width = canvas.width;
      const height = canvas.height;

      const hue = ctx.createLinearGradient(0, 0, width, 0);
      hue.addColorStop(0, "red");
      hue.addColorStop(0.17, "yellow");
      hue.addColorStop(0.34, "green");
      hue.addColorStop(0.51, "cyan");
      hue.addColorStop(0.68, "blue");
      hue.addColorStop(0.85, "magenta");
      hue.addColorStop(1, "red");
      ctx.fillStyle = hue;
      ctx.fillRect(0, 0, width, height);

      const white = ctx.createLinearGradient(0, 0, 0, height);
      white.addColorStop(0, "rgba(255,255,255,1)");
      white.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = white;
      ctx.fillRect(0, 0, width, height);

      const black = ctx.createLinearGradient(0, 0, 0, height);
      black.addColorStop(0, "rgba(0,0,0,0)");
      black.addColorStop(1, "rgba(0,0,0,1)");
      ctx.fillStyle = black;
      ctx.fillRect(0, 0, width, height);

      if (indicatorPos) drawIndicator(indicatorPos.x, indicatorPos.y);
    }

    function drawIndicator(x, y) {
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    function getColorAtPosition(x, y) {
      const imageData = ctx.getImageData(x, y, 1, 1).data;
      return `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
    }

    function rgbToHex(rgb) {
      const result = rgb.match(/\d+/g).map(x =>
        parseInt(x).toString(16).padStart(2, "0")
      );
      return "#" + result.join("");
    }

    let selectedColor1 = "#ff0000";
    let selectedColor2 = "#00ffff";
    let selectingColor1 = true;

    function updateGradBox() {
      const gradBox = document.getElementById("gradBox");
      gradBox.style.background = `linear-gradient(to right, ${selectedColor1}, ${selectedColor2})`;
    
      const label = getGradientName(selectedColor1, selectedColor2);
      document.getElementById("gradLabel").textContent = label;
    }

    function setColor(x, y) {
      indicatorPos = { x, y };
      const color = getColorAtPosition(x, y);
      const hex = rgbToHex(color);

      if (selectingColor1) {
        selectedColor1 = hex;
        document.getElementById("color1Box").style.backgroundColor = hex;
        document.getElementById("color1Code").textContent = hex;
        document.getElementById("color1Input").value = hex;
      } else {
        selectedColor2 = hex;
        document.getElementById("color2Box").style.backgroundColor = hex;
        document.getElementById("color2Code").textContent = hex;
        document.getElementById("color2Input").value = hex;
      }
        updateGradBox();
        function getGradientName(hex1, hex2) {
          const presets = [
          { name: "Royal Violet", colors: ["#8e2de2", "#4a00e0"] },
          { name: "Golden Hour", colors: ["#f3904f", "#3b4371"] },
          { name: "Aqua Ocean", colors: ["#00c9ff", "#92fe9d"] },
          { name: "Sunset", colors: ["#ff6a00", "#ee0979"] },
          { name: "Mint Leaf", colors: ["#00b09b", "#96c93d"] },
          { name: "Peachy", colors: ["#ffecd2", "#fcb69f"] },
          { name: "Fire Red", colors: ["#f00000", "#dc281e"] },
          { name: "Deep Blue", colors: ["#2193b0", "#6dd5ed"] },
          { name: "Bloody Mary", colors: ["#ff512f", "#dd2476"] },
          { name: "Fresh Turboscent", colors: ["#f1f2b5", "#135058"] },
          { name: "Cool Blues", colors: ["#2193b0", "#6dd5ed"] },
          { name: "Noon to Dusk", colors: ["#ff6e7f", "#bfe9ff"] },
          { name: "Cosmic Fusion", colors: ["#ff00cc", "#333399"] },
          { name: "Sublime Light", colors: ["#fc5c7d", "#6a82fb"] },
          { name: "Relaxing Red", colors: ["#e52d27", "#b31217"] },
          { name: "Ocean Breeze", colors: ["#2E3192", "#1BFFFF"] },
          { name: "Cherry Blossom", colors: ["#fbd3e9", "#bb377d"] },
          { name: "Frost", colors: ["#000428", "#004e92"] },
          { name: "Black Rose", colors: ["#f4c4f3", "#fc67fa"] },
          { name: "Pastel Sunset", colors: ["#ff9a9e", "#fad0c4"] },
          { name: "Celestial", colors: ["#c33764", "#1d2671"] },
          { name: "Rose Water", colors: ["#e6b980", "#eacda3"] },
          { name: "Sky Glider", colors: ["#89f7fe", "#66a6ff"] },
          { name: "Midnight", colors: ["#232526", "#414345"] },
          { name: "Purple Dream", colors: ["#bf5ae0", "#a811da"] },
          { name: "Lavender Fog", colors: ["#d3cce3", "#e9e4f0"] },
          { name: "Dreamy Orange", colors: ["#f2994a", "#f2c94c"] },
          { name: "Teal Love", colors: ["#11998e", "#38ef7d"] },
          { name: "Warm Flame", colors: ["#ff9a9e", "#fad0c4"] },
          { name: "Night Sky", colors: ["#141e30", "#243b55"] },
          { name: "Ocean Sunset", colors: ["#2b5876", "#4e4376"] }
        ];

      const normalize = hex => hex.toLowerCase();
      for (const preset of presets) {
        const [a, b] = preset.colors.map(normalize);
        if (
          (normalize(hex1) === a && normalize(hex2) === b) ||
          (normalize(hex1) === b && normalize(hex2) === a)
        ) {
          return preset.name;
        }
      }
      return "Custom Gradient";
    }
      drawGradient();
    }

    function handleMove(e) {
          const rect = canvas.getBoundingClientRect();
          const clientX = e.touches ? e.touches[0].clientX : e.clientX;
          const clientY = e.touches ? e.touches[0].clientY : e.clientY;
          const x = clientX - rect.left;
          const y = clientY - rect.top;
    
          if (x >= 0 && y >= 0 && x < canvas.width && y < canvas.height) {
            setColor(x, y);
          }
       }
    function setActiveBox(isColor1) {
          selectingColor1 = isColor1;
          document.getElementById("color1Box").classList.toggle("active", isColor1);
          document.getElementById("color2Box").classList.toggle("active", !isColor1);
      }
        document.getElementById("color1Box").addEventListener("click", () => setActiveBox(true));
        document.getElementById("color2Box").addEventListener("click", () => setActiveBox(false));
        // Input manual hex color
        document.getElementById("color1Input").addEventListener("input", e => {
          const val = e.target.value.trim();
          if (/^#([0-9a-fA-F]{6})$/.test(val)) {
            selectedColor1 = val;
            document.getElementById("color1Box").style.backgroundColor = val;
            document.getElementById("color1Code").textContent = val;
            updateGradBox();
          }
        });
        document.getElementById("color2Input").addEventListener("input", e => {
          const val = e.target.value.trim();
          if (/^#([0-9a-fA-F]{6})$/.test(val)) {
            selectedColor2 = val;
            document.getElementById("color2Box").style.backgroundColor = val;
            document.getElementById("color2Code").textContent = val;
            updateGradBox();
          }
        });

    // Event canvas
    canvas.addEventListener("mousedown", e => {
      dragging = true;
      handleMove(e);
    });

    canvas.addEventListener("mousemove", e => {
      if (dragging) handleMove(e);
    });

    canvas.addEventListener("mouseup", () => dragging = false);
    canvas.addEventListener("mouseleave", () => dragging = false);

    canvas.addEventListener("touchstart", e => {
      dragging = true;
      handleMove(e);
    }, { passive: true });

    canvas.addEventListener("touchmove", e => {
      if (dragging) handleMove(e);
    }, { passive: true });

    canvas.addEventListener("touchend", () => dragging = false);

    // Inisialisasi
    document.getElementById("color1Box").style.backgroundColor = selectedColor1;
    document.getElementById("color2Box").style.backgroundColor = selectedColor2;
    document.getElementById("color1Code").textContent = selectedColor1;
    document.getElementById("color2Code").textContent = selectedColor2;
    document.getElementById("color1Input").value = selectedColor1;
    document.getElementById("color2Input").value = selectedColor2;
    updateGradBox();
    setActiveBox(true);
