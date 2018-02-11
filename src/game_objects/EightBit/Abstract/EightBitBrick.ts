import {GameObject} from "../../GameObject";

abstract class EightBitBrick extends GameObject {
    protected filePath: string = "assets/8bit_Inanimate_elements.png";
    protected key: string = "8bit_brick";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected abstract startingFrame: number;
}

export {EightBitBrick};
