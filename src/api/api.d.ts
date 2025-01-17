import { Event } from './events/event';
import { Projection } from '@/geo/projection/projection';
import { MapViewer } from '@/geo/map/map-viewer';
import { Plugin } from './plugin/plugin';
import { DateMgt } from '@/core/utils/date-mgt';
import * as Utilities from '@/core/utils/utilities';
import * as GeoUtilities from '@/geo/utils/utilities';
/**
 * Class used to handle api calls (events, functions etc...)
 *
 * @exports
 * @class API
 */
export declare class API {
    #private;
    event: Event;
    maps: Record<string, MapViewer>;
    plugin: Plugin;
    utilities: {
        core: typeof Utilities;
        geo: typeof GeoUtilities;
        projection: Projection;
        date: DateMgt;
    };
    /**
     * Initiate the event and projection objects
     */
    constructor();
    /**
     * Create a new map in a given div id.
     * GV The div MUST NOT have a geoview-map class or a warning will be shown when initMapDivFromFunctionCall is called.
     * If is present, the div will be created with a default config
     *
     * @param {string} divId the id of the div to create map in
     * @param {string} mapConfig the config passed in from the function call
     */
    createMapFromConfig: (divId: string, mapConfig: string) => Promise<void>;
}
