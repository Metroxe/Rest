import {Shooter} from "../Shooter";
import {IGameObjectProps} from "../GameObject";

class EightBitShooter extends Shooter  {
    protected filePath: string = "assets/8bit_characters.png";
    protected key: string = "EightBitShooter";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;

    public constructor(props: IGameObjectProps) {
        super(props);

        if (props.frame) {
            this.startingFrame = props.frame;
        }
    }
}

export {EightBitShooter};
