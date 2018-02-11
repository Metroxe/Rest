import {Door} from "../Door";

class OneDDoor extends Door {
    protected filePath: string = "assets/characters_one_dimension.png";
    protected key: string = "OneDDoor";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number = 6;
    protected openFrame: number = 3;
}

export {OneDDoor};
