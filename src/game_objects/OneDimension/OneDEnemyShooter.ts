import {Enemy} from "../Enemy";

class OneDEnemyShooter extends Enemy  {
    protected filePath: string = "assets/characters_one_dimension.png";
    protected key: string = "OneDEnemyShooter";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number = 1;
}

export {OneDEnemyShooter};
