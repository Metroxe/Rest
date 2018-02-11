import {GameObject, IGameObjectProps} from "../../game_objects/GameObject";
import {TestObject} from "../../game_objects/TestObject";
import {Door} from "../../game_objects/Door";
import {Player} from "../../game_objects/players/Player";
import {OneDPlayer} from "../../game_objects/players/OneDPlayer";

import {
    OneDimensionGround, OneDimensionWallGray,
    OneDimensionWallOrange,
} from "../../game_objects/OneDimension/OneDWall";
import {OneDDoor} from "../../game_objects/OneDimension/OneDDoor";
import {UserInterface} from "../../UserInterface";
import {OneDBlock} from "../../game_objects/OneDimension/OneDBlock";
import {OneDKey} from "../../game_objects/OneDimension/OneDKey";
import {OneDEnemyWalker} from "../../game_objects/OneDimension/OneDEnemyWalker";
import {OneDEnemyShooter} from "../../game_objects/OneDimension/OneDEnemyShooter";
import {EightBitPlayer} from "../../game_objects/players/EightBitPlayer";
import {EightBitBrick} from "../../game_objects/EightBit/EightBitBrick";
import {EightBitGrass} from "../../game_objects/EightBit/EightBitGrass";
import {EightBitBush} from "../../game_objects/EightBit/EightBitBush";
import {EightBitGround} from "../../game_objects/EightBit/EightBitGround";
import {EightBitWell} from "../../game_objects/EightBit/EightBitWell";
import {EightBitStump} from "../../game_objects/EightBit/EightBitStump";
import {EightBitDoor} from "../../game_objects/EightBit/EightBitDoor";
import {EightBitKey} from "../../game_objects/EightBit/EightBitKey";
import {EightBitSwitch} from "../../game_objects/EightBit/EightBitSwitch";

abstract class Level extends Phaser.State {
    public abstract levelName: string;
    public gameObjectArray: GameObject[];
    protected abstract tiledJSONKey: string;
    protected player: Player;
    protected doors: Door[];
    protected userInterface: UserInterface;

    public init(...args): void {
        super.init(args);
        this.gameObjectArray = [];
        this.doors = [];
    }

    public create(game: Phaser.Game): void {
        super.create(game);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.gameObjectArray.forEach((gameObject: GameObject) => {
            gameObject.attachLevel(this);
            gameObject.create();
        });
        if (this.player) {
            this.followPlayer(game);
        }

        this.userInterface = new UserInterface({game, player: this.getPlayer(), level: this});
        this.userInterface.create();

        console.log("the level name is: ", this.levelName);
    }

    public preload(game: Phaser.Game): void {
        super.preload(game);
        this.renderMap(game);
        this.gameObjectArray.forEach((gameObject: GameObject) => {
            gameObject.preload();
        });
    }

    public update(game: Phaser.Game): void {
        super.update(game);
        this.gameObjectArray.forEach((gameObject: GameObject) => {
            gameObject.update();
        });
        this.userInterface.update();
    }

    public getGameObjectArray(): GameObject[] {
        return this.gameObjectArray;
    }

    public addToObjectArray(gameObject: GameObject): void {
        this.gameObjectArray.push(gameObject);
    }

    public removeObjectFromArray(gameObject: GameObject): void {
        this.gameObjectArray.splice(this.gameObjectArray.indexOf(gameObject, 1));
    }

