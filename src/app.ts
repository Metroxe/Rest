import Game = Phaser.Game;
import IGameConfig = Phaser.IGameConfig;
import {TestLevel} from "./states/Levels/TestLevel";
import {TestObject} from "./game_objects/TestObject";
import {TextLevel} from "./states/Levels/TextLevel";
import {DreamOneToOne} from "./states/Levels/DreamOneToOne";
import {DreamOneToTwo} from "./states/Levels/DreamOneToTwo";
import {DreamOneToThree} from "./states/Levels/DreamOneToThree";
import {DreamOneToFour} from "./states/Levels/DreamOneToFour";

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
    private testLevel: TestLevel = new TestLevel();

    constructor() {
        this.game = new Phaser.Game(this.config);
    }

    private preload(): void {
        this.game.load.json("maze", "tiled_maps/maze.json");
        this.game.load.json("lvl1-1", "tiled_maps/dream_1/lvl1-1.json");
        this.game.load.json("lvl1-2", "tiled_maps/dream_1/lvl1-2.json");
        this.game.load.json("lvl1-3", "tiled_maps/dream_1/lvl1-3.json");
        this.game.load.json("lvl1-4", "tiled_maps/dream_1/lvl1-4.json");
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // new TestObject({x: 0, y: 0, game: this.game}).preload();
    }

    private create(): void {
        this.game.state.add("TextLevel", TextLevel);
        this.game.state.add("TestLevel", TestLevel);
        this.game.state.add("lvl1-1", DreamOneToOne);
        this.game.state.add("lvl1-2", DreamOneToTwo);
        this.game.state.add("lvl1-3", DreamOneToThree);
        this.game.state.add("lvl1-4", DreamOneToFour);
        this.game.state.start("lvl1-1");
    }

    private update(): void {
        //
    }
}

window.onload = (): void => {
    const game: Gamogori = new Gamogori();
};
