   const modal = document.getElementById("uploadModal");
    const feed = document.getElementById("feed");
    const dropZone = document.getElementById("drop-zone");
    let currentVideo = null;

    function toggleModal() {
      modal.style.display = modal.style.display === "flex" ? "none" : "flex";
    }

    function createVideoElement(url, titleText, descText) {
      const container = document.createElement("div");
      container.className = "video-item";

      const video = document.createElement("video");
      video.src = url;
      video.controls = false;
      video.muted = true;
      video.autoplay = true;
      video.loop = true;

      // Double tap to toggle mute
      let lastTap = 0;
      video.addEventListener("touchend", (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
          video.muted = !video.muted;
        }
        lastTap = currentTime;
      });

      // Hold to pause
      let holdTimeout;
      video.addEventListener("touchstart", () => {
        holdTimeout = setTimeout(() => video.pause(), 500);
      });
      video.addEventListener("touchend", () => {
        clearTimeout(holdTimeout);
        if (video.paused) video.play();
      });

      const meta = document.createElement("div");
      meta.className = "meta";
      const title = document.createElement("h4");
      title.textContent = titleText;
      const desc = document.createElement("p");
      desc.textContent = descText;
      desc.style.opacity = 0.7;
      meta.appendChild(title);
      meta.appendChild(desc);

      container.appendChild(video);
      container.appendChild(meta);

      feed.appendChild(container);
      observeScroll(video);
    }

    function uploadVideo() {
      const fileInput = document.getElementById("fileInput");
      const title = document.getElementById("title");
      const desc = document.getElementById("description");
      const progressFill = document.getElementById("progress-fill");
      const file = fileInput.files[0];
      if (!file) return;

      const url = URL.createObjectURL(file);
      const name = title.value || file.name;
      createVideoElement(url, name, desc.value);
      toggleModal();

      let percent = 0;
      const interval = setInterval(() => {
        percent += 10;
        progressFill.style.width = percent + "%";
        if (percent >= 100) clearInterval(interval);
      }, 100);
    }

    dropZone.addEventListener("dragover", e => e.preventDefault());
    dropZone.addEventListener("drop", e => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("video")) {
        document.getElementById("fileInput").files = e.dataTransfer.files;
        document.getElementById("title").value = file.name;
      }
    });

    function observeScroll(newVideo) {
      feed.addEventListener("scroll", () => {
        const hint = document.querySelector(".swipe-hint-img");
        if (hint) hint.style.display = "none";

        document.querySelectorAll("video").forEach(video => {
          const rect = video.getBoundingClientRect();
          if (rect.left >= 0 && rect.right <= window.innerWidth) {
            if (currentVideo && currentVideo !== video) {
              currentVideo.pause();
            }
            currentVideo = video;
            video.play();
          } else {
            video.pause();
          }
        });
      });
    }