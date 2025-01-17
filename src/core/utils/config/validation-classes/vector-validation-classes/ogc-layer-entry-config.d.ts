import { TypeSourceOgcFeatureInitialConfig } from '@/geo/layer/geoview-layers/vector/ogc-feature';
import { VectorLayerEntryConfig } from '@/core/utils/config/validation-classes/vector-layer-entry-config';
export declare class OgcFeatureLayerEntryConfig extends VectorLayerEntryConfig {
    source: TypeSourceOgcFeatureInitialConfig;
    /**
     * The class constructor.
     * @param {OgcFeatureLayerEntryConfig} layerConfig The layer configuration we want to instanciate.
     */
    constructor(layerConfig: OgcFeatureLayerEntryConfig);
}
