import {GameObject} from "../GameObject";

class OneDimensionWallGray extends GameObject {
    protected filePath: string = "assets/characters/.png";
    protected key: string = "OneDWallGray";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number = 2;
}