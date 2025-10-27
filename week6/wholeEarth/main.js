document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-cover");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  let current = 0;

  function showImage(nextIndex, direction) {
    const currentImg = images[current];
    const nextImg = images[nextIndex];


    currentImg.classList.remove("active");
    if (direction === "next") {
    currentImg.classList.add("exiting-left");
    } else {
    currentImg.classList.add("exiting-right");
    }
    

    nextImg.classList.add("active");
    nextImg.classList.remove("exiting-left", "exiting-right");


    setTimeout(() => {
      currentImg.classList.remove("exiting-left", "exiting-right");
    }, 600);

    current = nextIndex;
  }

  prevBtn.addEventListener("click", () => {
    const nextIndex = (current - 1 + images.length) % images.length;
    showImage(nextIndex, "prev");
  });

  nextBtn.addEventListener("click", () => {
    const nextIndex = (current + 1) % images.length;
    showImage(nextIndex, "next");
  });
});
