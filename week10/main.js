document.querySelectorAll('.term').forEach(term => {
  term.addEventListener('click', () =>
    term.nextElementSibling.classList.toggle('open')
  );
});


const messages = document.getElementById('messages');
const input = document.getElementById('input-field');
const btn = document.getElementById('send-btn');

function timestamp() {
  const d = new Date();
  return d.toLocaleString();
}

function addMessage(text, user = "You") {
  const div = document.createElement('div');
  div.className = 'post';
  div.innerHTML = `
    <span class="user">${user}</span>
    <div>${text}</div>
    <div class="timestamp">${timestamp()}</div>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// Send message
btn.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "You");
  input.value = "";

  // NPC reply
  const npcUsers = ["Anon42", "SigmaDropout", "BasedUnit77", "NeckbeardMage", "GymcelSupreme"];
  const npcLines = [
    "bro fr? that's a massive L",
    "skill issue tbh",
    "cope harder lol",
    "should've kept looksmaxxing",
    "ngl that's kinda omega behavior",
    "touch grass challenge (impossible)",
    "brutal. simply brutal.",
    "peak blackpill moment"
  ];

  setTimeout(() => {
    const u = npcUsers[Math.floor(Math.random() * npcUsers.length)];
    const line = npcLines[Math.floor(Math.random() * npcLines.length)];
    addMessage(line, u);
  }, 400 + Math.random() * 1200);
});


input.addEventListener('keydown', e => {
  if (e.key === 'Enter') btn.click();
});


const npcUsers2 = ["Anon42", "SigmaDropout", "BasedUnit77", "NeckbeardMage", "GymcelSupreme", "DoomerDruid", "AscendedChad"];
const npcLines2 = [
  "ngl ur take is trash bro",
  "nah bc BasedUnit77 actually has a point??",
  "imagine thinking that lmao",
  "mid argument, try again",
  "bro cooked with this one fr",
  "stfu cuck you're always coping",
  "ratioed + mogged",
  "this thread going nowhere ngl",
  "simps ruin everything",
  "getting mogged by a low tier? embarrassing"

];

function npcChatterLoop() {
  const u = npcUsers2[Math.floor(Math.random() * npcUsers2.length)];
  const line = npcLines2[Math.floor(Math.random() * npcLines2.length)];
  addMessage(line, u);

  setTimeout(npcChatterLoop, 3000 + Math.random() * 5000);
}

setTimeout(npcChatterLoop, 5000);
