import {TextLevel} from "./TextLevel";

class Introduction extends TextLevel {
    protected content: string[] = ["Please Fill Me In", "ajsdhfkjahsd askdjbfajns dhfbashj dfhuavsdjf ajhsvdfjh"];
    protected nextState: string = "lvl1-1";
}

export {Introduction};
