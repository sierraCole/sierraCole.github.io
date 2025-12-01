document.addEventListener("DOMContentLoaded", () => {
    const win = document.querySelector(".retro-window");
    win.style.opacity = 0;
    setTimeout(() => {
        win.style.transition = "0.6s ease";
        win.style.opacity = 1;
    }, 150);
});
