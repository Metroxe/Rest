import {Block} from "../Block";
import {GameObject, IGameObjectProps} from "../GameObject";

class EightBitStump extends Block {
    protected filePath: string = "assets/8bit_Inanimate_elements.png";
    protected key: string = "EightBitStump";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number = 24;
}

export {EightBitStump};