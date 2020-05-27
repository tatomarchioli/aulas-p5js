//debug
let DEBUG = true;

//Gv
const BLOCK_SIZE = 68;
let GRAVITY = 1;

let layers = [];

let player;
let map;

let mapLayer;
let objLayer;

function setup() {
    //layers
    frameRate(30);

    let bgLayer = new BackgroundLayer();
    layers.push(bgLayer);
    mapLayer = new MapLayer();
    layers.push(mapLayer);
    objLayer = new ObjectLayer();
    layers.push(objLayer);

    //map should be created first because it defines the sizes of the scene
    map = new MapBuilder(mapLayer);

    //bg
    for(let i=0; i<80; i++){
        new Rock(bgLayer, i);
    }
    //objects
    player = new Player(objLayer);

    createCanvas(windowWidth, windowHeight-10);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight-10);
}



/*Metodos de update*/
function draw() {
    update();
    staticRender();
    render();
}

function update() {
    for(let i = 0; i < layers.length; i++){
        layers[i].update();
    }

    objLayer.spriteGroup.collide(mapLayer.collideGroup);
}

function staticRender() {
    background(240);
}

function render() {
    camera.zoom = 1;
    camera.position.x = player.sprite.position.x;
    camera.position.y = player.sprite.position.y-(BLOCK_SIZE + BLOCK_SIZE/2);
    for(let i = 0; i < layers.length; i++){
        layers[i].draw();
        drawSprites(layers[i].spriteGroup);
    }

}


/*trata os inputs*/
// function keyPressed() {
//     console.log(keyCode )
// }


let keyIsPressed = function(code){
    return keyIsDown(code);
};

let keyPressed = function (code) {
    return keyWentDown(code);
};