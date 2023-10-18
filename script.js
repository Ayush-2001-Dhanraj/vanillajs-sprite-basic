const canvas = document.getElementById("canvas1");
const selectAnimation = document.getElementById("animations");
const ctx = canvas.getContext("2d");
const CONVAS_HEIGHT = (canvas.height = 600);
const CONVAS_WIDTH = (canvas.width = 600);

const playerImage = new Image();
playerImage.src = "shadow_dog.png";
const spriteWidth = 575; // width of entire file / no of cloumns
const spriteHeight = 523; // height of entire file / no of cloumns
let gameFrame = 0;
let staggerFrame = 3;
let playerState = "idle";
const spriteAnimation = [];
const animationStates = [
  { name: "idle", frames: 7 },
  { name: "jump", frames: 7 },
  { name: "fall", frames: 7 },
  { name: "run", frames: 9 },
  { name: "dizzy", frames: 11 },
  { name: "sit", frames: 5 },
  { name: "roll", frames: 7 },
  { name: "bite", frames: 7 },
  { name: "ko", frames: 12 },
  { name: "getHit", frames: 4 },
];

animationStates.forEach((state, index) => {
  const frame = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    const positionX = i * spriteWidth;
    const positionY = index * spriteHeight;
    frame.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimation[state.name] = frame;
});

selectAnimation.addEventListener(
  "change",
  (e) => (playerState = e.target.value)
);

function animate() {
  ctx.clearRect(0, 0, CONVAS_WIDTH, CONVAS_HEIGHT);
  let position =
    Math.floor(gameFrame / staggerFrame) %
    spriteAnimation[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimation[playerState].loc[position].y;
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
