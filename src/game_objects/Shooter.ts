import {Enemy} from "./Enemy";
import {GameObject, IGameObjectProps} from "./GameObject";

abstract class Shooter extends Enemy {
    private coolDown: boolean = false;

    constructor(props: IGameObjectProps) {
        super(props);
        this.createBullet = this.createBullet.bind(this);
    }

    public static inRange(v0: number, v1: number): boolean {
        // console.log(Math.abs(v0), Math.abs(v1), Math.abs(v0) - Math.abs(v1), Math.abs(v0) - Math.abs(v1) < 128);
        return (Math.abs(v0 - v1) < 64);
    }

    public create(): void {
        super.create();
    }

    public update(): void {
        super.update();
        if (!this.coolDown) {
            const playerSprite: Phaser.Sprite = this.level.getPlayer().sprite;
            const props: IBulletProps = {
                x: 0,
                y: 0,
                game: this.props.game,
                direction: 0,
                shooter: this,
            };
            const h: number = 128 + 1;
            if (Shooter.inRange(this.sprite.body.y, playerSprite.body.y)) {
                if (this.sprite.body.x - playerSprite.body.x >= 0) {
                    props.x = this.sprite.body.x;
                    props.y = this.sprite.body.y;
                    props.direction = Phaser.LEFT;
                } else {
                    props.x = this.sprite.body.x;
                    props.y = this.sprite.body.y;
                    props.direction = Phaser.RIGHT;
                }
                this.createBullet(props);
                this.coolDown = true;
                const that: Shooter = this;
                setTimeout(() => {
                    that.coolDown = false;
                }, 3000);
            } else if (Shooter.inRange(this.sprite.body.x, playerSprite.body.x)) {
                if (this.sprite.body.y - playerSprite.body.y >= 0) {
                    props.y = this.sprite.body.y;
                    props.x = this.sprite.body.x;
                    props.direction = Phaser.UP;
                } else {
                    props.y = this.sprite.body.y;
                    props.x = this.sprite.body.x;
                    props.direction = Phaser.DOWN;
                }
                this.coolDown = true;
                const that: Shooter = this;
                setTimeout(() => {
                    that.coolDown = false;
                }, 1500);
                this.createBullet(props);
            }
        }
    }

    private createBullet(props: IBulletProps): void {
        const bullet: Bullet = new Bullet(props);
        bullet.attachLevel(this.level);
        bullet.create();
        console.log(props);
        this.level.addToObjectArray(bullet);
    }
}

class Bullet extends GameObject {
    protected filePath: string = "assets/bullet.png";
    protected key: string = "bullet";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected direction: number;
    protected speed: number = 128 / 3;
    private shooter: Shooter;
    private dead: boolean = false;

    constructor(props: IBulletProps) {
        super(props);
        this.direction = props.direction;
        this.generalCollision = this.generalNewCollision.bind(this);
        this.collideWithPlayer = this.collideWithPlayer.bind(this);
    }

    public inRange(v0: number, v1: number): boolean {
        // console.log(Math.abs(v0), Math.abs(v1), Math.abs(v0) - Math.abs(v1), Math.abs(v0) - Math.abs(v1) < 128);
        return (Math.abs(v0 - v1) <= this.speed);
    }

    public create(): void {
        super.create();
    }

    public update(): void {
        if (!this.dead && this.sprite) {
            super.update();
            switch (this.direction) {
                case Phaser.UP:
                    this.sprite.body.y -= this.speed;
                    break;
                case Phaser.DOWN:
                    this.sprite.body.y += this.speed;
                    break;
                case Phaser.LEFT:
                    this.sprite.body.x -= this.speed;
                    break;
                case Phaser.RIGHT:
                    this.sprite.body.x += this.speed;
                    break;
            }


            this.level.gameObjectArray.forEach((gameObject: GameObject) => {
                // if (gameObject !== this && gameObject !== this.level.getPlayer() && gameObject.sprite && this.sprite && gameObject) {
                // console.log(gameObject.collidable, Shooter.inRange(gameObject.sprite.body.x, this.sprite.body.x), Shooter.inRange(gameObject.sprite.body.y, this.sprite.body.y));

                if (gameObject.collidable && gameObject !== this && this.inRange(gameObject.sprite.body.x, this.sprite.body.x) && this.inRange(gameObject.sprite.body.y, this.sprite.body.y) && gameObject !== this.shooter) {
                        console.log(gameObject);
                        this.generalNewCollision();
                    }
                // }
            });
        }
    }

    public generalNewCollision(): void {
        this.sprite.body.y = -99999;
        this.level.removeObjectFromArray(this);
        this.dead = true;
    }

    public collideWithPlayer(): void {
        super.collideWithPlayer();
        this.sprite.body.y = -99999;
        this.level.removeObjectFromArray(this);
        this.level.getPlayer().die();
        this.dead = true;
    }
}

interface IBulletProps extends IGameObjectProps {
    direction: number;
    shooter: Shooter;
}

export {IBulletProps, Bullet, Shooter};
