
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, background, gameOverImg, gameOver, restart;
var banana ,bananaImage, obstacle, obstacleImage, restartImg;
var score ;
var FoodGroup, obstacleGroup;

var jungleSound, defeatSound;

var survivalTime = 0;



function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 500);
  
 

  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  
  ground = createSprite(600 ,350,900,10);
  ground.velocityX=-4 ;
  ground.x=ground.width/2;
  
  
  console.log(ground.x);
  score=0;
  

  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  survivalTime = 0;
  
}

function draw() {
   background("lightblue")
  
  if(gameState === PLAY){

    stroke("white");
    textSize(20);
    fill("white");
    text("Score: "+ score, 500,50);
    
   
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) ;
  text("Survival Time: "+ survivalTime, 250,100); 
   ground.velocityX=-4;
    
    if(keyDown("space")&& monkey.y >= 100) {
      monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    
  if(ground.x<600) {
    ground.x=ground.width/2;
   
  }
    
    
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
    
    if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+1;
    
  }
  
    
    if(obstaclesGroup.isTouching(monkey)){
      
      
 gameState = END;
  }
  }
  else if (gameState === END){
    
  
    monkey.visible = false;
  ground.velocityX = 0;
  monkey.velocityY = 0;  
  FoodGroup.setVelocityEach(0);
  obstaclesGroup.setVelocityEach(0);
    ground.visible = false;
      
    
    
  
  }
   drawSprites();
}



function spawnFood() {
  if (frameCount % 200 === 0) {
    banana = createSprite(600,500,10,500);
    banana.y = Math.round(random(120,200));;    
    banana.velocityX = -3;
    banana.addImage(bananaImage);
    banana.scale=0.08;
    banana.lifetime = 300;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;   
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;         
    obstacle.lifetime = 300;    
    obstaclesGroup.add(obstacle);
  }
}








