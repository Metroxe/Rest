import {GameObject, IGameObjectProps} from "./GameObject";

abstract class Enemy extends GameObject {
    protected destinationState: string;

    constructor(props: IEnemyObjectProps) {
        super(props);
    }

    public collideWithPlayer(): void {

    }
}

interface IEnemyObjectProps extends IGameObjectProps {
}

export {IEnemyObjectProps, Enemy};
