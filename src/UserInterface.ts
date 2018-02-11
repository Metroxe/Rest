import {Inventory} from "./inventory";

class UserInterface {
    protected game: Phaser.Game;
    protected indentX: number = 10;
    protected indentY: number = 10;
    protected levelDisplay: Phaser.Text;
    protected livesDisplay: Phaser.Text;
    protected keyIconDisplay: Phaser.Image;
    protected keyCount: number = Inventory.keyCount;

    constructor(props: IUserInterfaceProps) {
        this.game = props.game;
        console.log(props);
        this.create = this.create.bind(this);
    }

    public create(): void {
        console.log("made it to spencers function");
        console.log(this.game);
        this.levelDisplay = this.game.add.text(this.indentX, this.indentY, "Level " + this.keyCount, {fill: "white"});
        this.levelDisplay.fixedToCamera = true;
        this.livesDisplay = this.game.add.text((this.game.width / 2) - 50, this.indentY, "Lives: " + this.keyCount, {fill: "white"});
        this.livesDisplay.fixedToCamera = true;
        this.keyIconDisplay = this.game.add.image(this.game.width - 70, this.indentY, "keyIcon");
        this.keyIconDisplay.width = 50;
        this.keyIconDisplay.height = 50;
        this.keyIconDisplay.fixedToCamera = true;
    }

    public update(): void {
        console.log("hello");
    }

}

interface IUserInterfaceProps {
    game: Phaser.Game;
}

export {IUserInterfaceProps, UserInterface};
