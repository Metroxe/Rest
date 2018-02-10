abstract class Level extends Phaser.State {
    public create(game: Phaser.Game): void {
        super.create(game);
    }

    public init(...args): void {
        super.init(args);
    }

    public loadRender(game: Phaser.Game): void {
        super.loadRender(game);
    }

    public loadUpdate(game: Phaser.Game): void {
        super.loadUpdate(game);
    }

    public paused(game: Phaser.Game): void {
        super.paused(game);
    }

    public pauseUpdate(game: Phaser.Game): void {
        super.pauseUpdate(game);
    }

    public preload(game: Phaser.Game): void {
        super.preload(game);
    }

    public preRender(game: Phaser.Game, elapsedTime: number): void {
        super.preRender(game, elapsedTime);
    }

    public render(game: Phaser.Game): void {
        super.render(game);
    }

    public resize(width: number, height: number): void {
        super.resize(width, height);
    }

    public resumed(game: Phaser.Game): void {
        super.resumed(game);
    }

    public shutdown(game: Phaser.Game): void {
        super.shutdown(game);
    }

    public update(game: Phaser.Game): void {
        super.update(game);
    }
}

export {Level};
