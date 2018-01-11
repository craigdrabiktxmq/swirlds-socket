import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DistributedEndpointService {

  protected endpoints:Array<string> = ['http://localhost:52205'];
  protected endpointServicePath = '/HashgraphZoo/1.0.0/endpoints';

  constructor(protected httpClient:HttpClient) { 
    httpClient
      .get(this.endpoints[0] + '/HashgraphZoo/1.0.0/endpoints')
      .subscribe( result => this.endpoints = result as Array<string> );
  }

  private currentEndpointPointer:number = 0;
  public getBaseUrl():string {
    //For testing purposes, let's just implement a round-robin approach
    this.currentEndpointPointer = (this.currentEndpointPointer + 1) % this.endpoints.length;
    return this.endpoints[this.currentEndpointPointer];
  }
}
