import {GameObject, IGameObjectProps} from "../GameObject";
import InputHandler = Phaser.InputHandler;
import {Inventory} from "../../inventory";
import {Door} from "../Door";
import Sound = Phaser.Sound;

abstract class Player extends GameObject {
    public speed: number = 128;
    protected door: Door;
    private inputHandler: InputHandler;
    private w: Phaser.Key;
    private a: Phaser.Key;
    private s: Phaser.Key;
    private d: Phaser.Key;
    private space: Phaser.Key;
    private cursors: Phaser.CursorKeys;
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
        this.controlHandler();
        super.update();
    }

    public addToInventory(key: string): number {
        const inventory: Inventory = Inventory.getInstance();
        const newCount: number = inventory.getItem(key) + 1;
        inventory.setItem(key, newCount);
        return newCount;
    }

    // returns always the calculated value afterwards but the actual amount in the inventory is always zero or greater
    public removeFromInventory(key: string): number {
        const inventory: Inventory = Inventory.getInstance();
        const newCount: number = inventory.getItem(key) - 1;
        let newSetCount: number = newCount;
        if (newCount < 1) {
            newSetCount = 0;
        }
        inventory.setItem(key, newSetCount);
        return newCount;
    }

    public viewInventory(key: string): number {
        const inventory: Inventory = Inventory.getInstance();
        const newCount: number = inventory.getItem(key);
        return newCount;
    }

    public die(): void {
        this.removeFromInventory("keys");
        const livesLeft: number = this.removeFromInventory("lives");

        // play animation
        // TODO
        this.handleSfx("hurt");

        if (livesLeft === 0) {
            // end the game if the player has lost all their lives
            // send back to title screen
            this.props.game.state.start("DreamOneOneText");
        } else {
            // else restart the level
            this.props.game.state.start(this.level.key);
        }
    }

    public forceNoMove(): void {
        this.moveOver();
        switch (this.sprite.body.facing) {
            case (Phaser.UP):
                this.sprite.body.y = this.nextValue.y + this.speed;
                this.sprite.body.x = this.nextValue.x;
                this.sprite.body.stopMovement(0);
                break;
            case (Phaser.RIGHT):
                this.sprite.body.y = this.nextValue.y;
                this.sprite.body.x = this.nextValue.x - this.speed;
                this.sprite.body.stopMovement(0);
                break;
            case (Phaser.LEFT):
                this.sprite.body.y = this.nextValue.y;
                this.sprite.body.x = this.nextValue.x + this.speed;
                this.sprite.body.stopMovement(0);
                break;
            case (Phaser.DOWN):
                this.sprite.body.y = this.nextValue.y - this.speed;
                this.sprite.body.x = this.nextValue.x;
                this.sprite.body.stopMovement(0);
                break;
        }
    }

    private enableControls(): void {
        this.inputHandler = new InputHandler(this.sprite);
        this.w = this.props.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.a = this.props.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.s = this.props.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.d = this.props.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.space = this.props.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.cursors = this.props.game.input.keyboard.createCursorKeys();
    }

    private moveOver(): void {
        this.sprite.body.velocity.y = 0;
        this.sprite.body.velocity.x = 0;

    }

    private controlHandler(): void {

        if (this.space.isDown) {
            this.props.game.state.restart();
        }

        const moving: boolean = this.sprite.body.isMoving;
        const up: boolean = (this.w.isDown || this.cursors.up.isDown);
        const right: boolean = (this.d.isDown || this.cursors.right.isDown);
        const left: boolean = (this.a.isDown || this.cursors.left.isDown);
        const down: boolean = (this.s.isDown || this.cursors.down.isDown);

        if (up) {
            this.sprite.body.facing = Phaser.UP;
        } else if (right) {
            this.sprite.body.facing = Phaser.RIGHT;
        } else if (left) {
            this.sprite.body.facing = Phaser.LEFT;
        } else if (down) {
            this.sprite.body.facing = Phaser.DOWN;
        }

        if (!moving && !this.moving) {
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
    }
}

export {Player};
