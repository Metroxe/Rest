import {GameObject, IGameObjectProps} from "./GameObject";
import {Door} from "./Door";

abstract class Switch extends GameObject {
    //public collidable: boolean = false;
    protected openDoorID: string;
    protected openSwitchDoorID: string;
    protected abstract pressedFrame: number;
    protected collideAudio: string;

    constructor(props: ISwitchObjectProps) {
        super(props);
        this.openDoorID = props.openDoorID;
        //console.log("open doorID: " + this.openDoorID);
        this.openSwitchDoorID = props.openSwitchDoorID;
        //console.log("open switch doorID: " + this.openSwitchDoorID);

        this.collideWithPlayer = this.collideWithPlayer.bind(this);
    }

    public collideWithPlayer(): void {
        // TODO
        this.handleSfx(this.collideAudio);
        const targetDoor: Door = this.level.getDoor(this.openDoorID);
        targetDoor.unlock();
        const targetSwitchDoor: Door = this.level.getSwitchDoor(this.openSwitchDoorID);
        targetSwitchDoor.unlock(true);

        this.sprite.frame = this.pressedFrame;

        //this.sprite.x = -9999;
    }
}

interface ISwitchObjectProps extends IGameObjectProps {
    openDoorID: string;
    openSwitchDoorID: string;
    selfReset?: boolean;
}

export {ISwitchObjectProps, Switch};