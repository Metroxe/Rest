
class IntroVideo {
    protected game: Phaser.Game;
    protected videoDisplay: any;
    protected pressStart: any;
    protected text: string;
    protected enter: Phaser.Key;

    public create(game: Phaser.Game): void {
        this.text = "Press Start";

        this.videoDisplay = this.game.add.video("test", "assets/video/REST- BC Game Jam 2018.mp4");
        this.videoDisplay.play(true);
        this.videoDisplay.addToWorld(700, 450, 1, 1);
        this.videoDisplay.loop = false;
        // this.videoDisplay.onComplete(() => {
        //     if (this.enter.isDown) {
        //         game.state.start("lvl1-1t");
        //     }
        // });
        this.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    }

    public update(game: Phaser.Game): void {
        if (this.enter.isDown) {
            game.state.start("lvl1-1t");
        }
    }
}

export {IntroVideo};
