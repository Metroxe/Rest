import {GameObject, IGameObjectProps} from "./GameObject";
import {Door} from "./Door";

abstract class Key extends GameObject {
    protected destinationState: string;
    protected openDoorID: string;

    protected collideAudio: string;

    constructor(props: IKeyObjectProps) {
        super(props);
        this.openDoorID = props.openDoorID;

        this.collideWithPlayer = this.collideWithPlayer.bind(this);
    }

    public collideWithPlayer(): void {
        // add to inventory
        this.level.getPlayer().addToInventory("keys");

        this.handleSfx(this.collideAudio);
        const targetDoor: Door = this.level.getDoor(this.openDoorID);
        targetDoor.unlock();

        this.sprite.x = -9999;
    }
}

interface IKeyObjectProps extends IGameObjectProps {
    openDoorID: string;
}

export {IKeyObjectProps, Key};
