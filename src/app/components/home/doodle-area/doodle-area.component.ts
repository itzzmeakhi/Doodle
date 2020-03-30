import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as p5 from 'p5';

import { Subscription } from 'rxjs';

import { HomeService } from '../home.service';
import { Rectangle } from './rectangle.model';
import { Circle } from './circle.model';
import { Line } from './line.model';
import { Point } from './point.model';

@Component({
  selector: 'app-doodle-area',
  templateUrl: './doodle-area.component.html',
  styleUrls: ['./doodle-area.component.css']
})
export class DoodleAreaComponent implements OnInit {

  private p5Init : any;

  modeSubs : Subscription;
  layerIndexSubs : Subscription;
  modeSelected : string = null;
  isCircleMode : boolean = false;
  isRectangleMode : boolean = false;
  isLineMode : boolean = false;
  isPointMode : boolean = false;
  isBrushMode : boolean = false;
  isPenMode : boolean = false;
  layerIndex : number = null;
  isLayerSelected : boolean = false;
  isSelectColorForm : FormGroup;

  constructor(private homeService : HomeService) { }

  ngOnInit() {
    this.createCanvas();

    this.layerIndexSubs = this.homeService.layerIndex
      .subscribe(layerIndexData => {
        this.layerIndex = layerIndexData;
        if(this.layerIndex != null) {
          this.isLayerSelected = true;
        }
      })

    this.homeService.modeSelected
      .subscribe(modeSelected => {
        this.modeSelected = modeSelected;
        //console.log(this.modeSelected);
        if(this.modeSelected) {
          this.modeReset();
          this.isLayerSelected = false;
          this.layerIndex = null;
          if(this.modeSelected === "circle") {
            this.isCircleMode = true;
          } else if(this.modeSelected === 'rectangle') {
            this.isRectangleMode = true;
          } else if(this.modeSelected === 'line') {
            this.isLineMode = true;
          } else if(this.modeSelected === 'point') {
            this.isPointMode = true;
          } else if(this.modeSelected === 'brush') {
            this.isBrushMode = true;
          } else if(this.modeSelected === 'pen') {
            this.isPenMode = true;
          }
        }
      });
  }

  private modeReset() {
    this.isCircleMode = false;
    this.isRectangleMode = false;
    this.isLineMode = false;
    this.isPointMode = false;
    this.isBrushMode = false;
    this.isPenMode = false;
  }

  private createCanvas() {

    let objects : any[] = [];
    let brushStrokes : any[] = [];
    let penStrokes : any[] = [];
    let x1 : number;
    let y1 : number;

    const doodleArea = (p : any) => {

      p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth - 440, p.windowHeight - 250).parent('doodle-area');
        canvas.style('border' , '5px solid #2f3542');
        p.background(206,214,224);
        p.noLoop()
        canvas.mousePressed(canvasClicked);
      }

      const canvasClicked = () => {
        // console.log(objects);
        if((this.isLineMode || this.isCircleMode || this.isRectangleMode || this.isPointMode) && !this.isLayerSelected) {
          p.redraw();
        } else if(this.isLayerSelected) {
          let objectSelected = objects[this.layerIndex];
          //objects[this.layerIndex].dragged(p.mouseX, p.mouseY);
          //objects[this.layerIndex].show();
          // console.log(objectSelected.mouseX);
          // console.log(objectSelected.pmouseX)
        } else {
          p.loop();
        }

        for(let i = 0; i < objects.length; i++) {
          objects[i].show();
        }
      }

      p.draw = () => {
        if(p.keyIsPressed) {
          p.noLoop();
        }

        if(this.isRectangleMode) {
          p.mouseDragged = () => {
            // Do Nothing
          }
          let rectangle = new Rectangle(p.mouseX, p.mouseY, 250, 100, '#f7d794', '#ac7623', 1, p);
          // rectangle.show();
          //let rectangle = p.rect(p.mouseX, p.mouseY, p.mouseX+ 70, p.mouseY + 50);
          objects.push(rectangle);
          this.homeService.layers.next(objects);
        } else if(this.isCircleMode) {
          p.mouseDragged = () => {
            // Do Nothing
          }
          let circle = new Circle(p.mouseX, p.mouseY, 100, '#25CCF7', '#182C61', 1, p);
          // circle.show();
          objects.push(circle);
          this.homeService.layers.next(objects);
        } else if(this.isLineMode) {
          p.mouseDragged = () => {
            // Do Nothing
          }
          let line = new Line(p.mouseX, p.mouseY, p.mouseX + 150, p.mouseY, '#0a3d62', 4, p);
          // line.show();
          objects.push(line);
          this.homeService.layers.next(objects);
        } else if(this.isPointMode) {
          p.mouseDragged = () => {
            // Do Nothing
          }
          let point = new Point(p.mouseX, p.mouseY, '#16a085',20, p);
          // point.show();
          objects.push(point);
          this.homeService.layers.next(objects);
        } else if(this.isBrushMode) {
          if(p.mouseIsPressed) {
            p.mouseDragged = () => {
              p.stroke(0);
              p.strokeWeight(15);
              let brushObj = p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
              brushStrokes.push(brushObj);
            }
          }
        } else if(this.isPenMode) {
          if(p.mouseIsPressed) {
            p.mouseDragged = () => {
              p.stroke(0);
              p.strokeWeight(1);
              let penObj = p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
              penStrokes.push(penObj);
            }
          }
        }
      }
    }
    this.p5Init = new p5(doodleArea);
  }

}
