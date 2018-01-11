
/**
 * This class defines configuration parameters for the Exo framework.
 * Exo will attempt to load its configuration from /assets/exp-config.json
 * if a configuration file loaction isn't specified in loadConfiguration.
 * 
 * Any settings in code, e.g. when you instantiate an ExoConfig and pass
 * it to to the module's forRoot() method will take priority over what's
 * defined in exo-config.json.
 * 
 * If Exo can't load a config file, it will attempt to continue as best it can.
 * Eventually, it will explode :)
 * 
 * exo-config.json is basically a JSON representation of this class.
 */
export class ExoConfig extends Object {
    /**
     * Exo will try to load its configuration via HTTP from this URL.
     * If a URL is not provided, Exo will load its configuration from
     * /assets/exo-config.json
     */
    public loadConfigFrom:string;
    public defaultNodes: Array<string>;
    public apiPath: String;
    public endpointsServicePath: String = '/endpoints';
}