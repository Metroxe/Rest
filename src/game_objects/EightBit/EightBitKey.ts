import {Key} from "../Key";

class EightBitKey extends Key  {
    protected filePath: string = "assets/8bit_Inanimate_elements.png";
    protected key: string = "8bit_key";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number = 50;
    protected collideAudio: string = "d1_key";
}

export {EightBitKey};
