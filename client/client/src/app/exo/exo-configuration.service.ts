import { Injectable } from '@angular/core';
import { ExoConfig } from './exo-config';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/from";
import { Observer } from 'rxjs/Observer';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class ExoConfigurationService {

  public configReady:Subject<boolean> = new ReplaySubject<boolean>(1);

  private _config:ExoConfig;
  public get config():ExoConfig {
      return Object.assign({}, this._config);
  }

  constructor(private httpClient:HttpClient) { }

  public init(config:ExoConfig) {
    debugger;
    if (config) {
      this._config = config;
      if (config.loadConfigFrom) {
        this.httpClient.get(config.loadConfigFrom).subscribe(
          result => {
            //Use the loaded config, and override those values with any that were passed into the init method
            debugger;
            this._config = result as ExoConfig;
            this.configReady.next(true);
          },
          error => {
            this.loadConfigFromAssets();
          }
        );
      } else {
        //A config was passed in, but no value for loadConfigFrom was set.
        //Assume that the application wants to hard-code its configuration.
        this.configReady.next(true);
      }
    } else {
      //Atempt to load the config file from the assets folder
      this.loadConfigFromAssets();
    }
  }

  private loadConfigFromAssets():void {
    debugger;
    this.httpClient.get('/assets/exo-config.json').subscribe(
      result => {
        debugger;
        this.configReady.next(true);
      },
      error => {
        //There's no config file.  Assume that <app root>/api is the API root
        this._config = new ExoConfig();
        this._config.defaultNodes = [window.location.origin];
        this._config.apiPath = '/api';
        this.configReady.next(true);
      }
    )
  }
}
