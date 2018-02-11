import {Key} from "../Key";

class OneDKey extends Key  {
    protected filePath: string = "assets/characters_one_dimension.png";
    protected key: string = "OneDKey";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number = 4;
    protected collideAudio: string = "d1_key";
}

export {OneDKey};
