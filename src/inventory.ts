import get from "lodash/get";

class Inventory {
    protected ref: {[key: string]: number};

    private static instance: Inventory;

    private constructor() {
        // ...
    }
    public static getInstance(): Inventory {
        if (!Inventory.instance) {
            Inventory.instance = new Inventory();
        }
        return Inventory.instance;
    }

    public setItem(key: string, count: number): number {
        this.ref[key] = count;
        return count;
    }
    public getItem(key: string): number{
        if (get(this.ref, key, null) === null) {
            return 0;
        }
        return this.ref[key];
    }
}

export {Inventory}