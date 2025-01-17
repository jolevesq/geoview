import { TypeSourceGeoPackageInitialConfig } from '@/geo/layer/geoview-layers/vector/geopackage';
import { VectorLayerEntryConfig } from '@/core/utils/config/validation-classes/vector-layer-entry-config';
export declare class GeoPackageLayerEntryConfig extends VectorLayerEntryConfig {
    source: TypeSourceGeoPackageInitialConfig;
    /**
     * The class constructor.
     * @param {GeoPackageLayerEntryConfig} layerConfig The layer configuration we want to instanciate.
     */
    constructor(layerConfig: GeoPackageLayerEntryConfig);
}
