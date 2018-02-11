import {GameObject, IGameObjectProps} from "../GameObject";
import {Switch} from "../Switch";

class EightBitSwitch extends Switch {
    protected filePath: string = "assets/8bit_Inanimate_elements.png";
    protected key: string = "8bit_switch";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number = 57;
    protected pressedFrame: number = 58;
    protected collideAudio: string = "switch";
}

export {EightBitSwitch};
