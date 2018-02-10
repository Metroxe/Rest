import {GameObject} from "../GameObject";

class OneDimensionWallGray extends GameObject {
    protected filePath: string = "assets/background_one_dimension.png";
    protected key: string = "OneDWallGray";
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

class OneDimensionGround extends GameObject {
    protected filePath: string = "assets/background_one_dimension.png";
    protected key: string = "OneDGround";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number = 0;
    public update(): void {
        // no nothings
    }
}

export {OneDimensionWallGray, OneDimensionWallOrange, OneDimensionGround};
