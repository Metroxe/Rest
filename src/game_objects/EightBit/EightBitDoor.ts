import {Door} from "../Door";

class EightBitDoor extends Door {
    protected filePath: string = "assets/8bit_Inanimate_elements.png";
    protected key: string = "EightBitDoor";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number = 48;
    protected openFrame: number = 49;
}

export {EightBitDoor};
