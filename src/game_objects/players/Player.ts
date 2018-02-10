import {GameObject} from "../GameObject";
import InputHandler = Phaser.InputHandler;

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
