import {GameObject, IGameObjectProps} from "./GameObject";

abstract class Enemy extends GameObject {

    constructor(props: IGameObjectProps) {
        super(props);
        this.collideWithPlayer = this.collideWithPlayer.bind(this);
    }

    public collideWithPlayer(): void {
        this.level.getPlayer().die();
    }
}

export {Enemy};
