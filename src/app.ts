import Game = Phaser.Game;
import IGameConfig = Phaser.IGameConfig;
import {DreamOneToOne} from "../src/states/Levels/DreamOneToOne";
import {DreamOneToTwo} from "../src/states/Levels/DreamOneToTwo";
import {DreamOneToThree} from "../src/states/Levels/DreamOneToThree";
import {DreamTwoToOne} from "../src/states/Levels/DreamTwoToOne";
import {DreamTwoToTwo} from "../src/states/Levels/DreamTwoToTwo";
import {DreamTwoToFour} from "../src/states/Levels/DreamTwoToFour";
import {
    DreamCliffHangerText,
    DreamOneOneText, DreamOneThreeText, DreamOneTwoText, DreamTwoFourText,
    DreamTwoOneText, DreamTwoTwoText,
} from "../src/states/Levels/TextLevels/Introduction";

class Gamogori {

    private config: IGameConfig = {
        width: 1000,
        height: 700,
        renderer: Phaser.AUTO,
        antialias: true,
        multiTexture: true,
        roundPixels: false,
        state: {
            preload: this.preload,
            create: this.create,
            update: this.update,
        },
        canvasId: "content",
    };

    private game: Game;

    constructor() {
        this.game = new Phaser.Game(this.config);
    }

    private preload(): void {
        // audio
        this.game.load.audio("d1_key", "assets/sfx/d1_key.wav");

        // level maps
        this.game.load.json("maze", "tiled_maps/maze.json");
        this.game.load.json("test", "tiled_maps/test.json");
        this.game.load.json("lvl1-1", "tiled_maps/dream_1/lvl1-1.json");
        this.game.load.json("lvl1-2", "tiled_maps/dream_1/lvl1-2.json");
        this.game.load.json("lvl1-3", "tiled_maps/dream_1/lvl1-3.json");
        this.game.load.json("lvl2-1", "tiled_maps/dream_2/lvl2_1.json");
        this.game.load.json("lvl2-2", "tiled_maps/dream_2/lvl2_2.json");
        this.game.load.json("lvl2-4", "tiled_maps/dream_2/lvl2_4.json");
        this.game.load.image("keyIcon", "assets/pink.png");
        this.game.load.image("keyIcon", "assets/pink.png");
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.load.spritesheet("bullet", "assets/bullet.png", 128, 128);
        // new TestObject({x: 0, y: 0, game: this.game}).preload();
    }

    private create(): void {
        this.game.state.add("lvl1-1", DreamOneToOne);
        this.game.state.add("lvl1-1t", DreamOneOneText);
        this.game.state.add("lvl1-2", DreamOneToTwo);
        this.game.state.add("lvl1-2t", DreamOneTwoText);
        this.game.state.add("lvl1-3", DreamOneToThree);
        this.game.state.add("lvl1-3t", DreamOneThreeText);
        this.game.state.add("lvl2-1", DreamTwoToOne);
        this.game.state.add("lvl2-1t", DreamTwoOneText);
        this.game.state.add("lvl2-2", DreamTwoToTwo);
        this.game.state.add("lvl2-2t", DreamTwoTwoText);
        this.game.state.add("lvl2-4", DreamTwoToFour);
        this.game.state.add("lvl2-4t", DreamTwoFourText);
        this.game.state.add("ending", DreamCliffHangerText);
        this.game.state.start("lvl2-1t");
    }

    private update(): void {
        //
    }
}

window.onload = (): void => {
    const game: Gamogori = new Gamogori();
};
