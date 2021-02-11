var swordImage, fruit1, fruit2, fruit3, fruit4, monsterImage, gameoverImage;
var sword,fruit,monster,fruitGroup,enemyGroup,score
var PLAY=1;
var END=0;
var gameState=PLAY;
var enemyGroup,fruitGroup;
var gameoverSound,knifeSound;

function preload(){
 swordImage=loadImage("sword.png");
 fruit1=loadImage("fruit1.png");
 fruit2=loadImage("fruit2.png");
 fruit3=loadImage("fruit3.png");
 fruit4=loadImage("fruit4.png");
 monsterImage=loadAnimation("alien1.png","alien2.png");
  gameoverImage=loadImage("gameover.png");
  gameoverSound=loadSound("gameover.mp3");
  knifeSound=loadSound("knifeSwooshSound.mp3");
}

function setup(){
  createCanvas(600,600);
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  enemyGroup=new Group();
  fruitGroup=new Group();
}

function draw(){
background("lightblue");
  if(gameState===PLAY){
   sword.x=mouseX;
    sword.y=mouseY;
    enemy();
    fruits();
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      knifeSound.play();
    }
    else if(enemyGroup.isTouching(sword)){
      gameState=END;
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      gameoverSound.play();
    }
  }
  else if(gameState===END){
    sword.addImage(gameoverImage);
    sword.x=200;
    sword.y=200;
  }
  drawSprites();
}

function enemy(){
  if (frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.lifetime=50;
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    var randomSide=Math.round(random(1,2));
    if(randomSide===1){
      fruit.x=0;
      fruit.velocityX=7;
    }
    else{
      fruit.x=400;
      fruit.velocityX=-7;
    }
    var randomFruit=Math.round(random(1,4));
    if(randomFruit===1){
      fruit.addImage(fruit1);
    }
    else if(randomFruit===2){
      fruit.addImage(fruit2);
    }
    else if(randomFruit===3){
      fruit.addImage(fruit3);
    }
    else{
      fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));
    fruit.lifetime=100;
    fruitGroup.add(fruit);
  }
}