window.onload = function restart() {
var player = document.getElementById("player");
var bg = document.getElementById("background");
var hpBar = document.getElementById("hp");
var score = document.getElementById("score");
var hp = 0;
var points=0;
function mousePos() {
    var x=window.event.clientX-bg.offsetLeft-20;
    var y=window.event.clientY-bg.offsetTop-20;
    player.style.top = y +"px";
}
function newEnemy() {
var g = document.createElement('div');
bg.appendChild(g);
g.className = "enemy";
g.style.right= "-30px";
g.style.transition = "right 2s";
}
setInterval(scoreF,100);
function scoreF() {
    points++
    score.innerHTML="SCORE: "+points;
}
function collision(){
    var y1 = player.offsetTop;
    var y2 = player.offsetTop+30;
    var x1 = player.offsetLeft+30;
    var enemy = document.getElementsByClassName("enemy")[0];
    var ey1 = enemy.offsetTop;
    var ey2 = enemy.offsetTop+80;
    var ex1 = enemy.offsetLeft+30;
    if(ex1<x1&&ex1>-10){
        if (y2>ey1&&y1<ey2){
            hp+=4;
            if (hp>300){
                youLost();
            } else
            hpBar.style.width = hp + "px";
        }
    } 
}
function eneMove2(){
    var enemy = document.getElementsByClassName("enemy");
    enemy[0].style.top = Math.floor(Math.random()*300)+"px";
    enemy[0].style.right = "400px";
    
}
function eneClear(){
 var enemy = document.getElementsByClassName("enemy");
    z = enemy.length;
    bg.removeChild(enemy[0]);
} 
function pls(){
    setInterval(eneClear,1000);
}

function pls2(){
    setInterval(eneMove2,1000);
}
function youLost(){
    alert("You Lost! \n Thanks for playing, comments are always appreciated :)");
    clearInterval(sett);
    restart();
}
function pls3(){
var sett = setInterval(collision,1000/60);
}


bg.addEventListener("click",mousePos);
setInterval(newEnemy,1000);
setTimeout(pls2,10);
setTimeout(pls,1000);
setTimeout(pls3,1500);
};