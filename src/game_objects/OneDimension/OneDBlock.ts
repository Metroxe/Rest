import {Block} from "../Block";

class OneDBlock extends Block {
    protected filePath: string = "assets/characters_one_dimension.png";
    protected key: string = "OneDBlock";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number = 2;
}

export {OneDBlock};
