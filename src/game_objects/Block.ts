import {GameObject} from "./GameObject";
import {Player} from "./players/Player";

abstract class Block extends GameObject {
    protected destinationState: string;
    private movementTime: number = 300;
    private nextValue: { x: number, y: number };
    private speed: number;

    public create(): void {
        super.create();
        this.moveOver = this.moveOver.bind(this);
        this.collideWithPlayer = this.collideWithPlayer.bind(this);
        this.update = this.update.bind(this);
        //this.setNotImmovable();
        this.sprite.body.stopVelocityOnCollide = false;
        this.sprite.body.speed = 128;
        this.sprite.body.onMoveComplete.add(this.moveOver);
        this.sprite.body.acceleration = 0;
        this.sprite.body.drag = 0;
        this.sprite.body.friction = 0;
    }

    public update(): void {
        super.update();
        const moving: boolean = this.sprite.body.isMoving;

        if (this.nextValue) {
            switch (this.sprite.body.facing) {
                case Phaser.UP:
                    if (this.sprite.body.y >= this.nextValue.y) {
                        this.sprite.body.y = this.nextValue.y;
                        this.sprite.body.x = this.nextValue.x;
                        this.sprite.body.stopMovement(0);
                    }
                    break;
                case Phaser.RIGHT:
                    if (this.sprite.body.x <= this.nextValue.x) {
                        this.sprite.body.y = this.nextValue.y;
                        this.sprite.body.x = this.nextValue.x;
                        this.sprite.body.stopMovement(0);
                    }
                    break;
                case Phaser.LEFT:
                    if (this.sprite.body.x >= this.nextValue.x) {
                        this.sprite.body.y = this.nextValue.y;
                        this.sprite.body.x = this.nextValue.x;
                        this.sprite.body.stopMovement(0);
                    }
                    break;
                case Phaser.DOWN:
                    if (this.sprite.body.y <= this.nextValue.y) {
                        //this.props.game.add.tween(this.sprite).to( { x: this.nextValue.x }, 300, "Quart.easeOut");
                        //this.props.game.add.tween(this.sprite).to( { y: this.nextValue.y }, 300, "Quart.easeOut");
                        //
                         this.sprite.body.y = this.nextValue.y;
                         this.sprite.body.x = this.nextValue.x;
                        //this.sprite.body.stopMovement(0);
                    }
                    break;
            }
        }
    }

    public collideWithPlayer(): void {
        const player: Player = this.level.getPlayer();
        player.forceNoMove();
        this.speed = player.speed;
        this.sprite.body.speed = this.speed;
        console.log(this.speed);
        const moving: boolean = this.sprite.body.isMoving;

        if (!moving) {
            const facing: number = player.sprite.body.facing;
            if (facing === Phaser.UP) {
                this.sprite.body.facing = Phaser.UP;
                this.sprite.body.faceTop = true;
                this.nextValue = {x: this.sprite.body.x, y: this.sprite.body.y - this.speed};
                this.sprite.body.moveTo(this.movementTime, this.speed, Phaser.ANGLE_UP);
            } else if (facing === Phaser.RIGHT) {
                this.sprite.body.facing = Phaser.RIGHT;
                this.nextValue = {x: this.sprite.body.x + this.speed, y: this.sprite.body.y};
                this.sprite.body.moveTo(this.movementTime, this.speed, Phaser.ANGLE_RIGHT);
            } else if (facing === Phaser.LEFT) {
                this.sprite.body.facing = Phaser.LEFT;
                this.nextValue = {x: this.sprite.body.x - this.speed, y: this.sprite.body.y};
                this.sprite.body.moveTo(this.movementTime, this.speed, Phaser.ANGLE_LEFT);
            } else if (facing === Phaser.DOWN) {
                this.sprite.body.facing = Phaser.DOWN;
                console.log("going down before", this.sprite.body.y);
                this.nextValue = {x: this.sprite.body.x, y: this.sprite.body.y + this.speed};
                this.sprite.body.moveTo(this.movementTime, this.speed, Phaser.ANGLE_DOWN);
                console.log("going down", this.nextValue);

            }
        }
    }

    private moveOver(): void {
        this.sprite.body.velocity.y = 0;
        this.sprite.body.velocity.x = 0;
    }

}

export {Block};
