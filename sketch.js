/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, cowboy_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1,obstacle2;

var score=0;

var gameOver, restart;
var cowboyImg
var iGround


function preload(){
  cowboyImg = loadAnimation("cowboy_1.png","cowboy_2.png","cowboy_3.png","cowboy_4.png")
  cowboy_collided = loadImage("cowboy_2.png")
  jungleImage = loadImage("assets/bg.png");
  obstacel1Img = loadImage("assets/stone.png")
  obstacle2Img = loadImage("assets/monster1img.png")
  obstacle3Img = loadImage("assets/kimg.png")
  cashImg = loadImage("assets/cash.png");
restartImg = loadImage("assets/restart.png")

  collided = loadSound("assets/collided.wav")
jump = loadSound("assets/jump.wav")

gameOverImg = loadImage("assets/gameOver.png");
restartImg = loadImage("assets/restart.png");


}

function setup() {
  createCanvas(800, 400);


  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  cowboy = createSprite(50,300,20,50)
  cowboy.addAnimation("running",cowboyImg)

  cowboy.scale = 0.25;
  gameOver = createSprite(400,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(550,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
iGround = createSprite(400,350,1600,10)
iGround.visible = false



      
cashCollectionGroup = new Group();

obstaclesGroup = new Group()


}

function draw() {
  background(255);
  
 // kangaroo.x=camera.position.x-270;
 if (gameState===PLAY)
 {
   jungle.velocityX = -3
  if(jungle.x<100){
    jungle.x = 400 
  }
  if(keyDown("SPACE")&& cowboy.y>170){
    cowboy.velocityY = -5
    jump.play()
  }
  
  cowboy.velocityY += 0.8


  cowboy.collide(iGround)
enemy();
dims();

if(obstaclesGroup.isTouching(cowboy)){
  gameState = END
}
if (cashCollectionGroup.isTouching(cowboy)){
  score+=1
  cashCollectionGroup.destroyEach()
}

 }
 else if(gameState===END)
 {
  gameOver.x=450
  restart.x=450
  gameOver.visible = true;
  restart.visible = true;

cowboy.velocityY=0
jungle.velocityX=0
obstaclesGroup.setVelocityXEach(0);
obstaclesGroup.setLifetimeEach(-1);
cowboy.changeImage("collided",cowboy_collided)
cashCollectionGroup.setVelocityXEach(0);
cashCollectionGroup.setLifetimeEach(-1);
if(mousePressedOver(restart)) {
  reset();

}
 }



  drawSprites();

  textSize(20);
  stroke(3);
  fill("black")
  text("Score: "+ score, camera.position.x,50);
  
  if(score >= 5){
    cowboy.visible = false;
    textSize(30);
    stroke(3);
    fill("black");
    text("Congragulations!! You win the game!! ", 70,200);
    

}
}
function enemy(){
  
  if(frameCount % 180 === 0) {
    var obstacle = createSprite(600,320,10,40);
    
    obstacle.setCollider("rectangle",0,0,200,200)
    obstacle.debug = false;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacel1Img);
              break;
      case 2: obstacle.addImage(obstacle2Img);
              break;
 
      default: break;
    
  }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);


}
}


function dims() {
  if(frameCount % 150 === 0) {

    var cashCollection = createSprite(camera.position.x+400,330,40,40);
    cashCollection.setCollider("rectangle",0,0,200,200)
    cashCollection.debug = false;
    cashCollection.addImage(cashImg);
    cashCollection.velocityX = -(6 + 3*score/100)
    cashCollection.scale = 0.15;
    //assign scale and lifetime to the obstacle           
    cashCollection.lifetime = 400;
    //add each obstacle to the group
    cashCollectionGroup.add(cashCollection);
    
  }
}




function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  cowboy.visible = true;
  cowboy.changeAnimation("running", cowboyImg);
  obstaclesGroup.destroyEach();
  cashCollectionGroup.destroyEach();
  score = 0;
}
