import Game = Phaser.Game;
import IGameConfig = Phaser.IGameConfig;
import {TestLevel} from "./states/Levels/TestLevel";

class Gamogori {

    private config: IGameConfig = {
        width: 800,
        height: 600,
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
        //
    }

    private create(): void {
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
