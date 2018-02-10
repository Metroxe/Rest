import {Level} from "./Level";

class TestLevel extends Level {

    public create(game: Phaser.Game): void {
        game.add.text(50, 50, "2", {fill: "white"});
    }

}

export {TestLevel};
