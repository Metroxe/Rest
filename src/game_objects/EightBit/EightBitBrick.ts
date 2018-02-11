import {GameObject, IGameObjectProps} from "../GameObject";

class EightBitBrick extends GameObject {
    protected filePath: string = "assets/8bit_Inanimate_elements.png";
    protected key: string = "8bit_brick";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number;

    public constructor(props: IGameObjectProps) {
        super(props);

        if (props.frame) {
            this.startingFrame = props.frame;
        }
    }
}

export {EightBitBrick};
