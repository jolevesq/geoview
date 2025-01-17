import { LayerSet } from '@/geo/utils/layer-set';
import { ConfigBaseClass } from '@/core/utils/config/validation-classes/config-base-class';
import { TypeLayerStatus } from '@/geo/map/map-schema-types';
import { AbstractGeoViewLayer, TypeLegend } from '@/geo/layer/geoview-layers/abstract-geoview-layers';
/**
 * A class to hold a set of layers associated with an array of TypeLegend. When this class is instantiated, all layers already
 * loaded on the specified map will be added to the set. Layers added afterwards will be added to the set and deleted layers
 * will be removed from the set.
 *
 * @class LegendsLayerSet
 */
export declare class LegendsLayerSet extends LayerSet {
    #private;
    /** The resultSet object as existing in the base class, retyped here as a TypeLegendResultSet */
    resultSet: TypeLegendResultSet;
    /**
     * Overrides the behavior to apply when a legends-layer-set wants to register a layer in its set.
     * @param {AbstractGeoViewLayer} geoviewLayer - The geoview layer being registered
     * @param {string} layerPath - The layer path
     */
    onRegisterLayer: (geoviewLayer: AbstractGeoViewLayer, layerPath: string) => void;
    /**
     * Overrides the behavior to apply when a layer status changed for a legends-layer-set.
     * @param {ConfigBaseClass} config - The layer config class
     * @param {string} layerPath - The layer path being affected
     * @param {string} layerStatus - The new layer status
     */
    protected onProcessLayerStatusChanged(config: ConfigBaseClass, layerPath: string, layerStatus: TypeLayerStatus): void;
    /**
     * Overrides the behavior to apply when a layer set was updated for a legends-layer-set.
     * @param {string} layerPath - The layer path which triggered the layer set update
     */
    protected onLayerSetUpdatedProcess(layerPath: string): void;
}
export type TypeLegendResultSetEntry = {
    layerName?: string;
    layerStatus: TypeLayerStatus;
    data: TypeLegend | undefined | null;
};
/** The legend resultset type associate a layer path to a legend object. The undefined value indicate that the get legend query
 * hasn't been run and the null value indicate that there was a get legend error.
 */
export type TypeLegendResultSet = {
    [layerPath: string]: TypeLegendResultSetEntry;
};
