    let db, audio = new Audio(), currentSongIndex = 0, songs = [], filteredSongs = [], isRepeating = false;
    const canvas = document.getElementById("visualizer");
    const ctx = canvas.getContext("2d");

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
      if (audio.paused) {
        audio.play();
        document.getElementById("playBtn").innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        audio.pause();
        document.getElementById("playBtn").innerHTML = '<i class="fas fa-play"></i>';
      }
    };

    const nextSong = () => {
      let index = (currentSongIndex + 1) % filteredSongs.length;
      loadSong(index);
      audio.play();
    };

    const prevSong = () => {
      let index = (currentSongIndex - 1 + filteredSongs.length) % filteredSongs.length;
      loadSong(index);
      audio.play();
    };

    const shuffleSongs = () => {
      if (filteredSongs.length < 2) return;
      let shuffled = [...filteredSongs];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      filteredSongs = shuffled;
      renderPlaylist();
      loadSong(0);
      showNotification("Playlist diacak.");
    };

    const toggleRepeat = () => {
      isRepeating = !isRepeating;
      audio.loop = isRepeating;
      const icon = document.getElementById("repeatBtn").firstElementChild;
      icon.style.color = isRepeating ? "lightgreen" : "white";
      showNotification("Repeat " + (isRepeating ? "aktif" : "nonaktif"));
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

    const showNotification = (msg) => {
      const note = document.getElementById("notification");
      note.textContent = msg;
      setTimeout(() => (note.textContent = ""), 3000);
    };

    audio.ontimeupdate = () => {
      const progress = document.getElementById("progress");
      progress.value = (audio.currentTime / audio.duration) * 100 || 0;
      document.getElementById("time").textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
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

      const draw = () => {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dataArray.forEach((val, i) => {
          const x = i * 5;
          const y = canvas.height - val / 2;
          ctx.fillStyle = "lime";
          ctx.fillRect(x, y, 4, val / 2);
        });
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

    window.onload = initDB;