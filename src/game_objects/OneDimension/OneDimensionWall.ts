import {GameObject} from "../GameObject";

class OneDimensionWall extends GameObject {
    protected filePath: string = "assets/characters_one_dimension.png";
    protected key: string = "OneDimensionWall";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
}

export {OneDimensionWall};