    public setPlayer(player: Player): void {
        this.player = player;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public followPlayer(game: Phaser.Game): void {
        game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    }

    public getTiledJSON(game: Phaser.Game): void {
        return game.cache.getJSON(this.tiledJSONKey, false);
    }

    public getAllDoors(): Door[] {
        return this.doors;
    }

    public getDoor(doorID: string): Door {
        return this.doors[doorID];
    }

    protected renderMap(game: Phaser.Game): void {
        const json: any = game.cache.getJSON(this.tiledJSONKey, false);
        this.renderLayers(json, game, /^lvl2.+$/.test(this.tiledJSONKey));
    }

    private renderLayers(json: any, game: Phaser.Game, dreamTwo: boolean = false): void {
        const ref: any = {};

        game.world.resize(json.width * json.tilewidth, json.height * json.tileheight);

        json.tilesets.forEach((tileset: any): void => {
            Object.keys(tileset.tileproperties).forEach((key: string): void => {
                const num: number = parseInt(key);
                console.log("num: " + num);
                const regKey: string = (num + tileset.firstgid).toString();
                console.log("gid: " + tileset.firstgid);
                if (dreamTwo === true) {
                    ref[regKey] = {
                        key: tileset.tileproperties[key].gameObjectID,
                        frame: num,
                        gid: tileset.firstgid,
                    };
                } else {
                    ref[regKey] = tileset.tileproperties[key].gameObjectID;
                }
            });
        });

        json.layers.forEach((layer: any) => {
            if (layer.type === "tilelayer") {
                layer.data.forEach((numRef: any, i: number) => {
                    const keyRef: string = numRef.toString();
                    // const y: number = Math.floor(i / (layer.width - 1)) * json.tileheight;
                    const y: number = Math.floor((i / layer.width)) * json.tileheight;
                    const x: number = (i % layer.width) * json.tilewidth;
                    if (dreamTwo === true) {
                        this.renderGameObjectWithFrame(ref[keyRef], x, y, game);
                    } else {
                        this.renderGameObject(ref[keyRef], x, y, game);
                    }
                });
            } else {
                layer.objects.forEach((obj: any): void => {
                    if (dreamTwo === true) {
                        if (!obj.properties) {
                            return;
                        }
                        this.renderGameObjectWithFrame({
                            key: obj.properties.gameObjectID,
                            frame: obj.properties.gid,
                        }, obj.x, obj.y - json.tileheight, game, obj.properties);
                    } else {
                        this.renderGameObject(obj.properties.gameObjectID, obj.x, obj.y - json.tileheight, game, obj.properties);
                        //console.log(obj.properties);
                    }
                });
            }
        });
    }

    private renderGameObject(keyRef: string, x: number, y: number, game: Phaser.Game, additional?: any): void {
        let gameObject: GameObject;

        let frame: number = null;
        if (additional.frame) {
            frame = additional.frame;
            delete additional.frame;
        }

        const gameObjectProp: IGameObjectProps = {
            game,
            x,
            y,
            frame,
        };

        switch (keyRef) {
            case "purple":
                gameObject = new TestObject(gameObjectProp);
                break;
            case "OneDWallGray":
                gameObject = new OneDimensionWallGray(gameObjectProp);
                break;
            case "OneDWallOrange":
                gameObject = new OneDimensionWallOrange(gameObjectProp);
                break;
            case "OneDGround":
                gameObject = new OneDimensionGround(gameObjectProp);
                break;
            case "OneDPlayer":
                gameObject = new OneDPlayer(gameObjectProp);
                break;
            case "OneDDoor":
                const doorTemp: Door = new OneDDoor({...gameObjectProp, destination: additional.destination, doorID: additional.doorID});
                this.doors[additional.doorID] = doorTemp;
                gameObject = doorTemp;
                break;
            case "OneDBlock":
                gameObject = new OneDBlock({...gameObjectProp});
                break;
            case "OneDKey":
                gameObject = new OneDKey({...gameObjectProp, openDoorID: additional.openDoorID});
                break;
            case "OneDEnemyWalker":
                gameObject = new OneDEnemyWalker({...gameObjectProp, xAxis: additional.xAxis, offset: additional.offset});
                break;
            case "OneDEnemyShooter":
                gameObject = new OneDEnemyShooter({...gameObjectProp});
                break;
            case "8bit_player":
                gameObject = new EightBitPlayer({...gameObjectProp});
                break;
            case "8bit_brick":
                gameObject = new EightBitBrick({...gameObjectProp});
                break;
            case "8bit_grass":
                gameObject = new EightBitGrass({...gameObjectProp});
                break;
            case "8bit_bush":
                gameObject = new EightBitBush({...gameObjectProp});
                break;
            case "8bit_ground":
                gameObject = new EightBitGround({...gameObjectProp});
                break;
            case "8bit_well":
                gameObject = new EightBitWell({...gameObjectProp});
                break;
            case "8bit_stump":
                gameObject = new EightBitStump({...gameObjectProp});
                break;
            case "8bit_door":
                gameObject = new EightBitDoor({...gameObjectProp, doorID: additional.doorID, destination: additional.destination});
                break;
            case "8bit_key":
                gameObject = new EightBitKey({...gameObjectProp, openDoorID: additional.openDoorID});
                break;
            case "8bit_switch":
                gameObject = new EightBitSwitch({...gameObjectProp, openDoorID: additional.openDoorID, openSwitchDoorID: additional.openSwitchDoorID, selfReset: additional.selfReset});
                break;

        }

        if (gameObject) {
            this.gameObjectArray.push(gameObject);
        }
    }

    private renderGameObjectWithFrame(keyRef: any, x: number, y: number, game: Phaser.Game, additional?: any): void {
        if (!keyRef) {
            return;
        }
        const key: string = keyRef.key;
        const frame: number = keyRef.frame;
        additional = additional || {};
        additional.frame = frame;

        this.renderGameObject(key, x, y, game, additional);
    }
}

export {Level};
