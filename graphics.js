var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

var reloadbtn = document.getElementById('reloadbtn');
var fps = 60;
var sizeSquare = 32;
var demoLevel = '00011111000120211111000110000001130000411040000111111111';
var normalLevel = '001111101110001012340010111042101211401010102011140644211000200111111111';

const textures = ['textures/logic.png', 'textures/chest.png', 'textures/wall.png'];
var totalLoadedTextures = 0;
var loadedTextures = {};
var finishedgame = false;
function renderGame() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  renderLevel(sokoban._height, sokoban._levelData);
  if(finishedgame){
    ctx.fillRect(5, 50, canvas.width-10, 200);
    ctx.fillStyle = '#000';
    ctx.font = '24px sans-serif';
    ctx.fillText("You are win game!", 10, 100);
    ctx.font = '15px sans-serif';
    ctx.fillText("Thank you for playing beta version of game!", 10, 150);
    ctx.fillText("Join my discord server pls.", 10, 200);
  }
}
sokoban.onfinish = function () {
  finishedgame = true;
}
// Width: ширина
document.onkeyup = function(e){
  if(!finishedgame){
    const k = e.key;
    if(k == 'ArrowUp'){
      sokoban.player.up();
    }
    if(k == 'ArrowDown'){
      sokoban.player.down();
    }
    if(k == 'ArrowLeft'){
      sokoban.player.left();
    }
    if(k == 'ArrowRight'){
      sokoban.player.right();
    }
  }
}
function loadTextures() {
  var i = 0;
  while(i != textures.length){
    loadedTextures[i] = new Image();
    loadedTextures[i].src = textures[i];
    loadedTextures[i].onload = function () {
      totalLoadedTextures++;
      if(totalLoadedTextures == textures.length){
        init();
      }
    }
    i++;
  }
}
function renderTexture(id, x, y, width, height){
  ctx.drawImage(loadedTextures[id], x, y, width, height);
}
function renderSquare(x, y, data) {
  if(data == '1'){
    renderTexture(2, x*sizeSquare, y*sizeSquare, sizeSquare, sizeSquare);
  }
  if(data == '2' || data == '6' || data == '5'){
    ctx.fillStyle = '#03fc2c';
    ctx.fillRect(x*sizeSquare, y*sizeSquare, sizeSquare, sizeSquare);
  }
  if(data == '3' || data == '5'){
    // Player
    renderTexture(0, x*sizeSquare, y*sizeSquare, sizeSquare, sizeSquare);
  }
  if(data == '4' || data == '6'){
    renderTexture(1, x*sizeSquare, y*sizeSquare, sizeSquare, sizeSquare);
  }
  if(data != '0'){
    //
    // ctx.fillStyle = '#000';
    // ctx.font = '24px sans-serif';
    // ctx.fillText(data, x*sizeSquare+5, (y+1)*sizeSquare-10);
  }
}
function renderLevel(height, level) {
  var width = level.length/height;
  var x = 0, y = 0;
  var i = 0;
  while(y!=height){
    x = 0;
    while(x!=width) {
      renderSquare(x, y, level[i]);
      i++;
      x++;
    }
    y++;
  }
}
function loadLevel() {
  finishedgame = false;
  sokoban.importLevel(9, normalLevel);
}
function init() {
  reloadbtn.onclick = loadLevel;
  loadLevel();
  renderGame();
  setInterval(renderGame, 1000/fps);
}
loadTextures();
