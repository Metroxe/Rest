import {GameObject, IGameObjectProps} from "./GameObject";

abstract class Door extends GameObject {
    protected destinationState: string;
    protected doorID: string;
    protected switchDoorID: string;
    protected openFrame: number;
    protected isLocked: boolean = true;

    constructor(props: IDoorObjectProps) {
        super(props);
        this.destinationState = props.destination;
        this.doorID = props.doorID;
        this.switchDoorID = props.switchDoorID;
        //console.log("door id: " + this.doorID);

        this.collideWithPlayer = this.collideWithPlayer.bind(this);
    }

    public collideWithPlayer(): void {
        if (!this.isLocked) {
            this.level.getPlayer().removeFromInventory("keys");
            this.props.game.state.start(this.destinationState);
        }
    }

    public unlock(isSwitch: boolean = false): void {
        if (isSwitch === true) {
            this.collidable = false;
            this.sprite.x = -9999;
        } else {
            this.isLocked = false;

            this.sprite.frame = this.openFrame;
        }
    }
}

interface IDoorObjectProps extends IGameObjectProps {
    destination: string;
    doorID: string;
    switchDoorID?: string;
}

export {IDoorObjectProps, Door};
