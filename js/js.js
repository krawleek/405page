JS:

var $ = jQuery;
$(document).ready(function(){

  var max_height = $('main').height();
  var max_width = $('main').width();
  var container = document.getElementById('canvas');
  initCanvas(container, max_width, max_height, '#ddd');

});


function createCanvas(parent, width, height) {
  var canvas = {};
  canvas.node = document.createElement('canvas');
  canvas.context = canvas.node.getContext('2d');
  canvas.node.width = width || 100;
  canvas.node.height = height || 100;
  parent.appendChild(canvas.node);
  return canvas;
}

function initCanvas(container, width, height, fillColor) {
  var canvas = createCanvas(container, width, height);
  var ctx = canvas.context;

  // define a custom fillCircle method
  ctx.fillCircle = function(x, y, radius, fillColor) {
    this.fillStyle = fillColor;
    this.beginPath();
    this.moveTo(x, y);
    this.arc(x, y, radius, 0, Math.PI * 2, false);
    this.fill();
  };
  ctx.clearTo = function(fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(0, 0, width, height);
  };
  ctx.clearTo(fillColor || "#ddd");


  // Добавление изображения рестарта
  var canvas_width = $('main').width();
  var canvas_height = $('main').height();
  img_left = canvas_width* 100 / 100 - 103;
  img_top = canvas_height * 85 / 100;
  base_image = new Image();
  base_image.src = 'img/restart-black.svg';
  base_image.onload = function(){
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(base_image, img_left, img_top, 78, 90);
  }


  // Добавление изображения закрытия
  var canvas_width = $('main').width();
  var canvas_height = $('main').height();
  img_left2 = canvas_width * 93 / 100;
  img_top2 = canvas_height * 5 / 100;
  base_image2 = new Image();
  base_image2.src = 'img/cross-black.svg';
  base_image2.onload = function(){
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(base_image2, img_left2, img_top2, 75, 75);
  }


  // Написание текста 404
  ctx.font = "500px Arial Black";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";

  var canvas_width = $('main').width();
  var canvas_height = $('main').height() + 300;
  ctx.globalCompositeOperation = "destination-out";

  ctx.fillText("404", canvas_width/2, canvas_height/2);


  // bind mouse events
  canvas.node.onmousemove = function(e) {
    if (!canvas.isDrawing) {
       return;
    }
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    var radius = 100; // or whatever
    var fillColor = '#ff0000';
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillCircle(x, y, radius, fillColor);
  };
  canvas.node.onmousedown = function(e) {
    canvas.isDrawing = true;
  };
  canvas.node.onmouseup = function(e) {
    canvas.isDrawing = false;
  };
}