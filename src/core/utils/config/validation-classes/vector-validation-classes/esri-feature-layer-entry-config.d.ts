import { TypeSourceEsriFeatureInitialConfig } from '@/geo/layer/geoview-layers/vector/esri-feature';
import { VectorLayerEntryConfig } from '@/core/utils/config/validation-classes/vector-layer-entry-config';
export declare class EsriFeatureLayerEntryConfig extends VectorLayerEntryConfig {
    source: TypeSourceEsriFeatureInitialConfig;
    /**
     * The class constructor.
     * @param {EsriFeatureLayerEntryConfig} layerConfig The layer configuration we want to instanciate.
     */
    constructor(layerConfig: EsriFeatureLayerEntryConfig);
}
