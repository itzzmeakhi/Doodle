import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';

import { HomeService } from '../home.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {

  layers : any[] = [];
  layerEditForm : FormGroup;
  layerSubs : Subscription;
  isCanvasHadLayers : boolean = false;
  isLayerSelected : boolean = false;
  isFillColor : boolean = false;
  prevBorderWidth : number = null;
  prevBorderColor : string = null;
  prevFillColor : string = null;
  layerIndex : number = null;

  constructor(private homeService : HomeService) { }

  ngOnInit() {
    this.layerSubs = this.homeService.layers
      .subscribe(layersData => {
        this.layers = layersData;
        if(this.layers.length > 0) {
          this.isCanvasHadLayers = true;
        }
      })
  }

  private layerEditFormInit(isFill = false) {
    //console.log(isFillColor);
    if( isFill && this.isLayerSelected ) {
      this.layerEditForm = new FormGroup({
        'borderWidth' : new FormControl(this.prevBorderWidth),
        'borderColor' : new FormControl(this.prevBorderColor),
        'fillColor' : new FormControl(this.prevFillColor)
      })
    } else {
      this.layerEditForm = new FormGroup({
        'borderWidth' : new FormControl(this.prevBorderWidth),
        'borderColor' : new FormControl(this.prevBorderColor)
      })
    }
  }

  get borderWidth() {
    return this.layerEditForm.get('borderWidth');
  }

  get borderColor() {
    return this.layerEditForm.get('borderColor');
  }

  get fillColor() {
    return this.layerEditForm.get('fillColor');
  }

  onSelectMode(mode : string) {
    this.isCanvasHadLayers = false;
    this.isLayerSelected = false;
    this.isFillColor = false;
    this.prevBorderWidth = null;
    this.prevBorderColor = null;
    this.prevFillColor = null;
    this.homeService.modeSelected.next(mode);
  }

  onSelectLayer(index : number) {
    this.homeService.layerIndex.next(index);
    this.layerIndex = index;
    //console.log(this.layers[0]);
    // this.prevBorderWidth = this.layers[index].p._curElement.drawingContext.lineWidth;
    //this.prevBorderColor = this.layers[index].p._curElement.drawingContext.strokeStyle;
    this.prevBorderWidth = this.layers[index].strokeWeight;
    this.prevBorderColor = this.layers[index].strokeColor;
    if(this.layers[index].fillColor) {
      this.prevFillColor = this.layers[index].fillColor;
      this.isFillColor = true;
      this.isLayerSelected = true;
      this.layerEditFormInit(true);
    } else {
      this.isLayerSelected = true;
      this.layerEditFormInit();
    }
  }

  onFormSubmit() {
    if(this.isFillColor) {
      this.layers[this.layerIndex].change(this.borderWidth.value, this.borderColor.value, this.fillColor.value);
    } else {
      this.layers[this.layerIndex].change(this.borderWidth.value, this.borderColor.value);
    }
    // console.log(this.borderColor.value);
    // console.log(this.fillColor.value);
  }



  ngOnDestroy() {
    if(this.layerSubs) {
      this.layerSubs.unsubscribe();
    }
  }

}
