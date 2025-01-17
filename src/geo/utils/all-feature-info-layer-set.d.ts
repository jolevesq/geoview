import { ConfigBaseClass } from '@/core/utils/config/validation-classes/config-base-class';
import { TypeLayerStatus } from '@/geo/map/map-schema-types';
import { AbstractGeoViewLayer } from '@/geo/layer/geoview-layers/abstract-geoview-layers';
import { LayerSet, QueryType, TypeLayerData } from './layer-set';
/**
 * A class containing a set of layers associated with a TypeLayerData object, which will receive the result of a
 * "get  all feature info" request made on a specific layer of the map. The query is made for one layer at a time.
 *
 * @class AllFeatureInfoLayerSet
 */
export declare class AllFeatureInfoLayerSet extends LayerSet {
    /** The resultSet object as existing in the base class, retyped here as a TypeAllFeatureInfoResultSet */
    resultSet: TypeAllFeatureInfoResultSet;
    /**
     * Overrides the behavior to apply when an all-feature-info-layer-set wants to check for condition to register a layer in its set.
     * @param {AbstractGeoViewLayer} geoviewLayer - The geoview layer being registered
     * @param {string} layerPath - The layer path
     * @returns {boolean} True when the layer should be registered to this all-feature-info-layer-set.
     */
    protected onRegisterLayerCheck(geoviewLayer: AbstractGeoViewLayer, layerPath: string): boolean;
    /**
     * Overrides the behavior to apply when an all-feature-info-layer-set wants to register a layer in its set.
     * @param {AbstractGeoViewLayer} geoviewLayer - The geoview layer being registered
     * @param {string} layerPath - The layer path
     */
    protected onRegisterLayer(geoviewLayer: AbstractGeoViewLayer, layerPath: string): void;
    /**
     * Overrides the behavior to apply when a layer status changed for a all-feature-info-layer-set.
     * @param {ConfigBaseClass} config - The layer config class
     * @param {string} layerPath - The layer path being affected
     * @param {string} layerStatus - The new layer status
     */
    protected onProcessLayerStatusChanged(config: ConfigBaseClass, layerPath: string, layerStatus: TypeLayerStatus): void;
    /**
     * Helper function used to launch the query on a layer to get all of its feature information.
     * @param {string} layerPath - The layerPath that will be queried
     * @param {QueryType} queryType - The query's type to perform
     * @returns {Promise<TypeAllFeatureInfoResultSet | void>} A promise which will hold the result of the query
     */
    queryLayer(layerPath: string, queryType?: QueryType): Promise<TypeAllFeatureInfoResultSet | void>;
}
export type TypeAllFeatureInfoResultSetEntry = {
    layerName?: string;
    layerStatus: TypeLayerStatus;
    data: TypeLayerData;
};
export type TypeAllFeatureInfoResultSet = {
    [layerPath: string]: TypeAllFeatureInfoResultSetEntry;
};
