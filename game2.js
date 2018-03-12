window.onload = function restart() {
var player = document.getElementById("player");
var bg = document.getElementById("background");
var hpBar = document.getElementById("hp");
var score = document.getElementById("score");
var hp = 0;
var points=0;
    function preventBehavior(e) {
    e.preventDefault(); 
}

document.addEventListener("touchmove", preventBehavior, false);
function mousePos() {
    var y=window.event.clientY-bg.offsetTop-20;
    player.style.top = y +"px";
}
    
function newEnemy() {
var g = document.createElement('div');
bg.appendChild(g);
g.className = "enemy";
g.style.right= "-30px";
g.style.transition = "right 1.3s";
}
setInterval(scoreF,100);
function scoreF() {
    var enemy = document.getElementsByClassName("enemy")[0];
    points++;
    score.innerHTML="SCORE: "+points;
    if (enemy.style.border == "3px solid yellow")
        { score.style.fontSize="30px";} else
        { score.style.fontSize="20px";}
}
function collision(){
    var y1 = player.offsetTop;
    var y2 = player.offsetTop+40;
    var x1 = player.offsetLeft+40;
    var enemy = document.getElementsByClassName("enemy")[0];
    var ey1 = enemy.offsetTop;
    var ey2 = enemy.offsetTop+80;
    var ex1 = enemy.offsetLeft+30;
    if(ex1<x1&&ex1>-10){
        if (y2>ey1&&y1<ey2){
        if (enemy.style.backgroundColor != "gold")
            {hp+=8;
            enemy.style.backgroundColor="red";
            
            if (hp>300){
                youLost();
            } else
            hpBar.style.width = hp + "px";
            } else {
                points+=10;
                enemy.style.border="3px solid yellow";
                  }
        }
    } 
}
function eneMove2(){
    var colors = ["gold","#af4d48","#af4d48"];
    var enemy = document.getElementsByClassName("enemy");
    enemy[0].style.backgroundColor = colors[Math.floor(Math.random()*3)];
    enemy[0].style.top = Math.floor(Math.random()*300)-60+"px";
    if (enemy[0].style.backgroundColor=="gold")
    {
    enemy[0].style.border = "2px solid brown";
    enemy[0].style.zIndex ="-1";
    }
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
     alert("You Lost!\nYOUR SCORE: "+points+" \n Thanks for playing, comments are always appreciated :)");
   
    document.location.reload();
    
}
function pls3(){
var sett = setInterval(collision,1000/60);
}


bg.addEventListener("touchmove",mousePos);
setInterval(newEnemy,1000);
setTimeout(pls2,10);
setTimeout(pls,1000);
setTimeout(pls3,1500);
};

function mousePos() {
var player = document.getElementById("player");
var bg = document.getElementById("background");

    var y=window.event.targetTouches[0].pageY-bg.offsetTop-20;
    player.style.top = y +"px";
}