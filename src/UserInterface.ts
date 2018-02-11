import {Player} from "./game_objects/players/Player";
import {Level} from "./states/Levels/Level";

class UserInterface {
    protected game: Phaser.Game;
    protected indentX: number = 10;
    protected indentY: number = 10;
    protected levelDisplay: Phaser.Text;
    protected levelTitle: string;
    protected livesDisplay: Phaser.Text;
    protected lifeCount: number;
    protected keyIconDisplay: Phaser.Image;
    protected keyCount: number;
    protected player: Player;
    protected level: Level;

    constructor(props: IUserInterfaceProps) {
        this.game = props.game;
        this.player = props.player;
        this.level = props.level;
        console.log("USER INTERFACE PROPS ARE: ", props);
        this.create = this.create.bind(this);
    }

    public create(): void {
        console.log(this.game);

        this.levelTitle = this.level.levelName;
        this.levelDisplay = this.game.add.text(this.indentX, this.indentY, "Level " + this.levelTitle, {fill: "white"});
        this.levelDisplay.fixedToCamera = true;

        this.lifeCount = this.player.viewInventory("lives");
        this.livesDisplay = this.game.add.text((this.game.width / 2) - 50, this.indentY, "Lives: " + this.lifeCount, {fill: "white"});
        this.livesDisplay.fixedToCamera = true;

        this.keyIconDisplay = this.game.add.image(this.game.width - 70, this.indentY, "keyIcon");
        this.keyIconDisplay.width = 50;
        this.keyIconDisplay.height = 50;
        this.keyIconDisplay.alpha = 0.3;
        this.keyIconDisplay.fixedToCamera = true;
    }

    public update(): void {
        this.keyCount = this.player.viewInventory("keys");
        console.log("the keycount is: ", this.keyCount);
        if (this.keyCount > 0){
            this.createKeyIcon();
        }
    }

    protected createKeyIcon(): void {
        this.game.add.tween(this.keyIconDisplay).to( { alpha: 1 }, 100, "Linear", true);
    }

}

interface IUserInterfaceProps {
    game: Phaser.Game;
    player: Player;
    level: Level;
}

export {IUserInterfaceProps, UserInterface};