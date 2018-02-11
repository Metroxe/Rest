import {GameObject, IGameObjectProps} from "./GameObject";

abstract class Block extends GameObject {
    protected destinationState: string;

    constructor(props: IBlockObjectProps) {
        super(props);
    }

    public collideWithPlayer(): void {

    }
}

interface IBlockObjectProps extends IGameObjectProps {
}

export {IBlockObjectProps, Block};
