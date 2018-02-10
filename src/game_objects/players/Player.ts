import {GameObject, IGameObjectProps} from "../GameObject";
import InputHandler = Phaser.InputHandler;

abstract class Player extends GameObject {
    private inputHandler: InputHandler;
    private w: Phaser.Key;
    private a: Phaser.Key;
    private s: Phaser.Key;
    private d: Phaser.Key;
    private cursors: Phaser.CursorKeys;
    private speed: number = 128;
    private movementTime: number = 300;
    private nextValue: { x: number, y: number };
    private moving: boolean;

    constructor(props: IGameObjectProps) {
        super(props);
        this.moveOver = this.moveOver.bind(this);
    }

    public create(): void {
        super.create();
        this.enableControls();
        this.level.setPlayer(this);
        this.setNotImmovable();
        this.sprite.body.stopVelocityOnCollide = false;
        this.sprite.body.speed = this.speed;
        this.sprite.body.onMoveComplete.add(this.moveOver);
        this.sprite.body.acceleration = 0;
        this.sprite.body.drag = 0;
        this.sprite.body.friction = 0;
    }

    public update(): void {
        super.update();
        this.controlHandler();
    }

    private enableControls(): void {
        this.inputHandler = new InputHandler(this.sprite);
        this.w = this.props.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.a = this.props.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.s = this.props.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.d = this.props.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.cursors = this.props.game.input.keyboard.createCursorKeys();
    }

    private moveOver(): void {
        this.sprite.body.velocity.y = 0;
        this.sprite.body.velocity.x = 0;

    }

    private controlHandler(): void {

        const moving: boolean = this.sprite.body.isMoving;

        if (!moving && !this.moving) {
            const up: boolean = (this.w.isDown || this.cursors.up.isDown);
            const right: boolean = (this.d.isDown || this.cursors.right.isDown);
            const left: boolean = (this.a.isDown || this.cursors.left.isDown);
            const down: boolean = (this.s.isDown || this.cursors.down.isDown);
            if (up) {
                this.sprite.body.facing = Phaser.UP;
                this.sprite.body.faceTop = true;
                this.nextValue = {x: this.sprite.body.x, y: this.sprite.body.y - this.speed};
                this.sprite.body.moveTo(this.movementTime, this.speed, Phaser.ANGLE_UP);
            } else if (right) {
                this.sprite.body.facing = Phaser.RIGHT;
                this.nextValue = {x: this.sprite.body.x + this.speed, y: this.sprite.body.y};
                this.sprite.body.moveTo(this.movementTime, this.speed, Phaser.ANGLE_RIGHT);
            } else if (left) {
                this.sprite.body.facing = Phaser.LEFT;
                this.nextValue = {x: this.sprite.body.x - this.speed, y: this.sprite.body.y};
                this.sprite.body.moveTo(this.movementTime, this.speed, Phaser.ANGLE_LEFT);
            } else if (down) {
                this.sprite.body.facing = Phaser.DOWN;
                this.nextValue = {x: this.sprite.body.x, y: this.sprite.body.y + this.speed};
                this.sprite.body.moveTo(this.movementTime, this.speed, Phaser.ANGLE_DOWN);
            }
        } else {
            switch (this.sprite.body.facing) {
                case Phaser.UP:
                    if (this.sprite.body.y <= this.nextValue.y) {
                        this.sprite.body.y = this.nextValue.y;
                        this.sprite.body.x = this.nextValue.x;
                        this.sprite.body.stopMovement(0);
                    }
                    break;
                case Phaser.RIGHT:
                    if (this.sprite.body.x >= this.nextValue.x) {
                        this.sprite.body.y = this.nextValue.y;
                        this.sprite.body.x = this.nextValue.x;
                        this.sprite.body.stopMovement(0);
                    }
                    break;
                case Phaser.LEFT:
                    if (this.sprite.body.x <= this.nextValue.x) {
                        this.sprite.body.y = this.nextValue.y;
                        this.sprite.body.x = this.nextValue.x;
                        this.sprite.body.stopMovement(0);
                    }
                    break;
                case Phaser.DOWN:
                    if (this.sprite.body.y >= this.nextValue.y) {
                        this.sprite.body.y = this.nextValue.y;
                        this.sprite.body.x = this.nextValue.x;
                        this.sprite.body.stopMovement(0);
                    }
                    break;
            }
        }
        //
        // if ((this.a.isDown || this.cursors.left.isDown) && (this.d.isDown || this.cursors.right.isDown)) {
        //     this.sprite.body.velocity.x = 0;
        // } else if (this.a.isDown || this.cursors.left.isDown) {
        //     this.sprite.body.velocity.x = -this.speed;
        // } else if (this.d.isDown || this.cursors.right.isDown) {
        //     this.sprite.body.velocity.x = this.speed;
        // } else {
        //     this.sprite.body.velocity.x = 0;
        // }
    }
}

export {Player};
