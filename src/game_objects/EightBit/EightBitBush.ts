import {GameObject, IGameObjectProps} from "../GameObject";

class EightBitBush extends GameObject {
    protected filePath: string = "assets/8bit_Inanimate_elements.png";
    protected key: string = "8bit_bush";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;

    public constructor(props: IGameObjectProps) {
        super(props);

        if (props.frame) {
            this.startingFrame = props.frame;
        }
    }
}

export {EightBitBush};
