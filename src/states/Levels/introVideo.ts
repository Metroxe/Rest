
class IntroVideo {
    protected game: Phaser.Game;
    protected videoDisplay: any;
    protected pressStart: any;
    protected text: string;

    public create(game: Phaser.Game): void {

        this.text = "Press Start";

        this.videoDisplay = this.game.add.video("test", "assets/video/REST- BC Game Jam 2018.mp4");
        this.videoDisplay.play(true);
        this.videoDisplay.addToWorld(700, 450, 1, 1);

    }

    public update(game: Phaser.Game): void {
        console.log("helllo");
    }
}

export {IntroVideo};
