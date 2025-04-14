    let db, audio = new Audio(), currentSongIndex = 0, songs = [], filteredSongs = [], isRepeating = false;
    const canvas = document.getElementById("visualizer");
    
    const ctx = canvas.getContext("2d");
    
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    const initDB = () => {
      let request = indexedDB.open("musicDB", 1);
      request.onupgradeneeded = e => {
        db = e.target.result;
        db.createObjectStore("songs", { keyPath: "id" });
      };
      request.onsuccess = e => {
        db = e.target.result;
        loadSongs();
      };
    };

    const saveToDB = (file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const transaction = db.transaction(["songs"], "readwrite");
        const store = transaction.objectStore("songs");
        const id = file.name + Date.now();
        const song = { id, name: file.name, data: reader.result };
        store.add(song).onsuccess = () => {
          showNotification(`Lagu "${file.name}" berhasil diupload.`);
          loadSongs();
        };
      };
      reader.readAsDataURL(file);
    };

    const loadSongs = () => {
      songs = [];
      const transaction = db.transaction(["songs"], "readonly");
      const store = transaction.objectStore("songs");
      const request = store.openCursor();

      request.onsuccess = e => {
        const cursor = e.target.result;
        if (cursor) {
          songs.push(cursor.value);
          cursor.continue();
        } else {
          filterSongs();
        }
      };
    };
    const filterSongs = () => {
      const search = document.getElementById("search").value.toLowerCase();
      filteredSongs = songs.filter(song => song.name.toLowerCase().includes(search));
      renderPlaylist();
    };

    const renderPlaylist = () => {
      const playlist = document.getElementById("playlist");
      playlist.innerHTML = "";
      filteredSongs.forEach((song, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = song.name;
        playlist.appendChild(option);
      });
      if (filteredSongs.length > 0) loadSong(0);
    };

    const loadSong = index => {
      currentSongIndex = index;
      const song = filteredSongs[index];
      audio.src = song.data;
      document.getElementById("title").textContent = song.name;
      document.getElementById("playlist").value = index;
    };

    const togglePlay = () => {
      const playBtn = document.getElementById("playBtn");
      if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playBtn.classList.add("playing");
      } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.classList.remove("playing");
      }
    };

      audio.onpause = () => {
       document.getElementById("playBtn").classList.remove("playing");
    };

    const nextSong = () => {
    if (filteredSongs.length < 1) return;
  
    if (isShuffling) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * filteredSongs.length);
      } while (nextIndex === currentSongIndex && filteredSongs.length > 1); // hindari lagu yang sama
      currentSongIndex = nextIndex;
    } else {
      currentSongIndex = (currentSongIndex + 1) % filteredSongs.length;
    }
  
    loadSong(currentSongIndex);
    audio.play();
  };

    audio.onended = () => {
      if (isRepeating) {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextSong();
      }
    };

    const prevSong = () => {
      let index = (currentSongIndex - 1 + filteredSongs.length) % filteredSongs.length;
      loadSong(index);
      audio.play();
    };

    let isShuffling = false;
    document.querySelector('.fa-random').style.color = "white";

    const toggleShuffle = () => {
      isShuffling = !isShuffling;
      const shuffleBtn = document.querySelector('.fa-random');
      shuffleBtn.style.color = isShuffling ? "lightgreen" : "white";
      showNotification("Shuffle " + (isShuffling ? "aktif." : "nonaktif."), isShuffling ? "success" : "error");
    };

    const toggleRepeat = () => {
      isRepeating = !isRepeating;
      audio.loop = isRepeating;
      const icon = document.getElementById("repeatBtn").firstElementChild;
      icon.style.color = isRepeating ? "lightgreen" : "white";
      showNotification(  "Repeat " + (isRepeating ? "aktif" : "nonaktif"),  isRepeating ? "success" : "error");
    };

    const deleteAllSongs = () => {
      const transaction = db.transaction(["songs"], "readwrite");
      const store = transaction.objectStore("songs");
      store.clear().onsuccess = () => {
        songs = [];
        filteredSongs = [];
        document.getElementById("playlist").innerHTML = "";
        audio.pause();
        audio.src = "";
        document.getElementById("title").textContent = "Judul Lagu";
        document.getElementById("time").textContent = "0:00 / 0:00";
        showNotification("Semua lagu telah dihapus.");
      };
    };
      const showConfirm = (message, onConfirm) => {
      const modal = document.getElementById("confirmModal");
      const msg = document.getElementById("confirmMessage");
      const yesBtn = document.getElementById("confirmYes");
      const noBtn = document.getElementById("confirmNo");

      msg.textContent = message;
      modal.classList.add("show");
      modal.style.display = "flex";

      const cleanup = () => {
        modal.classList.remove("show");
        setTimeout(() => {
          modal.style.display = "none";
          yesBtn.onclick = null;
          noBtn.onclick = null;
        }, 300);
      };

      yesBtn.onclick = () => {
        cleanup();
        onConfirm();
      };
      noBtn.onclick = cleanup;
    };

    const showNotification = (msg, type = "success") => {
      const note = document.getElementById("notification");
      note.textContent = msg;
    
      // Reset kelas warna
      note.classList.remove("success", "error");
      note.classList.add("show", type);
    
      setTimeout(() => {
        note.classList.remove("show", type);
      }, 2500);
    };

    const ring = document.querySelector(".progress-ring");
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    
    audio.ontimeupdate = () => {
      const progress = document.getElementById("progress");
      const percent = (audio.currentTime / audio.duration) * 100 || 0;
      progress.value = percent;
      updateSliderBackground(progress);
    
      // Update time
      document.getElementById("time").textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    
      // Update circular progress
      const offset = circumference - (percent / 100) * circumference;
      ring.style.strokeDashoffset = offset;
    };

    audio.onplay = () => {
      const context = new AudioContext();
      const src = context.createMediaElementSource(audio);
      const analyser = context.createAnalyser();
      src.connect(analyser);
      analyser.connect(context.destination);
      analyser.fftSize = 64;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      // equalizer
      const draw = () => {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const totalBars = bufferLength;
        const gap = 2; // jarak antar bar horizontal
        const barWidth = canvas.width / bufferLength * 1.17;
        const stripHeight = 4; // tinggi tiap strip
        const stripSpacing = 2; // jarak antar strip
        let x = 0;
        for (let i = 0; i < totalBars; i++) {
          const val = dataArray[i];
          const barHeight = (val / 255) * canvas.height;
          const strips = Math.floor(barHeight / (stripHeight + stripSpacing));
          for (let j = 0; j < strips; j++) {
            const y = canvas.height - (j * (stripHeight + stripSpacing)) - stripHeight;
            const gradient = ctx.createLinearGradient(0, y, 0, y + stripHeight);
            gradient.addColorStop(0, "#92FE9D");
            gradient.addColorStop(1, "#00C9FF");
            ctx.fillStyle = gradient;
            ctx.shadowColor = "#00C9FF";
            ctx.shadowBlur = 10;
            ctx.fillRect(x, y, barWidth, stripHeight);
          }
          
          x += barWidth + gap;
        }
      };
      draw();
    };

    document.getElementById("progress").addEventListener("input", e => {
      audio.currentTime = (e.target.value / 100) * audio.duration;
    });

    document.getElementById("playlist").addEventListener("change", e => {
      loadSong(parseInt(e.target.value));
    });

    document.getElementById("fileInput").addEventListener("change", e => {
      Array.from(e.target.files).forEach(saveToDB);
    });

    document.getElementById("volume").addEventListener("input", e => {
      audio.volume = e.target.value;
    });

    document.getElementById("search").addEventListener("input", filterSongs);

    const formatTime = time => {
      const min = Math.floor(time / 60);
      const sec = Math.floor(time % 60).toString().padStart(2, "0");
      return `${min}:${sec}`;
    };

    function updateFileName(input) {
      const fileName = input.files.length > 0 ? input.files[0].name : 'No file selected';
      document.getElementById('fileName').textContent = fileName;
    }

    const slider = document.getElementById("progress");
    
    function updateSliderBackground(slider) {
    const val = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = `
    linear-gradient(to right, #00C9FF, #92FE9D) 0 / ${val}% 100% no-repeat,
    #ddd`;
      // use the code below, if you want to use single color
      // slider.style.background = `linear-gradient(to right, #4CAF50 ${val}%, #ddd ${val}%)`;
    }

     function updateVolumeSliderBackground(slider) {
       const val = (slider.value - slider.min) / (slider.max - slider.min) * 100;
       slider.style.background = `
       linear-gradient(to right, #00C9FF, #92FE9D) 0 / ${val}% 100% no-repeat,
       #ddd`;
      }

    // Update warna saat dimuat
    window.addEventListener("DOMContentLoaded", () => {
      updateSliderBackground(slider);
    });
    
    // Update warna saat slider digeser
    slider.addEventListener('input', function () {
      updateSliderBackground(this);
    });

    const volumeBtn = document.getElementById('volumeToggle');
    const volumeSlider = document.getElementById('volume');
    
    volumeBtn.addEventListener('click', () => {
      volumeSlider.style.display = volumeSlider.style.display === 'block' ? 'none' : 'block';
    });

    volumeSlider.addEventListener('input', function () {
      updateVolumeSliderBackground(this);
    });

    updateVolumeSliderBackground(volumeSlider);
    window.onload = initDB;