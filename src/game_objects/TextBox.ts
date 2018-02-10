class TextBox {
    private content: string[];
    private text: Phaser.Text;
    private game: Phaser.Game;
    private wordIndex: number = 0;
    private lineIndex: number = 0;
    private wordDelay: number = 200;
    private lineDelay: number = 200;
    private line: string[] = [];

    constructor(props: ITextBox) {
        this.content = props.content;
        this.game = props.game;
    }

    public start(): void {
        this.text = this.game.add.text(32, 32, "", { font: "15px Arial", fill: "#19de65"});
        this.text.z = 9999;
        this.nextLine();
    }

    private nextLine(): void {
        if (this.lineIndex === this.content.length) {
            return;
        }

        //  Split the current line on spaces, so one word per array element
        this.line = this.content[this.lineIndex].split(" ");

        //  Reset the word index to zero (the first word in the line)
        this.wordIndex = 0;

        //  Call the 'nextWord' function once for each word in the line (line.length)
        this.game.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);

        //  Advance to the next line
        this.lineIndex++;
    }

    private nextWord(): void {
        //  Add the next word onto the text string, followed by a space
        this.text.text = this.text.text.concat(this.line[this.wordIndex] + " ");

        //  Advance the word index to the next word in the line
        this.wordIndex++;

        //  Last word?
        if (this.wordIndex === this.line.length) {

            //  Add a carriage return
            this.text.text = this.text.text.concat("\n");

            //  Get the next line after the lineDelay amount of ms has elapsed
            this.game.time.events.add(this.lineDelay, this.nextLine, this);
        }
    }

}

interface ITextBox {
    content: string[];
    game: Phaser.Game;
}

export {ITextBox, TextBox};
