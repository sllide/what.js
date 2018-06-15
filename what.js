//Enter the konami code to randomize css values
//copyrights and stuff Jari Stephan
//https://github.com/sllide/what.js

$(document).ready(function(){
if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number] 
        : match
      ;
    });
  };
}

function randomItem(array) {
  return array[Math.floor(Math.random()*array.length)];
}

var attacks = {
    'transform': (function(){
      return String.format("{0}({1}deg)", randomItem(['rotate', 'rotateX', 'rotateY', 'skewX', 'skewY']) ,Math.floor((Math.random()*4)-2))
    }),
    'background-color': (function(){
      return String.format("rgba({0},{1},{2},{3})", Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255))
    }),
    'background-color': (function(){
      return String.format("rgba({0},{1},{2},{3})", Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255))
    }),
    'font-size': (function(){
      return String.format("{0}px", Math.round(Math.random()*20)+5)
    }),
    'filter': (function(){
      return String.format("{0}({1}%)", randomItem(['sepia', 'saturate', 'invert']), Math.round(Math.random()*25))
    }),
    'float': (function(){
      return randomItem(['left', 'right'])
    }),
}

function attack(el) {
  el = $(el);
  var attack = Math.floor(Math.random() * Object.keys(attacks).length);
  var chosenAttack = Object.keys(attacks)[Math.floor(Math.random() * Object.keys(attacks).length)];
  var prev = el.css(chosenAttack);
  var next = attacks[chosenAttack]();
  el.css(chosenAttack, next);
  dive(el);
}

function dive(el=$("body")) {
  var c = el.children();
  for(var i=c.length-1;i>=0;i--) {
    if(c[i].tagName==='SCRIPT') {
      c.splice(i, 1);
    }
  }

  for(var i=c.length-1;i>=0;i--) {
    attack(c[i]);
  }
}

  
var keys = [], konami = [38,38,40,40,37,39,37,39,66,65];
function keyChecker(e) {
  keys.push(e.keyCode);
  if(keys.length > konami.length) {
    keys.shift();
  }
  if (JSON.stringify(keys)===JSON.stringify(konami)) {
    dive();
    window.removeEventListener("keyup", keyChecker, true);
  }
}
  window.addEventListener("keyup", keyChecker, true);
});
