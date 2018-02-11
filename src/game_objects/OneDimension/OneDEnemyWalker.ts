import {Enemy} from "../Enemy";
import {IGameObjectProps} from "../GameObject";

class OneDEnemyWalker extends Enemy  {
    public collidable: boolean = true;
    protected filePath: string = "assets/characters_one_dimension.png";
    protected key: string = "OneDEnemyWalker";
    protected frameWidth: number = 128;
    protected frameHeight: number = 128;
    protected startingFrame: number = 0;
    private xAxis: boolean;
    private offset: number;
    private startingLoc: number;
    private going: boolean;
    private incrementSpeed: number = 5;
    private cooldownUp: boolean = false;
    private cooldownDown: boolean = false;
    private lastPos: number = 0;

    constructor(props: IEnemyObjectProps) {
        super(props);
        this.update = this.update.bind(this);
        this.offset = props.offset;
        this.xAxis = props.xAxis;
        this.startingLoc = this.xAxis ? props.x : props.y;
        this.going = true;
    }

    public create(): void {
        super.create();
        this.sprite.body.immovable = false;
        this.setNotImmovable();
        if (!this.xAxis) {
            this.lastPos = this.sprite.body.y;
        } else if (this.xAxis) {
            this.lastPos = this.sprite.body.x;
        }
    }

    public update(): void {
        super.update();

        // console.log(this.sprite.y);

        const actualPos: number = this.xAxis ? this.sprite.body.x : this.sprite.body.y;
        const destination: number = this.going ? this.startingLoc + this.offset : this.startingLoc;
        // let collided: boolean = false;
        let collidedUp: boolean = false;
        let collidedDown: boolean = false;


        if(!this.xAxis) {
            // console.log("1");
            for(let i = 0; i < this.level.gameObjectArray.length; i++) {
                if (this.level.gameObjectArray[i].getKey() !== this.getKey()) {
                    if (this.level.gameObjectArray[i].collidable) {
                        if (this.level.gameObjectArray[i].sprite.body.x === this.sprite.body.x) {
                            if (this.sprite.body.y >= this.lastPos){
                                // console.log("WE ARE MOVING UP");
                                // console.log(this.sprite.body.y - this.level.gameObjectArray[i].sprite.body.y);
                                if ((this.level.gameObjectArray[i].sprite.body.y + 128) >= this.sprite.body.y) {
                                    console.log("TOP WALL");
                                    collidedUp = true;
                                    break;
                                }
                            } else if (this.sprite.body.y < this.lastPos){
                                if ((this.level.gameObjectArray[i].sprite.body.y - 128) <= this.sprite.body.y) {
                                    console.log("BOTTOM WALL");
                                    collidedDown = true;
                                    break;
                                }
                            }
                            // if (this.level.gameObjectArray[i].y > this.y + 128) {
                            //     return;
                            // }
                        }
                    }
                }
            }
        }

        if (!this.xAxis) {
            this.lastPos = this.sprite.body.y;
        } else if (this.xAxis) {
            this.lastPos = this.sprite.body.x;
        }

        if(collidedUp && !this.cooldownUp){
            // this.xAxis ? this.sprite.body.x = destination : this.sprite.body.y = destination;
            this.going = !this.going;

            this.cooldownUp = true;
            const that: OneDEnemyWalker = this;
            setTimeout(() => {
                that.cooldownUp = false;
            }, 100);
            return;
        }

        if(collidedDown && !this.cooldownDown){
            // this.xAxis ? destination = destination : this.sprite.body.y = destination;
            this.going = !this.going;
            this.cooldownDown = true;
            const that: OneDEnemyWalker = this;
            setTimeout(() => {
                that.cooldownDown = false;
            }, 100);
            return;
        }

        if (Math.abs(actualPos - destination) < this.incrementSpeed) {
            this.xAxis ? this.sprite.body.x = destination : this.sprite.body.y = destination;
            this.going = !this.going;
            return;
        }

        if (actualPos < destination) {
            this.xAxis ? this.sprite.body.x += this.incrementSpeed : this.sprite.body.y += this.incrementSpeed;
            return;
        }

        if (actualPos > destination) {
            this.xAxis ? this.sprite.body.x -= this.incrementSpeed : this.sprite.body.y -= this.incrementSpeed;
            return;
        }

    }
}

interface IEnemyObjectProps extends IGameObjectProps {
    xAxis: boolean;
    offset: number;
}

export {IEnemyObjectProps, OneDEnemyWalker};
