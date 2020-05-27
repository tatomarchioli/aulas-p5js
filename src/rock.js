function Rock(layer, i){
    this.sprite = createSprite(random(-width, map.mapWidth+width), random(-height, map.mapHeight+height));
    this.sprite.addAnimation('normal', 'assets/rocks'+i%3+'.png');

    this.visible = true;
    this.shouldUpdate = true;

    this.draw = function () {
        if(!this.visible) {
            this.sprite.visible = false;
        }
    };

    this.update = function () {

    };

    layer.addElement(this);
}