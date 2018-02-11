import {Level} from "../states/Levels/Level";

abstract class GameObject {
    public sprite: Phaser.Sprite;
    public collidable: boolean = true;
    protected game: Phaser.Game;
    protected props: IGameObjectProps;
    protected level: Level;
    protected startingFrame: number = 0;
    protected abstract filePath: string | string[];
    protected abstract key: string;
    protected abstract frameWidth: number;
    protected abstract frameHeight: number;

    constructor(props: IGameObjectProps) {
        this.props = props;
        this.collideWithPlayer = this.collideWithPlayer.bind(this);
        this.generalCollision = this.generalCollision.bind(this);
        this.handleAnimation = this.handleAnimation.bind(this);
        this.handleSfx = this.handleSfx.bind(this);
        this.create = this.create.bind(this);
    }

    public attachLevel(level: Level): void {
        this.level = level;
    }

    public preload(): void {
        if (typeof this.filePath === "string") {
            this.props.game.load.spritesheet(this.key, this.filePath, this.frameWidth, this.frameHeight);
        } else {
            this.props.game.load.images(this.filePath, this.filePath);
        }
    }

    public create(): void {
        this.sprite = this.props.game.add.sprite(this.props.x, this.props.y, this.key, this.startingFrame);
        this.enablePhysics();
        this.sprite.body.immovable = true;
        this.sprite.body.facing = Phaser.DOWN;
    }

    public update(): void {
        if (this.sprite !== this.level.getPlayer().sprite && this.collidable) {
            this.props.game.physics.arcade.collide(this.sprite, this.level.getPlayer().sprite, this.collideWithPlayer);
        }

        this.level.getGameObjectArray().forEach((gameObject: GameObject) => {
            if (this.sprite !== gameObject.sprite && this.collidable && gameObject.sprite !== this.level.getPlayer().sprite) {
                this.props.game.physics.arcade.collide(this.sprite, gameObject, this.generalCollision);
            }
        });

        this.handleAnimation();
    }

    public enablePhysics(): void {
        this.props.game.physics.arcade.enable(this.sprite);
    }

    public getKey(): string {
        return this.key;
    }

    protected collideWithPlayer(): void {
        // Write in Child
    }

    protected generalCollision(): void {
        // Write in child
    }

    protected handleAnimation(): void {
        // Write in child
    }

    protected handleSfx(key: string): void {
        const sfx: any = this.props.game.add.audio(key);
        sfx.play();
    }

    protected setNotImmovable(): void {
        this.sprite.body.immovable = false;
    }
}

interface IGameObjectProps {
    game: Phaser.Game;
    x: number;
    y: number;
}

export {IGameObjectProps, GameObject};
