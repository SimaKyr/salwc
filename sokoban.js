window.sokoban = {};
sokoban.player = {};

sokoban._levelData = '';

sokoban.onfinish = function () {

}
sokoban.importLevel = function (height, level) {
  sokoban._width = level.length / height;
  sokoban._height = height;
  sokoban._levelData = level;
}
sokoban.player.move = function (x2, y2) {
  if(sokoban._levelData.indexOf('4') == -1){
    sokoban.onfinish();
  }
  const p = sokoban.findPlayer();
  const x = p[0];
  const y = p[1];
  const nextTo = sokoban.getXYData(x+x2, y+y2);
  const afterbox = sokoban.getXYData(x+x2+x2, y+y2+y2);
  const iAm = sokoban.getXYData(x, y);
  if(nextTo == '0'){
    if(iAm == '5'){
      sokoban.setXY(x, y, 2);
    }else{
      sokoban.setXY(x, y, 0);
    }
    sokoban.setXY(x+x2, y+y2, 3);
  }
  if(nextTo == '2'){
    sokoban.setXY(x, y, 0);
    sokoban.setXY(x+x2, y+y2, 5);
  }
  if(nextTo == '4' || nextTo == '6'){
    if(afterbox == '0' || afterbox == '2'){
      sokoban.setXY(x+x2, y+y2, 0);
      if(afterbox == '2'){
        sokoban.setXY(x+x2+x2, y+y2+y2, 6);
      }else{
        sokoban.setXY(x+x2+x2, y+y2+y2, 4);
      }
      sokoban.setXY(x, y, 0);
      if(nextTo == '6'){
        sokoban.setXY(x+x2, y+y2, 5);
      }else{
        if(iAm == '5'){
          sokoban.setXY(x, y, 2);
        }
        sokoban.setXY(x+x2, y+y2, 3);
      }
    }
  }
}
sokoban.player.up = function () {
  sokoban.player.move(0, -1)
}
sokoban.player.down = function () {
  sokoban.player.move(0, 1)
}
sokoban.player.left = function () {
  sokoban.player.move(-1, 0)
}
sokoban.player.right = function () {
  sokoban.player.move(1, 0)
}
sokoban.findPlayer = function () {
  var x = 0, y = 0;
  while(y!=sokoban._height){
    x = 0;
    while(x!=sokoban._width) {
      if(sokoban.getXYData(x, y) == '3' || sokoban.getXYData(x, y) == '5'){
        return [x, y];
      }
      x++;
    }
    y++;
  }
}
sokoban.getXY = function (x, y) {
  return y*sokoban._width+x;
}
sokoban.getXYData = function (x, y) {
  return sokoban._levelData[sokoban.getXY(x, y)];
}
sokoban.setXY = function (x, y, data) {
  var tmp = sokoban._levelData.split('');
  tmp[sokoban.getXY(x, y)] = String(data);
  sokoban._levelData = tmp.join('');;
}
sokoban.level = function () {
  return sokoban._levelData;
}
