import {GameObject, IGameObjectProps} from "./GameObject";

abstract class Door extends GameObject {
    protected destinationState: string;

    constructor(props: IDoorObjectProps) {
        super(props);
        this.destinationState = props.destination;
    }

    public collideWithPlayer(): void {
        this.game.state.start(this.destinationState);
    }
}

interface IDoorObjectProps extends IGameObjectProps {
    destination: string;
}

export {IDoorObjectProps, Door};
