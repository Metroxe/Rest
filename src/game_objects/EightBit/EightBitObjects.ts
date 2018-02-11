import {GameObject} from "../GameObject";

class BushZero extends GameObject {
    protected filePath: string | string[] = "assets/8bit_Inanimate_elements.png";
    protected key: string = "bush_0";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number = 18;
}

class BushOne extends GameObject {
    protected filePath: string | string[] = "assets/8bit_Inanimate_elements.png";
    protected key: string = "bush_1";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number = 19;
}

export {BushZero, BushOne};
