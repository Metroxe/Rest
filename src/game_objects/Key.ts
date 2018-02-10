import {GameObject, IGameObjectProps} from "./GameObject";
import {Inventory} from "../inventory";

abstract class Key extends GameObject {
    protected destinationState: string;
    protected collideAudio: string;

    constructor(props: IKeyObjectProps) {
        super(props);
        this.destinationState = props.destination;

        this.collideWithPlayer = this.collideWithPlayer.bind(this);
    }

    public collideWithPlayer(): void {
        // add to inventory
        const inventory: Inventory = Inventory.getInstance();
        inventory.setItem("OneDKey", inventory.getItem("OneDKey") + 1);

        this.handleSfx(this.collideAudio);

        this.sprite.destroy();
    }
}

interface IKeyObjectProps extends IGameObjectProps {
    destination: string;
}

export {IKeyObjectProps, Key};
