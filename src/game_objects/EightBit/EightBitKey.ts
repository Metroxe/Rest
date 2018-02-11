import {Key} from "../Key";

class EightBitKey extends Key  {
    protected filePath: string = "assets/8it_Inanimate_elements.png";
    protected key: string = "EightBitKey";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number = 50;
    protected collideAudio: string = "d1_key";
}

export {EightBitKey};
