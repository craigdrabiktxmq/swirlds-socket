import { Injectable } from '@angular/core';
import { ExoConfigurationService } from './exo-configuration.service';
import { HttpClient } from '@angular/common/http';
import { ExoConfig } from './exo-config';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ExoDistributedEndpointService {

  private endpoints:Array<string>;
  private configuration:ExoConfig;

  constructor(private httpClient:HttpClient) { }

  public init(configuration:ExoConfig):Subject<boolean> {
    this.configuration = configuration;

    let endpointsReady:Subject<boolean> = new Subject<boolean>();
    this.endpoints = configuration.defaultNodes.map(endpoint => endpoint);
    
    this.httpClient
      .get(this.endpoints[0] + configuration.apiPath + configuration.endpointsServicePath)
      .subscribe( 
        result => { 
          this.endpoints = result as Array<string>; 
          endpointsReady.next(true);
        },
        error => {
          endpointsReady.next(true);
        }
      );
    return endpointsReady;
  }

  //TODO:  Modularize URL strategy
  private currentEndpointPointer:number = 0;
  public getBaseUrl():string {
    //For testing purposes, let's just implement a round-robin approach
    this.currentEndpointPointer = (this.currentEndpointPointer + 1) % this.endpoints.length;
    return this.endpoints[this.currentEndpointPointer] + this.configuration.apiPath;
  }
}
