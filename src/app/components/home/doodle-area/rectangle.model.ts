export class Rectangle {
    public x1 : number;
    public y1 : number;
    public width : number;
    public height : number;
    public fillColor : string;
    public strokeColor : string;
    public strokeWeight : number;
    public p : any;

    constructor(
        x1 : number,
        y1 : number,
        width : number,
        height : number,
        fColor : string,
        sColor : string,
        sWeight : number,
        p : any) {
            this.x1 = x1;
            this.y1 = y1;
            this.width = width;
            this.height = height;
            this.fillColor = fColor;
            this.strokeColor = sColor;
            this.strokeWeight = sWeight;
            this.p = p;
        }

    
    show() {
        //this.p.stroke(this.strokeColor);
        this.p.strokeWeight(this.strokeWeight);
        this.p.stroke(this.strokeColor);
        this.p.fill(this.fillColor);
        this.p.rect(this.x1, this.y1, this.width, this.height);
    }

    change(sWeight : number, strokeColor : string, fillColor? : string) {
        this.strokeWeight = sWeight;
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
        this.show();
    }

    dragged(x : number, y : number) {
        // let distance  = this.p.dist(x, y, this.x1, this.y1);
        
        
        // this.rect.translate(x, y);
    }
}