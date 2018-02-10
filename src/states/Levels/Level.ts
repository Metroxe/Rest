import {GameObject, IGameObjectProps} from "../../game_objects/GameObject";
import {TestObject} from "../../game_objects/TestObject";

abstract class Level extends Phaser.State {
    protected gameObjectArray: GameObject[];
    protected abstract tiledJSONKey: string;

    public init(...args): void {
        super.init(args);
        this.gameObjectArray = [];
    }

    public create(game: Phaser.Game): void {
        super.create(game);
        this.gameObjectArray.forEach((gameObject: GameObject) => {
            gameObject.render();
        });
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
    }

    protected renderMap(game: Phaser.Game): void {
        const json: any = game.cache.getJSON(this.tiledJSONKey, false);
        this.renderTileset(json, game);
    }

    private renderTileset(json: any, game: Phaser.Game): void {
        const ref: any = {};

        json.tilesets.forEach((tileset: any): void => {
            Object.keys(tileset.tileproperties).forEach((key: string): void => {
                const num: number = parseInt(key);
                const regKey: string = (num + tileset.firstgid).toString();
                ref[regKey] = tileset.tileproperties[key].gameObjectID;
            });
        });

        json.layers.forEach((layer: any) => {
            layer.data.forEach((numRef: any, i: number) => {
                const keyRef: string = numRef.toString();
                // const y: number = Math.floor(i / (layer.width - 1)) * json.tileheight;
                const y: number = Math.floor((i / layer.width)) * json.tileheight;
                const x: number = (i % layer.width) * json.tilewidth;
                this.renderGameObject(ref[keyRef], x, y, game);
            });
        });
    }

    private renderGameObject(keyRef: string, x: number, y: number, game: Phaser.Game): void {
        let gameObject: GameObject;

        const gameObjectProp: IGameObjectProps = {
            game,
            x,
            y,
        };

        switch (keyRef) {
            case "purple":
                gameObject = new TestObject(gameObjectProp);
        }

        if (gameObject) {
            this.gameObjectArray.push(gameObject);
        }
    }
}

export {Level};
