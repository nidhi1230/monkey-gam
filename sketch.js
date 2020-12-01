
var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  survivalTime = 0;
  score=0;
}


function draw() {
  //resets background
  background("white");
  
  //survivalTime
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,100,50);
  //text("Score: "+score,);
  
  //collide with the ground
  monkey.collide(ground);
  
  //scrolling ground
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //jump when space pressed
  if(keyDown("space")&&monkey.y >= 314.3){
    monkey.velocityY = -20;
  }
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8
  
  //creates food
  createFood();
  
  //creates obstacles
  createObstacles();
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    monkey.velocityY = 0;
  }
  
  drawSprites();
}






function createFood(){
  if(frameCount%80===0){
    var rand = Math.round(random(120,200));
    banana = createSprite(400,rand,200,200);
    banana.addImage(bananaImage)
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
    FoodGroup.add(banana);
  }
  
}
function createObstacles(){
  if(frameCount%300===0){
    console.log("ok");
    obstacle = createSprite(200,320,200,200);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -5;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
  
}