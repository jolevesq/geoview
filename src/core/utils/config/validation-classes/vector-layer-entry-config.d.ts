import { TypeStyleConfig, TypeVectorSourceInitialConfig } from '@/geo/map/map-schema-types';
import { AbstractBaseLayerEntryConfig } from './abstract-base-layer-entry-config';
/** ******************************************************************************************************************************
 * Type used to define a GeoView vector layer to display on the map.
 */
export declare class VectorLayerEntryConfig extends AbstractBaseLayerEntryConfig {
    /** Layer entry data type. */
    entryType: import("@/geo/map/map-schema-types").TypeLayerEntryType;
    /** Filter to apply on feature of this layer. */
    layerFilter?: string;
    /** Initial settings to apply to the GeoView vector layer source at creation time. */
    source?: TypeVectorSourceInitialConfig;
    /** Style to apply to the vector layer. */
    style?: TypeStyleConfig;
    /**
     * The class constructor.
     * @param {VectorLayerEntryConfig} layerConfig The layer configuration we want to instanciate.
     */
    constructor(layerConfig: VectorLayerEntryConfig);
    /**
     * Method to execute when the layer is loaded.
     */
    loadedFunction(): void;
}
