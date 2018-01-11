import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExoModule } from './exo.module';
import { ExoConfigurationService } from './exo-configuration.service';
import { ExoConfig } from './exo-config';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class DistributedEndpointService {

  public endpointsReady:Subject<boolean> = new ReplaySubject(1);
  protected endpoints:Array<string>;

  constructor(protected httpClient:HttpClient, protected configService:ExoConfigurationService) { 
    debugger;
    configService.configReady.subscribe(ready => {
      const config = configService.config;
      this.endpoints = config.defaultNodes.map(endpoint => endpoint);
      httpClient
        .get(this.endpoints[0] + config.apiPath + config.endpointsServicePath)
        .subscribe( 
          result => { 
            debugger; 
            this.endpoints = result as Array<string>; 
            this.endpointsReady.next(true);
          },
          error => {
            this.endpointsReady.next(true);
          }
        );
    });
  }

  private currentEndpointPointer:number = 0;
  public getBaseUrl():string {
    //For testing purposes, let's just implement a round-robin approach
    this.currentEndpointPointer = (this.currentEndpointPointer + 1) % this.endpoints.length;
    return this.endpoints[this.currentEndpointPointer];
  }
}
