import {Door} from "../Door";

class OneDDoor extends Door {
    protected filePath: string = "assets/background_one_dimension.png";
    protected key: string = "OneDDoor";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
}

export {OneDDoor};
