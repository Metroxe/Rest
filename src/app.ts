import Game = Phaser.Game;
import IGameConfig = Phaser.IGameConfig;
import {TestLevel} from "./states/Levels/TestLevel";
import {TestObject} from "./game_objects/TestObject";
import {TextLevel} from "./states/Levels/TextLevel";

class Gamogori {

    private config: IGameConfig = {
        width: 1000,
        height: 700,
        renderer: Phaser.AUTO,
        antialias: true,
        multiTexture: true,
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
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // new TestObject({x: 0, y: 0, game: this.game}).preload();
    }

    private create(): void {
        this.game.state.add("TextLevel", TextLevel);
        this.game.state.add("TestLevel", TestLevel);
        this.game.state.start("TestLevel");
    }

    private update(): void {
        //
    }
}

window.onload = (): void => {
    const game: Gamogori = new Gamogori();
};
