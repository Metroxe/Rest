import {GameObject, IGameObjectProps} from "./GameObject";
import {Inventory} from "../inventory";
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
        const inventory: Inventory = Inventory.getInstance();
        inventory.setItem("OneDKey", inventory.getItem("OneDKey") + 1);

        this.handleSfx(this.collideAudio);
        const targetDoor: Door = this.level.getDoor(this.openDoorID);
        targetDoor.unlock();

        this.sprite.destroy();
    }
}

interface IKeyObjectProps extends IGameObjectProps {
    openDoorID: string;
}

export {IKeyObjectProps, Key};
