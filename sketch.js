//Create variables here
var dog,dogImg,happyDog,happyDogImg,foodObjStock,foodObjS,database;
var button1,button2,lastFed,fedTime,foodObj;

function preload()
{
	//load images here
  dogImg = loadImage("Dog.png");
  happyDogImg = loadImage("happydog.png");

}

function setup() {
	createCanvas(1000,600);

  dog = createSprite(750,300);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  database = firebase.database();

  foodObj = new Food();

  button1 = createButton("Feed The Dog");
  button1.position(775,200);

  button2 = createButton("Add Food");
  button2.position(885,200);

  /*foodObjStock = database.ref('foodObj');
  foodObjStock.on("value",(data)=>{
    foodObjS = data.val();
  })*/
  
}


function draw() {  
  background(46, 139, 87);
  foodObj.getFoodStock();
  foodObj.display();
  button1.mousePressed(feed);
  button2.mousePressed(addFood);
  
  console.log(foodObj.foodStock);

  drawSprites();

  fedTime = database.ref('FedTime');
  fedTime.on("value",(data)=>{
    lastFed = data.val();
  })

  fill("white");
  textSize(20)
  if(lastFed == 0){
    text("Last Fed : 12 AM",175,40);
  }else if(lastFed >= 12){
    text("Last Fed : "+lastFed%12+" PM",200,40);
  }else{
    text("Last Fed : "+lastFed+" AM",200,40);
  }

  console.log(lastFed)

  

}



  function feed(){
    dog.addImage(happyDogImg);
    if(foodObj.foodStock != 0){
    foodObj.updateFoodStock(foodObj.foodStock - 1);
    }else{
    foodObj.updateFoodStock(foodObj.foodStock);
    }
    database.ref('/').update({
      FedTime : hour()
    })
  }

  function addFood(){
    foodObj.foodStock += 1;
    database.ref('/').update({
      Food : foodObj.foodStock
    })
  }

  

