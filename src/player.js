function Player(layer) {
    const UPKEY = 38;
    const LKEY = 37;
    const RKEY = 39;

    const Q = 81;
    const E = 69;
    const SHIFT = 16;

    // properties
    this.mass = 1.5;
    this.jumpSpeed = 16;
    this.maxWalkSpeed = 15;
    this.dashSpeed = 50;
    this.dashCooldown = 150;
    this.dashDuration = 8;

    // states
    this.facing = "r";
    this.walkSpeed = 0;
    this.dashActive = false;
    this.dashCooldownCount = 0;
    this.dashDurationCount = 0;


    //sprite
    this.sprite = createSprite(map.spawnPoint.x, map.spawnPoint.y);
    this.sprite.debug = DEBUG;
    this.sprite.setCollider("rectangle",0,0,50,90);
    this.sprite.addAnimation('normal', 'assets/hero.png');

    this.visible = true;
    this.shouldUpdate = true;

    this.draw = function () {
        if(!this.visible) {
            this.sprite.visible = false;
        }

        if(DEBUG){
            textSize(32);
            text('Cooldown: '+(player.dashCooldownCount), player.sprite.position.x, player.sprite.position.y);
        }
    };

    this.update = function () {
        if (this.shouldUpdate) {
            this.aplyGravity();
            this.aplyControlls();
            this.resetCooldown();
            this.checkDeath();
        }
    };

    this.aplyGravity = function(){
        this.sprite.mass = this.mass;
        this.sprite.velocity.y += this.mass * GRAVITY;

        //bounce top
        if(this.sprite.touching.top){
            this.sprite.velocity.y = 5;
        }

        if (this.sprite.touching.bottom){
            this.sprite.velocity.y = 0;
        }
    };


    this.aplyControlls = function(){

        if(!this.dashCheck())
            this.walk();

        if(keyIsPressed(SHIFT)){
            this.dash();
        }

        if(keyIsPressed(UPKEY)){
            this.jump();
        }
    };

    this.walk = function () {
        let rk = keyIsPressed(RKEY);
        let lk = keyIsPressed(LKEY);
        if(!rk && !lk){
            if (this.walkSpeed < 0)
                this.walkSpeed+=1;
            else if (this.walkSpeed > 0)
                this.walkSpeed-=1;
        }

        if (rk && this.walkSpeed < this.maxWalkSpeed) {
            let increment = 1;
            if (this.walkSpeed < 0)
                increment = 2;
            this.walkSpeed+=increment;
            this.facing = "r";
        }
        if (lk && this.walkSpeed > -this.maxWalkSpeed) {
            let increment = 1;
            if (this.walkSpeed > 0)
                increment = 2;
            this.walkSpeed-=increment;
            this.facing = "l";
        }
        this.sprite.velocity.x = this.walkSpeed;
        if(this.sprite.touching.left || this.sprite.touching.right)
            this.walkSpeed = 0;

        this.sprite.mirrorX(this.facing === "r" ? -1 : 1);
    };

    this.jump = function () {
        if(this.sprite.touching.bottom){
            this.sprite.velocity.y = -this.jumpSpeed;
        }
    };


    this.dash = function () {
        if(!this.dashActive && this.dashCooldownCount === 0) {
            if (this.facing === 'r') {
                this.sprite.velocity.x = this.dashSpeed;
            } else {
                this.sprite.velocity.x = -this.dashSpeed;
            }
            this.dashActive = true;
            this.dashDurationCount = this.dashDuration;
            this.dashCooldownCount = this.dashCooldown;
        }
    };

    this.dashCheck = function () {
        if(this.dashActive && this.dashDurationCount > 0) {
            this.sprite.velocity.y = 0;
            this.dashDurationCount--;

            if(this.sprite.touching.left || this.sprite.touching.right) {
                this.dashDurationCount = 0;
                this.sprite.velocity.x = 0;
            }

            if (this.dashDurationCount === 0) {
                this.dashActive = false;
            }
        }

        return this.dashActive;
    };


    this.resetCooldown = function(){
        if(this.dashCooldownCount > 0)
            this.dashCooldownCount--;
    };

    this.checkDeath = function(){
        if(this.sprite.position.y > map.mapHeight+400){
            this.death();
        }
    };

    this.death = function () {
        this.sprite.velocity.x = 0;
        this.sprite.velocity.y = 0;
        this.sprite.position.x = map.spawnPoint.x;
        this.sprite.position.y = map.spawnPoint.y;
    };

    this.mapBlock = function () {
        if(this.sprite.position.x <= 0)
            this.sprite.position.x = 0;
        else if(this.sprite.position.x+this.sprite.width >= map.mapWidth)
            this.sprite.position.x = map.mapWidth - this.sprite.width;

        if(this.sprite.position.y <= 0)
            this.sprite.position.y = 0;
        else if(this.sprite.position.y+this.sprite.height >= map.mapHeight) {
            this.sprite.velocity.y = 0;
            this.sprite.position.y = map.mapHeight - this.sprite.height;
        }
    };

    layer.addElement(this);

}