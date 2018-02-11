import {Shooter} from "../Shooter";

class OneDEnemyShooter extends Shooter  {
    protected filePath: string = "assets/characters_one_dimension.png";
    protected key: string = "OneDEnemyShooter";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number = 1;
}

export {OneDEnemyShooter};
