import { TypeListOfGeoviewLayerConfig, TypeDisplayLanguage } from '@/geo/map/map-schema-types';
/**
 * Class used to add geoCore layer to the map
 *
 * @exports
 * @class GeoCore
 */
export declare class GeoCore {
    private mapId;
    private displayLanguage;
    /** Config validation object used to validate the configuration and define default values */
    private configValidation;
    /**
     * Constructor
     * @param {string} mapId the id of the map
     */
    constructor(mapId: string, displayLanguage: TypeDisplayLanguage);
    /**
     * Gets GeoView layer configurations list from the UUIDs of the list of layer entry configurations.
     *
     * @param {GeoCoreLayerEntryConfig} geocoreLayerConfig the layer configuration
     * @returns {Promise<TypeListOfGeoviewLayerConfig>} list of layer configurations to add to the map
     */
    createLayersFromUUID(uuid: string): Promise<TypeListOfGeoviewLayerConfig>;
}
