let sanity = 100;
let decreaseSpeed = 0.8;

const sanityBar = document.getElementById("sanity-bar");
const sanityValue = document.getElementById("sanity-value");
const warning = document.getElementById("warning");
const phone = document.getElementById("phone");
const notifications = document.getElementById("notifications");

const notifMessages = [
    "🔥 Your post is going viral!",
    "💬 Someone mentioned you.",
    "❤️ New like on your photo.",
    "⚠️ You're falling behind… check your feed.",
    "👀 Don’t miss what your friends are doing.",
    "🔔 Notifications are waiting for you."
];

function showNotifs() {
    const msg = notifMessages[Math.floor(Math.random() * notifMessages.length)];
    const note = document.createElement("div");
    note.classList.add("notifications");
    note.textContent = msg;

    notifications.appendChild(note);

    setTimeout(() => note.remove(), 1000);
}

function updateSanity(){
    sanity -= decreaseSpeed;
    if(sanity < 0){
        sanity = 0;
    }

    sanityBar.style.width = sanity + "%";
    sanityValue.textContent = "Sanity: " + Math.round(sanity) + "%";

    //warning
    if(sanity < 30 && sanity > 10){
        warning.textContent = "You're losing control...";
    } else if(sanity<= 10){
        warning.textContent = "You NEED your phone.";
    } else{
        warning.textContent = "";
    }

    if(sanity <= 45 && sanity>= 0){
        document.body.classList.add("flash-red");
    } else{
        document.body.classList.remove("flash-red");
    }

    if(sanity <85 && Math.random() < 0.08){  //80% chance of notif popping up
        showNotifs();
    }
}

setInterval(updateSanity, 200);

phone.addEventListener("click", () =>{
    sanity += 3;
    if(sanity > 100){
        sanity = 100;
    }

});