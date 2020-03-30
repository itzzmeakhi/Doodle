export class Line {
    public x1 : number;
    public y1 : number;
    public x2 : number;
    public y2 : number;
    // public fillColor : RGBFill;
    public strokeColor : string;
    public strokeWeight : number;
    public p : any;

    constructor(
        x1 : number,
        y1 : number,
        x2 : number,
        y2 : number,
        stroke : string,
        sWeight : number,
        p : any) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            //this.fillColor = fill;
            this.strokeColor = stroke;
            this.strokeWeight = sWeight;
            this.p = p;
        }

    
    show() {
        this.p.stroke(this.strokeColor);
        this.p.strokeWeight(this.strokeWeight);
        this.p.line(this.x1, this.y1, this.x2, this.y2);
    }

    change(sWeight : number, strokeColor : string, fillColor? : string) {
        this.strokeWeight = sWeight;
        this.strokeColor = strokeColor;
        this.show();
    }

    clicked(x : number, y : number) {
        // let distance  = this.p.dist(x, y, this.x1, this.y1);

        // if(distance <= this.width || distance <= this.height) {
        //     console.log("IN")
        // }
    }
}