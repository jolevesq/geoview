import { TypeSourceGeoJSONInitialConfig } from '@/geo/layer/geoview-layers/vector/geojson';
import { VectorLayerEntryConfig } from '@/core/utils/config/validation-classes/vector-layer-entry-config';
export declare class GeoJSONLayerEntryConfig extends VectorLayerEntryConfig {
    source: TypeSourceGeoJSONInitialConfig;
    /**
     * The class constructor.
     * @param {GeoJSONLayerEntryConfig} layerConfig The layer configuration we want to instanciate.
     */
    constructor(layerConfig: GeoJSONLayerEntryConfig);
}
