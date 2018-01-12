import { ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExoConfig } from './exo-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/of";
import { ExoConfigurationService } from './exo-configuration.service';
import { ExoPlatformService } from './exo-platform.service';
import { ExoDistributedEndpointService } from './exo-distributed-endpoint.service';

@NgModule({
  imports: [
    CommonModule,    
  ],
  providers: [
    ExoConfigurationService, 
    ExoPlatformService, 
    ExoDistributedEndpointService
  ]
})
export class ExoModule { 

  private static config:ExoConfig;
  public static forRoot(@Optional() config:ExoConfig): ModuleWithProviders {
    if (config) {
      ExoModule.config = config;
    } else {
      ExoModule.config = new ExoConfig();
      ExoModule.config.loadConfigFrom = "/assets/exo-config.json";
    }

    return {
      ngModule: ExoModule,
      providers: [
        
      ]
    };
  }

  constructor(platformService:ExoPlatformService) {
    platformService.init(ExoModule.config);
  }
}
