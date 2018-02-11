import {GameObject} from "../GameObject";
import InputHandler = Phaser.InputHandler;
import {Inventory} from "../../inventory";

abstract class Player extends GameObject {
    private inputHandler: InputHandler;
    private w: Phaser.Key;
    private a: Phaser.Key;
    private s: Phaser.Key;
    private d: Phaser.Key;
    private cursors: Phaser.CursorKeys;
    private speed: number = 400;

    public create(): void {
       super.create();
       this.enableControls();
       this.level.setPlayer(this);
       this.setNotImmovable();
    }

    public update(): void {
        super.update();
        this.controlHandler();
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

    public die(): void {
        const livesLeft: number = this.removeFromInventory("lives");

        // play animation
        // TODO

        if (livesLeft === 0) {
            // end the game if the player has lost all their lives
            // send back to title screen
            // TODO

            alert("game over");
        } else {
            // else restart the level
            this.props.game.state.start(this.level.key);
        }
    }

    private enableControls(): void {
        this.inputHandler = new InputHandler(this.sprite);
        this.w = this.props.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.a = this.props.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.s = this.props.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.d = this.props.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.cursors = this.props.game.input.keyboard.createCursorKeys();
    }

    private controlHandler(): void {

        if ((this.w.isDown || this.cursors.up.isDown) && (this.s.isDown || this.cursors.down.isDown)) {
            this.sprite.body.velocity.y = 0;
        } else if (this.w.isDown || this.cursors.up.isDown) {
            this.sprite.body.velocity.y = -this.speed;
        } else if (this.s.isDown || this.cursors.down.isDown) {
            this.sprite.body.velocity.y = this.speed;
        } else {
            this.sprite.body.velocity.y = 0;
        }

        if ((this.a.isDown || this.cursors.left.isDown) && (this.d.isDown || this.cursors.right.isDown)) {
            this.sprite.body.velocity.x = 0;
        } else if (this.a.isDown || this.cursors.left.isDown) {
            this.sprite.body.velocity.x = -this.speed;
        } else if (this.d.isDown || this.cursors.right.isDown) {
            this.sprite.body.velocity.x = this.speed;
        } else {
            this.sprite.body.velocity.x = 0;
        }
    }
}

export {Player};
