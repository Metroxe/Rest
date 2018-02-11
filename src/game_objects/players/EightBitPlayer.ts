import {Player} from "./Player";

class EightBitPlayer extends Player {
    protected filePath: string = "assets/8-bit-character.png";
    protected key: string = "eightBitPlayer";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected walkUpAnimation: Phaser.Animation;
    protected walkRightAnimation: Phaser.Animation;
    protected walkLeftAnimation: Phaser.Animation;
    protected walkDownAnimation: Phaser.Animation;
    protected animSpeed: number = 15;

    public create(): void {
        super.create();
        this.sprite.animations.add("walkUpAnimation8bit", [6, 3, 7, 3]);
        // this.walkUpAnimation.loop = true;
        // this.walkUpAnimation.speed = this.animSpeed;
        this.sprite.animations.add("walkRightAnimation8Bit", [11, 2, 10, 2]);
        // this.walkRightAnimation.loop = true;
        // this.walkRightAnimation.speed = this.animSpeed;
        this.sprite.animations.add("walkDownAnimation8Bit", [4, 0, 5, 0]);
        // this.walkDownAnimation.loop = true;
        // this.walkDownAnimation.speed = this.animSpeed;
        this.sprite.animations.add("walkLeftAnimation8Bit", [8, 1, 9, 1]);
        // this.walkLeftAnimation.loop = true;
        // this.walkLeftAnimation.speed = this.animSpeed;
    }

    protected handleAnimation(): void {
        super.handleAnimation();

        console.log(this.sprite.body.facing);

        if (this.sprite.body.velocity.x === 0 && this.sprite.body.velocity.y === 0 && !this.sprite.body.moving) {
            switch (this.sprite.body.facing) {
                case(Phaser.UP) :
                    this.sprite.frame = 4;
                    break;
                case(Phaser.RIGHT) :
                    this.sprite.frame = 2;
                    break;
                case(Phaser.DOWN) :
                    this.sprite.frame = 0;
                    break;
                case(Phaser.LEFT) :
                    this.sprite.frame = 1;
                    break;
            }
        } else {
            switch (this.sprite.body.facing) {
                case(Phaser.UP) :
                    this.sprite.animations.play("walkUpAnimation8Bit", this.animSpeed, true);
                    break;
                case(Phaser.RIGHT) :
                    this.sprite.animations.play("walkRightAnimation8Bit", this.animSpeed, true);
                    break;
                case(Phaser.DOWN) :
                    this.sprite.animations.play("walkDownAnimation8Bit", this.animSpeed, true);
                    break;
                case(Phaser.LEFT) :
                    this.sprite.animations.play("walkLeftAnimation8Bit", this.animSpeed, true);
                    break;

            }
        }
    }
}

export {EightBitPlayer};
