import {GameObject} from "../GameObject";

class OneDimensionWallGrey extends GameObject {
    protected filePath: string = "assets/background_one_dimension.png";
    protected key: string = "OneDWallGrey";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number = 2;
}

class OneDimensionWallOrange extends GameObject {
    protected filePath: string = "assets/background_one_dimension.png";
    protected key: string = "OneDWallOrange";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number = 1;
}

export {OneDimensionWallGrey, OneDimensionWallOrange};
