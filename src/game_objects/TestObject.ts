import {GameObject} from "./GameObject";

class TestObject extends GameObject {
    protected filePath: string = "assets/pink.png";
    protected key: string = "test";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
}

export {TestObject};
