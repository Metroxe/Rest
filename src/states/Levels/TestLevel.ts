import {Level} from "./Level";

import {TextBox} from "../../game_objects/TextBox";

class TestLevel extends Level {
    public levelName: string;
    protected tiledJSONKey: string = "maze";
    protected TextBox: TextBox;

    public create(game: Phaser.Game): void {
        super.create(game);
        this.TextBox = new TextBox({game, content: ["test", "kjhguhjgu"]});
        this.TextBox.start(() => {
            game.state.start("Introduction");
        });
    }

    public update(game: Phaser.Game): void {
        super.update(game);
    }
}

export {TestLevel};
