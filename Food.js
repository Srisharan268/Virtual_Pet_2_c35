class Food{
    constructor(){
        this.milkImg = loadImage("milk.png");
        this.foodStock;
    }

    getFoodStock(){
    var a = database.ref('Food')
    a.on("value",(data)=>{
    this.foodStock = data.val();
    });
    }

    updateFoodStock(d){
        database.ref('/').update({
            Food : d
        })
    }

    deductFood(){

    }

    display(){
        var x = 80,y = 140;
        imageMode(CENTER)

        if(this.foodStock != 0){
            for(var i=0 ; i < this.foodStock; i++){
                if(i%10 == 0){
                    x = 80;
                    y += 75;
                }
                image(this.milkImg,x,y,75,75);
                x += 50
            }
        }
    }
}