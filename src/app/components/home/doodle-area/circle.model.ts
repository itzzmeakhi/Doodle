export class Circle {
    public x1 : number;
    public y1 : number;
    public diamter : number;
    public fillColor : string;
    public strokeColor : string;
    public strokeWeight : number;
    public p : any;

    constructor(
        x1 : number,
        y1 : number,
        d : number,
        fill : string,
        stroke : string,
        sWeight : number,
        p : any) {
            this.x1 = x1;
            this.y1 = y1;
            this.diamter = d;
            this.fillColor = fill;
            this.strokeColor = stroke;
            this.strokeWeight = sWeight;
            this.p = p;
        }

    
    show() {
        this.p.stroke(this.strokeColor);
        this.p.fill(this.fillColor);
        this.p.strokeWeight(this.strokeWeight);
        this.p.circle(this.x1, this.y1, this.diamter);
    }

    change(sWeight : number, strokeColor : string, fillColor? : string) {
        this.strokeWeight = sWeight;
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
        this.show();
    }

    clicked(x : number, y : number) {
        // let distance  = this.p.dist(x, y, this.x1, this.y1);

        // if(distance <= this.width || distance <= this.height) {
        //     console.log("IN")
        // }
    }
}