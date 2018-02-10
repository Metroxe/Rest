abstract class GameObject {
    protected sprite: Phaser.Sprite;
    protected game: Phaser.Game;
    protected props: IGameObjectProps;
    protected abstract filePath: string;
    protected abstract key: string;
    protected abstract frameWidth: number;
    protected abstract frameHeight: number;

    constructor(props: IGameObjectProps) {
       this.props = props;
    }

    public preload(): void {
        this.props.game.load.spritesheet(this.key, this.filePath, this.frameWidth, this.frameHeight);
    }

    public render(): void {
        this.sprite = this.props.game.add.sprite(this.props.x, this.props.y, this.key);
        this.enablePhysics();
    }

    public update(): void {
        this.props.game.physics.arcade.collide(this.sprite, , this.collideWithPlayer)
    }

    public enablePhysics(): void {
        this.props.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    }

    public abstract collideWithPlayer(): void
}

interface IGameObjectProps {
    game: Phaser.Game;
    x: number;
    y: number;
}

export {IGameObjectProps, GameObject};
