import {GameObject, IGameObjectProps} from "./GameObject";

abstract class Door extends GameObject {
    protected destinationState: string;
    protected doorID: string;
    protected openFrame: number;

    protected isLocked: boolean = true;

    constructor(props: IDoorObjectProps) {
        super(props);
        this.destinationState = props.destination;
        this.doorID = props.doorID;
        console.log("door id: " + this.doorID);

        this.collideWithPlayer = this.collideWithPlayer.bind(this);
    }

    public collideWithPlayer(): void {
        if (!this.isLocked) {
            this.props.game.state.start(this.destinationState);
        }
    }

    public unlock(): void {
        this.isLocked = false;

        this.sprite.frame = this.openFrame;
    }
}

interface IDoorObjectProps extends IGameObjectProps {
    destination: string;
    doorID: string;
}

export {IDoorObjectProps, Door};
