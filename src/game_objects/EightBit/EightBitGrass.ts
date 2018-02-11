import {GameObject, IGameObjectProps} from "../GameObject";

class EightBitGrass extends GameObject {
    public collidable: boolean = false;
    protected filePath: string = "assets/8bit_Inanimate_elements.png";
    protected key: string = "8bit_grass";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;

    public constructor(props: IGameObjectProps) {
        super(props);

        if (props.frame) {
            this.startingFrame = props.frame;
        }
    }

    public update(): void {
        // no nothings
    }
}

export {EightBitGrass};
