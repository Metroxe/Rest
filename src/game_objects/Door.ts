import {GameObject, IGameObjectProps} from "./GameObject";

abstract class Door extends GameObject {
    protected destinationState: string;

    constructor(props: IDoorObjectProps) {
        super(props);
        this.destinationState = props.destination;
        console.log("dest statee", this.destinationState);

        this.collideWithPlayer = this.collideWithPlayer.bind(this);
    }


    public collideWithPlayer(): void {
        console.log(this.destinationState);
        this.props.game.state.start(this.destinationState);
    }
}

interface IDoorObjectProps extends IGameObjectProps {
    destination: string;
}

export {IDoorObjectProps, Door};
