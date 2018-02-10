import {TextBox} from "../../game_objects/TextBox";

abstract class TextLevel extends Phaser.State {

    public init(...args): void {
        super.init(args);
    }

    public create(game: Phaser.Game): void {
        super.create(game);
        new TextBox({content: ["this is a test check me out yo, I'm chilling out maxing relaxing all cool", "shooting some b ball outside of the pool when a couple. you sweat her i aint talkin bout acool j you a bit l and i,", "aint talking about cool j, see me at the airport and least 20 loureys treat me like the prince", "Yo that was nuts and stuff and chris is really tired"], game}).start();
    }

}

export {TextLevel};
