import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn : 'root' })
export class HomeService {
    modeSelected = new BehaviorSubject<string>(null);
    layers = new BehaviorSubject<any[]>([]);
    layerIndex = new BehaviorSubject<number>(null);
}