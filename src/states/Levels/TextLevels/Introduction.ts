import {TextLevel} from "./TextLevel";

class DreamOneOneText extends TextLevel {
    protected content: string[] = ["Holy shit! I am naked!! Where is my….? Oh, wait! I am a pixel. Where the heck am I? Jimmy asked himself as he walks into a Rec Center.", "I have to find my clothes and figure a way to get out of this place without being seen.", "-Help Jimmy find his clothes and get out of the Rec Center without running into anyone. Dodge the people around you. Watch out, though! Everyone and everything else is a pixel too. You can press SPACE BAR to restart the level, there might be a few bugs-"];
    protected nextState: string = "lvl1-1";
}

class DreamOneTwoText extends TextLevel {
    protected content: string[] = ["Phew! No one saw me! What a weird place. I can’t wait to wake up. But first, I gotta find my clothes! - Jimmy thought as he was walking around in his birthday suit. "];
    protected nextState: string = "lvl1-2";
}

class DreamOneThreeText extends TextLevel {
    protected content: string[] = ["I can’t believe I lost my clothes  again! I guess I’ll keep looking!"];
    protected nextState: string = "lvl1-3";
}

class DreamTwoOneText extends TextLevel {
    protected content: string[] = ["Ugh, my clothes feel good. Everything seems more clear now. I can at least see my feet again. What?! I am in game now! Nah, this is a cheap copy! -  Clothed Jimmy exits the Rec Center and finds himself in a cheap copy of a game."];
    protected nextState: string = "lvl2-1";
}

class DreamTwoTwoText extends TextLevel {
    protected content: string[] = ["I remember this characters, they definitely weren’t this big!"];
    protected nextState: string = "lvl2-2";
}

class DreamTwoFourText extends TextLevel {
    protected content: string[] = ["I am tired of this. I just wanna wake up. It sucks to be pixelated!"];
    protected nextState: string = "lvl2-4";
}

class DreamCliffHangerText extends TextLevel {
    protected content: string[] = ["Welcome to the end of the demo, there is another world in development in the 32bit environment, but we never made it there within the time frame howver feel free to look at the github repo and see all the assets for such.", "Thanks for Playing!"];
    protected nextState: string = "ending";
}

export {DreamOneOneText, DreamTwoOneText, DreamOneTwoText, DreamOneThreeText, DreamTwoTwoText, DreamTwoFourText, DreamCliffHangerText};
