const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const background = new Image();
background.src = '/assets/background.png';

const pipeImage = new Image();
pipeImage.src = '/assets/pipe.png'

const duck = new Image();
duck.src = '/assets/duck.png'

const duck2 = new Image();
duck2.src = '/assets/duck2.png'

const dduck = new Image();
dduck.src = '/assets/dduck.png'

const coin = new Audio()
coin.src = '/assets/coin.mp3'

const backSound = new Audio()
backSound.src = '/assets/backSound.mp3'
backSound.volume = 0.20

backSound.onended = () => {
  setTimeout(() => {
    backSound.play()
  }, 1500);
};

// general settings
let gamePlaying = false;
const gravity = .5;
const speed = 8.2;
const size = [51, 36];
const jump = -9.5;
const cTenth = (canvas.width / 10);
let flying = false

let index = 0,
    bestScore = 0, 
    flight, 
    flyHeight, 
    currentScore, 
    pipe;

// pipe settings
const pipeWidth = 78;
let pipeGap = 270;
const pipeLoc = () => (canvas.height / 2) - 150 + (Math.random() * 100);

const setup = () => {
  currentScore = 0;
  flight = jump;

  // set initial flyHeight (middle of screen - size of the bird)
  flyHeight = (canvas.height / 2) - (size[1] / 2);

  // setup first 3 pipes
  pipes = Array(3).fill().map((a, i) => [canvas.width + (i * (pipeGap + pipeWidth)), pipeLoc()]);
  backSound.play()
}

const render = () => {
  backSound.play()
  // make the pipe and bird moving 
  index++;

  if(pipeGap >= 150){
    pipeGap -= (Math.random() / 3)
  }

  // ctx.clearRect(0, 0, canvas.width, canvas.height);

  // background first part 
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  // background second part
  // ctx.drawImage(background, 0, 0, canvas.width, canvas.height, -(index * (speed / 2)) % canvas.width, 0, canvas.width, canvas.height);
  
  // pipe display
  if (gamePlaying){
    pipes.map(pipe => {
      // pipe moving
      pipe[0] -= speed;

      ctx.drawImage(pipeImage, pipe[0], 0, 30, pipe[1]);
      ctx.drawImage(pipeImage, pipe[0], canvas.height - pipe[1], 30, pipe[1]);
      // take one point+create new pipe
      if(pipe[0] <= -pipeWidth){
        currentScore++;
        // check if it's the best score
        bestScore = Math.max(bestScore, currentScore);
        
        // remove & create new pipe
        pipes = [...pipes.slice(1), [pipes[pipes.length-1][0] + pipeGap + pipeWidth, pipeLoc()]];
      }
    
      // if hit the pipe, end
      if ([
        pipe[0] <= cTenth + size[0], 
        pipe[0] + pipeWidth >= cTenth, 
        pipe[1] > flyHeight  || pipe[1] + 270 < flyHeight + size[1]
      ].every(elem => elem)) {
        gamePlaying = false;
        setup();
      }
    })
  }
  // draw duck
  if (gamePlaying) {
    if(flying){
      ctx.drawImage(duck2, 0, flyHeight, ...size);
    }else{ 
      ctx.drawImage(duck, 0, flyHeight, ...size);
    }
    flight += gravity;
    flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);
  } else {
    ctx.drawImage(dduck, (canvas.width / 2 - size[1]), (canvas.height / 2) + (size[1] / 2), ...size);
    flyHeight = (canvas.height / 2) - (size[1] / 2);
      // text accueil
    let topText = `Meilleur score : ${bestScore}`
    let bottomText = 'Cliquez pour jouer'
    ctx.fillText(topText, (canvas.width / 2) - (ctx.measureText(topText).width / 2), 245);
    ctx.fillText(bottomText, (canvas.width / 2) - (ctx.measureText(bottomText).width / 2), 535);
    ctx.font = "bold 30px BinaryWaters";
  }

  document.getElementById('bestScore').innerHTML = `Meilleur : ${bestScore}`;
  document.getElementById('currentScore').innerHTML = `Actuel : ${currentScore}`;

  // tell the browser to perform anim
  window.requestAnimationFrame(render);
}

// launch setup
setup();
background.onload = render;

// start game
document.addEventListener('click', () => gamePlaying = true);

window.onclick = () => {
  flight = jump
  coin.play()
  flying = true
  setTimeout(() => {
    flying = false
  }, 200);
};

window.addEventListener('keydown', (e) => {
  if(e.keyCode == 32){
    gamePlaying = true;
    flight = jump;
    coin.play()
    flying = true
    setTimeout(() => {
      flying = false
    }, 200);
  }
})