function BackgroundLayer() {
    this.children = [];
    this.spriteGroup = new Group();

    this.addElement = function(element){
        this.children.push(element);
        if (element.sprite){
            this.spriteGroup.add(element.sprite);
        }
    };

    this.draw = function () {
        for(let i = 0; i < this.children.length; i++){
            if(this.children[i].draw) {
                this.children[i].draw();
            }
        }
    };

    this.update = function () {
        for(let i = 0; i < this.children.length; i++){
            if (this.children[i].update) {
                this.children[i].update();
            }
        }
    };
}


function MapLayer() {
    this.children = [];
    this.collideGroup = new Group();
    this.displaceGroup = new Group();
    this.overlapGroup = new Group();

    this.spriteGroup = new Group();
    this.addElement = function(element){
        this.children.push(element);
        if (element.sprite){
            this.spriteGroup.add(element.sprite);
            if (element.collision) {
                switch (element.collision) {
                    case "collide": {
                        this.collideGroup.add(element.sprite);
                        break;
                    }
                    case "displace": {
                        this.displaceGroup.add(element.sprite);
                        break;
                    }
                    case "overlap": {
                        this.overlapGroup.add(element.sprite);
                        break;
                    }

                }
            }
        }
    };

    this.draw = function () {
        for(let i = 0; i < this.children.length; i++){
            this.children[i].draw();
        }
    };

    this.update = function () {
        for(let i = 0; i < this.children.length; i++){
            this.children[i].update();
        }
    };
}


function ObjectLayer() {
    this.children = [];
    this.spriteGroup = new Group();

    this.addElement = function(element){
        this.children.push(element);
        if (element.sprite){
            this.spriteGroup.add(element.sprite);
        }
    };

    this.draw = function () {
        for(let i = 0; i < this.children.length; i++){
            this.children[i].draw();
        }
    };

    this.update = function () {
        for(let i = 0; i < this.children.length; i++){
            this.children[i].update();
        }
    };

}