
  
  document.addEventListener("DOMContentLoaded", () => {
  
    /* INTERACTIVE CONTACT - works on any page */
    const copyEmailBtn = document.getElementById("copyEmailBtn");
    const copyMessage = document.getElementById("copyMessage");
  
    if (copyEmailBtn && copyMessage) {
      copyEmailBtn.addEventListener("click", () => {
        navigator.clipboard.writeText("brendaleyva1011@gmail.com");
  
        copyMessage.classList.add("show");
  
        setTimeout(() => {
          copyMessage.classList.remove("show");
        }, 1800);
      });
    }
  
    /* FADE SECTIONS - works on any page */
    const fadeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.08 });
  
    document.querySelectorAll(".fade").forEach(el => fadeObserver.observe(el));
  
    /* HOMEPAGE GALLERY */
    const gallery = document.getElementById("gallery");
    const viewBtn = document.getElementById("viewMoreBtn");
  
    if (!gallery) return
  
    const groups = [
      ["IMG_7579.jpg","IMG_7511.jpg","IMG_7592.jpg","IMG_7634.jpg","IMG_7638.jpg","IMG_7669.jpg","0E7A0641.jpg","0E7A0679.jpg","0E7A0683.jpg","0E7A0725.jpg","0E7A0755.jpg","0E7A0760.jpg","0E7A0763.jpg","0E7A0766.jpg","0E7A0775.jpg"],
      ["ss-1.jpg","ss-2.jpg","ss-3.jpg","ss-4.jpg","ss-5.jpg","ss-6.jpg","ss-7.jpg","ss-8.jpg","ss-9.jpg","ss-10.jpg","ss-11.jpeg"],
      ["durk.jpeg","durk2.jpeg","durk3.jpeg","durk4.jpeg","durk5.jpeg","durk6.jpeg"],
      ["uzi-back.jpeg","uzi1.jpeg","uzi2.jpeg","uzi3.jpeg","uzi4.jpeg","uzi5.jpeg","uzi6.jpeg"],
      ["sexyy.jpeg","sexyy2.jpeg","sexyy3.jpeg","sexyy4.jpeg","sexyy5.jpeg","sexyy6.jpeg","sexyy7.jpeg","sexyy8.jpeg","sexyy9.jpeg"],
      ["bia.jpeg","bia1.jpeg","bia2.jpeg","bia3.jpeg"],
      ["amine.jpeg","amine2.jpeg","amine4.jpeg"],
      ["pp.jpeg","pp1.jpeg","pp2.jpeg","pp3.jpeg","pp4.jpeg"],
      ["ptv.jpeg","ptv1.jpeg","ptv2.jpeg","ptv3.jpeg"],
      ["yachty.jpeg","yachty1.jpeg","yachty2.jpeg"],
      ["don-t.jpeg","don-t1.jpeg","frights.jpeg","frights2.jpeg","icespice.jpg","icespice1.jpeg","kaytra.jpeg","laufey.jpeg","maf.jpeg","nett.jpeg","camo.jpeg","cas.jpeg","cas1.jpeg","crete.jpeg","dom.jpeg","dom1.jpeg","draft.jpeg","sybau.jpeg","sybau1.jpeg","yyy1.jpeg","yyy2.jpeg","yyy3.jpeg"]
    ];
  
    function interleave(groups) {
      const result = [];
      let index = 0;
      let keepGoing = true;
  
      while (keepGoing) {
        keepGoing = false;
  
        groups.forEach(group => {
          if (group[index]) {
            result.push(group[index]);
            keepGoing = true;
          }
        });
  
        index++;
      }
  
      return result;
    }
  
    const imageFiles = interleave(groups);
    const visibleCount = 15;
  
    let visibleFiles = imageFiles.slice(0, visibleCount);
    let hiddenFiles = imageFiles.slice(visibleCount);
    let columns = [];
    let currentColumnCount = 0;
    let isExpanded = false;
    let renderToken = 0;
    let resizeTimer;
  
    function getColumnCount() {
      const width = window.innerWidth;
  
      if (width < 650) return 1;
      if (width < 1050) return 2;
      return 3;
    }
  
    function makeColumns() {
      gallery.innerHTML = "";
      columns = [];
  
      currentColumnCount = getColumnCount();
  
      for (let i = 0; i < currentColumnCount; i++) {
        const column = document.createElement("div");
        column.className = "pin-column";
        gallery.appendChild(column);
        columns.push(column);
      }
    }
  
    function getShortestColumn() {
      let shortest = columns[0];
  
      columns.forEach(column => {
        if (column.offsetHeight < shortest.offsetHeight) {
          shortest = column;
        }
      });
  
      return shortest;
    }
  
    function createPhoto(file) {
      const photo = document.createElement("div");
      photo.className = "photo";
  
      const img = document.createElement("img");
      img.src = "images/" + file;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
  
      img.addEventListener("load", () => {
        setTimeout(() => {
          photo.classList.add("show");
        }, 120);
      });
  
      img.addEventListener("error", () => {
        console.warn("Image failed to load:", file);
        photo.remove();
      });
  
      photo.appendChild(img);
      return photo;
    }
  
    function addPhotoToBoard(file, token, delay = 0) {
      setTimeout(() => {
        if (token !== renderToken) return;
  
        const photo = createPhoto(file);
        getShortestColumn().appendChild(photo);
      }, delay);
    }
  
    function renderGallery(files, shouldAnimate = true) {
      renderToken++;
      const token = renderToken;
  
      makeColumns();
  
      files.forEach((file, index) => {
        const delay = shouldAnimate ? index * 35 : 0;
        addPhotoToBoard(file, token, delay);
      });
    }
  
    renderGallery(visibleFiles, true);  
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
  
      resizeTimer = setTimeout(() => {
        const newColumnCount = getColumnCount();
  
        if (newColumnCount !== currentColumnCount) {
          renderGallery(isExpanded ? imageFiles : visibleFiles, false);
        }
      }, 350);
    });
  
    if (viewBtn) {
      viewBtn.addEventListener("click", () => {
        if (!isExpanded) {
          isExpanded = true;
          viewBtn.textContent = "View Less";
  
          hiddenFiles.forEach((file, index) => {
            addPhotoToBoard(file, renderToken, index * 35);
          });
  
          visibleFiles = [...visibleFiles, ...hiddenFiles];
          hiddenFiles = [];
        } else {
          isExpanded = false;
          viewBtn.textContent = "View More";
  
          visibleFiles = imageFiles.slice(0, visibleCount);
          hiddenFiles = imageFiles.slice(visibleCount);
  
          renderGallery(visibleFiles, true);
        }
      });
    }
  
    /* ANCHOR SCROLL */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", e => {
        const targetID = link.getAttribute("href");
        const target = document.querySelector(targetID);
  
        if (!target) return;
  
        e.preventDefault();
  
        setTimeout(() => {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 250);
      });
    });
  
    /* PRELOAD FIRST SET ONLY */
    imageFiles.slice(0, visibleCount).forEach(file => {
      const preload = new Image();
      preload.src = "images/" + file;
    });
  
    /* FULLSCREEN VIEWER */
    let currentIndex = 0;
  
    const viewer = document.createElement("div");
    viewer.classList.add("viewer");
  
    const viewerImg = document.createElement("img");
    viewer.appendChild(viewerImg);
  
    const closeBtn = document.createElement("div");
    closeBtn.innerHTML = "✕";
    closeBtn.classList.add("close-btn");
    viewer.appendChild(closeBtn);
  
    const leftArrow = document.createElement("div");
    leftArrow.innerHTML = "‹";
    leftArrow.classList.add("arrow", "left");
    viewer.appendChild(leftArrow);
  
    const rightArrow = document.createElement("div");
    rightArrow.innerHTML = "›";
    rightArrow.classList.add("arrow", "right");
    viewer.appendChild(rightArrow);
  
    document.body.appendChild(viewer);
  
    function getViewerImages() {
      return Array.from(document.querySelectorAll(".photo img"));
    }
  
    function showImage() {
      const images = getViewerImages();
      if (!images.length) return;
      viewerImg.src = images[currentIndex].src;
    }
  
    function openViewer(img) {
      const images = getViewerImages();
      currentIndex = images.indexOf(img);
      showImage();
      viewer.classList.add("active");
    }
  
    function closeViewer() {
      viewer.classList.remove("active");
    }
  
    function nextImage() {
      const images = getViewerImages();
      if (!images.length) return;
      currentIndex = (currentIndex + 1) % images.length;
      showImage();
    }
  
    function prevImage() {
      const images = getViewerImages();
      if (!images.length) return;
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage();
    }
  
    document.body.addEventListener("click", e => {
      if (e.target.tagName === "IMG" && e.target.closest(".photo")) {
        openViewer(e.target);
      }
    });
  
    rightArrow.addEventListener("click", e => {
      e.stopPropagation();
      nextImage();
    });
  
    leftArrow.addEventListener("click", e => {
      e.stopPropagation();
      prevImage();
    });
  
    closeBtn.addEventListener("click", e => {
      e.stopPropagation();
      closeViewer();
    });
  
    viewer.addEventListener("click", e => {
      if (e.target === viewer) closeViewer();
    });
  
    document.addEventListener("keydown", e => {
      if (!viewer.classList.contains("active")) return;
  
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeViewer();
    });
  
    let startX = 0;
  
    viewer.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    });
  
    viewer.addEventListener("touchend", e => {
      const endX = e.changedTouches[0].clientX;
  
      if (startX > endX + 50) nextImage();
      if (startX < endX - 50) prevImage();
    });
  });