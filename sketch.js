var PLAY =1;
var END=0;
var gameState=1;

var monkey , monkey_running,ground,sprite_0,monkey_collided;
var banana ,bananaImage,spawnBanana, obstacle, obstacleImage;
var FoodGroup, obstacleGroup,spawnObsacle;
var survivalTime=0;
var bananaCollected=0;
var forest,groundImg;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collid = loadAnimation("sprite_0.png");
  
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  groundImg = loadImage("forest.jpg");
}



function setup() {
  createCanvas(displayWidth,displayHeight/2);

  monkey=createSprite(40,200,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
 obstacleGroup = createGroup();
  bananaGroup=createGroup();
  ground=createSprite(displayWidth/2,displayHeight/2,displayWidth*4,20)
ground.shapeColor=("green");
  monkey.addAnimation("collid",monkey_collid);


}


function draw() {
  background(groundImg);
  
      groundImg.velocityX=-4;
 if(groundImg.x<0){
  groundImg.x=groundImg.width/2;
}
textSize(22);
fill(0);



  text("survival Time:" + survivalTime,100,50);
  text("Banana Collected:"+bananaCollected,300,50);
  //text(mouseX + ',' + mouseY,100,200,30,30)
  if(gameState===PLAY){
    
    spawnObstacle();
  
    spawnBanana(); 
    
    if(keyDown("space")){
      monkey.velocityY=-10;
      
    }
    monkey.velocityY=monkey.velocityY+0.5;
    
    monkey.collide(ground); 
    
    if(monkey.isTouching(bananaGroup)){
      bananaCollected=bananaCollected+1;
      bananaGroup.destroyEach();
    }
    
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
    }
    survivalTime=Math.ceil(frameCount/frameRate());
    
    
  }else if (gameState===END){
    
obstacleGroup.setLifetimeEach(-1);
obstacleGroup.setVelocityXEach(0);
bananaGroup.setLifetimeEach(-1);
bananaGroup.setVelocityXEach(0);
monkey.collide(ground); 
monkey.changeAnimation("collid",monkey_collid);
survivalTime=survivalTime;
  monkey.velocityX=0;
  monkey.velocityY=0;
  }
  
/*
  for(var plr in allPlayers){
    index=index+1;
    x=x+200;
    y=displayHeight-allPlayers[plr].distance;
    cars[index-1].x=x;
    cars[index-1].y=y;
    if (index === player.index){
      cars[index - 1].shapeColor = "red";
    camera.position.x=displayWidth/2;
    camera.position.y=cars[index-1].y;  
  }
*/
var x = displayWidth;
var y = displayHeight/2;

for( var mon in monkey ){
x=x;
y=y;
 if(monkey === displayHeight/2){ 
   monkey.shapeColor= "blue";
   camera.position.x=displayWidth/2;
  camera.position.y=displayHeight;  
 }
}
  drawSprites();


}

function spawnObstacle(){
   if (frameCount % 120 === 0){
   
  
  obstacle=createSprite(displayWidth,displayHeight/3+90,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.15;
   obstacle.velocityX = -6 ;
     obstacle.lifetime=300;
     
   obstacleGroup.add(obstacle);
   
   }
}
function spawnBanana(){
 
  if (frameCount % 215 === 0){
  banana=createSprite(displayWidth,displayHeight/3-20,20,20);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.velocityX=-6
bananaGroup.add(banana);
   
   
    
    
}
  
}



