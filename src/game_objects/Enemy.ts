import {GameObject, IGameObjectProps} from "./GameObject";

abstract class Enemy extends GameObject {
    protected destinationState: string;

    constructor(props: IEnemyObjectProps) {
        super(props);

        this.collideWithPlayer = this.collideWithPlayer.bind(this);
    }

    public collideWithPlayer(): void {
        this.level.getPlayer().die();
    }
}

interface IEnemyObjectProps extends IGameObjectProps {
}

export {IEnemyObjectProps, Enemy};
