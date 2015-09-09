// Generated by CoffeeScript 1.6.3
(function() {
  var fillDigits, gameOver, gameStart, iml, _;

  _ = this;

  this.VERSION = 0.1;

  this.BUILD = 18;

  this.WIDTH = 240;

  this.HEIGHT = 360;

  this.SCALE = 1;

  this.score = 0;

  this.game = false;

  this.odt = -1;

  this.odt2 = -1;

  this.odtc = 0;

  this.lag = 0;

  this.maxLag = 3;

  this.minSpd = .8;

  this.difficulty = .5;

  this.player = {
    x: WIDTH * .5,
    y: HEIGHT * .5
  };

  this.moveTo = {
    x: player.x,
    y: player.y
  };

  this.target = {
    x: Math.random() * (WIDTH - 20) + 10,
    y: Math.random() * (HEIGHT - 60) + 40
  };

  this.enemies = [];

  enemies.push({
    x: Math.random() * WIDTH,
    y: Math.random() * HEIGHT,
    tx: player.x,
    ty: player.y
  });

  document.write("<center><canvas width='" + (WIDTH * SCALE) + "' height='" + (HEIGHT * SCALE) + "'></canvas><p></p><p>Speed Optimisation&emsp;<input id='iml' type='range' min='0' max='0.98' step='0.02' value='" + minSpd + "'></p><p>Click to Start/Restart</p></center>");

  iml = document.querySelector('input#iml');

  iml.addEventListener('change', function() {
    _.minSpd = parseFloat(iml.value);
    return console.log("Speed Optimisation: " + _.minSpd);
  });

  this.cp = document.querySelector('canvas');

  this.c = cp.getContext('2d');

  cp.style.border = '1px solid white';

  cp.style.boxShadow = '0 2px 6px gray';

  c.scale(SCALE, SCALE);

  c.font = 'bold 18px monospace';

  c.textAlign = 'right';

  c.textBaseline = 'middle';

  c.fillStyle = 'black';

  c.strokeStyle = 'black';

  c.lineWidth = 2;

  c.strokeRect(1, 1, WIDTH - 2, HEIGHT - 2);

  fillDigits = function(n, l) {
    var a;
    a = Array(l).join('0');
    a += n | 0;
    return a.slice(-l);
  };

  gameOver = function() {
    _.game = false;
    _.enemies.length = 0;
    return true;
  };

  gameStart = function() {
    if (!_.game) {
      _.score = 0;
      _.difficulty = .5;
      _.player = {
        x: WIDTH * .5,
        y: HEIGHT * .5
      };
      _.moveTo = {
        x: player.x,
        y: player.y
      };
      _.target = {
        x: Math.random() * (WIDTH - 20) + 10,
        y: Math.random() * (HEIGHT - 60) + 40
      };
      _.enemies = [];
      _.enemies.push({
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT,
        tx: player.x,
        ty: player.y
      });
      _.game = true;
    }
    return true;
  };

  this.oldTime = Date.now();

  this.draw = function() {
    var dt, e, i, p, _i, _j, _len, _len1, _ref, _ref1;
    dt = (Date.now() - _.oldTime) * .1;
    if (_.game) {
      _.difficulty += dt * .00005;
      if (_.odt2 < dt) {
        _.odt2 = dt;
      }
      ++_.odtc;
      if (_.odt < dt && _.odtc > 9) {
        _.odt = dt;
      }
      try {
        _.score += dt / 100;
        if (_.moveTo.x !== _.player.x || _.moveTo.y !== _.player.y) {
          _.player.x += dt * Math.cos(Math.atan2(_.moveTo.y - _.player.y, _.moveTo.x - _.player.x));
          _.player.y += dt * Math.sin(Math.atan2(_.moveTo.y - _.player.y, _.moveTo.x - _.player.x));
        }
        if ((_.player.x - _.target.x) * (_.player.x - _.target.x) + (_.player.y - _.target.y) * (_.player.y - _.target.y) < 100) {
          _.score += 10;
          _.target = {
            x: Math.random() * (WIDTH - 20) + 10,
            y: Math.random() * (HEIGHT - 60) + 40
          };
        }
        if (_.score % 10 > 9) {
          enemies.push({
            x: _.player.x + 200 * Math.cos(Math.atan2(_.moveTo.y - _.player.y, _.moveTo.x - _.player.x)),
            y: _.player.y + 200 * Math.sin(Math.atan2(_.moveTo.y - _.player.y, _.moveTo.x - _.player.x)),
            tx: _.player.x,
            ty: _.player.y
          });
        }
        _ref = _.enemies;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          i.tx = _.player.x;
          i.ty = _.player.y;
          i.x += _.difficulty * dt * Math.cos(Math.atan2(i.ty - i.y, i.tx - i.x));
          i.y += _.difficulty * dt * Math.sin(Math.atan2(i.ty - i.y, i.tx - i.x));
          if ((_.player.x - i.x) * (_.player.x - i.x) + (_.player.y - i.y) * (_.player.y - i.y) < 100) {
            gameOver();
          }
        }
      } catch (_error) {}
      c.clearRect(2, 2, _.WIDTH - 4, _.HEIGHT - 4);
      c.strokeRect(1, 1, _.WIDTH - 2, 36);
      if (_.game) {
        c.fillText(fillDigits(_.score, 5), _.WIDTH - 10, 19);
      } else {
        c.fillText("GAME OVER - " + (fillDigits(_.score, 5)), _.WIDTH - 10, 19);
      }
      p = (_.score + 1) % 10 / 10;
      c.strokeRect(1, _.HEIGHT - 18, _.WIDTH - 2, 17);
      c.fillRect(2 + (_.WIDTH - 4) * p, _.HEIGHT - 17, (_.WIDTH - 4) * (1 - p), 15);
      c.fillRect(_.player.x - 5, _.player.y - 5, 10, 10);
      c.beginPath();
      c.arc(_.target.x, _.target.y, 5, 0, 2 * Math.PI, false);
      c.fill();
      _ref1 = _.enemies;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        e = _ref1[_j];
        c.beginPath();
        c.moveTo(e.x, e.y - 5);
        c.lineTo(e.x + 5, e.y + 5);
        c.lineTo(e.x - 5, e.y + 5);
        c.closePath();
        c.fill();
      }
      if (dt / _.odt < _.minSpd && _.lag > _.maxLag) {
        _.enemies.push(_.enemies[0]);
        _.enemies = _.enemies.slice(-_.enemies.length / 2);
        _.odt = dt;
      } else if (dt / _.odt < _.minSpd) {
        ++_.lag;
      } else {
        _.lag = 0;
      }
      if (dt / _.odt < _.minSpd * 1.05) {
        console.log([_.odt2 * 100 | 0, _.odtc, _.odt * 100 | 0, "" + (dt / _.odt * 100 | 0) + " / " + (_.minSpd * 100 | 0), "" + _.lag + " / " + _.maxLag]);
      }
    }
    _.oldTime = Date.now();
    return window.requestAnimationFrame(draw);
  };

  document.addEventListener('mousemove', function(e) {
    _.moveTo.x = e.clientX - _.cp.offsetLeft;
    return _.moveTo.y = e.clientY - _.cp.offsetTop;
  });

  cp.addEventListener('click', gameStart);

  draw();

  console.log("SCRIPT VERSION " + _.VERSION + " Build " + _.BUILD);

}).call(this);
