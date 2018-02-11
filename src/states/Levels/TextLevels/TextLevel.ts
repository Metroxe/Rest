import {TextBox} from "../../../game_objects/TextBox";

abstract class TextLevel extends Phaser.State {

    protected abstract content: string[];
    protected abstract nextState: string;

    public create(game: Phaser.Game): void {
        super.create(game);
        new TextBox({content: this.content, game}).start(() => {
            game.state.start(this.nextState);
        });

    }

}

export {TextLevel};
