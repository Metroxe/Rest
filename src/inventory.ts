class Inventory {
    protected ref: {[key: string]: number};

    private static instance: Inventory;

    private constructor() {
        this.ref = {
            lives: 50,
        };
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
        if (!this.ref[key]) {
            return 0;
        }
        return this.ref[key];
    }
    public clearInventory(): void {
        this.ref = {
            lives: 3,
        };
    }
}

export {Inventory}