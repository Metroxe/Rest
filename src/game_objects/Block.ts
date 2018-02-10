import {GameObject, IGameObjectProps} from "./GameObject";

abstract class Block extends GameObject {
    protected destinationState: string;

    constructor(props: IBlockObjectProps) {
        super(props);
        this.destinationState = props.destination;
    }

    public collideWithPlayer(): void {
        this.game.state.start(this.destinationState);
    }
}

interface IBlockObjectProps extends IGameObjectProps {
    destination: string;
}

export {IBlockObjectProps, Block};
