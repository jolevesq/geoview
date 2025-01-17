import { Coordinate } from 'ol/coordinate';
import { ConfigBaseClass } from '@/core/utils/config/validation-classes/config-base-class';
import { TypeLayerStatus } from '@/geo/map/map-schema-types';
import { AbstractGeoViewLayer, TypeGeoviewLayerType } from '@/geo/layer/geoview-layers/abstract-geoview-layers';
import { LayerSet, TypeFieldEntry, TypeQueryStatus } from './layer-set';
import { LayerApi } from '@/geo/layer/layer';
/**
 * A class containing a set of layers associated with a TypeLayerData object, which will receive the result of a
 * "get feature info" request made on the map layers when the user hovers over a position in a stationary way.
 *
 * @class HoverFeatureInfoLayerSet
 */
export declare class HoverFeatureInfoLayerSet extends LayerSet {
    /** The resultSet object as existing in the base class, retyped here as a TypeHoverFeatureInfoResultSet */
    resultSet: TypeHoverFeatureInfoResultSet;
    /**
     * The class constructor that instanciate a set of layer.
     * @param {LayerApi} layerApi - The layer Api to work with.
     */
    constructor(layerApi: LayerApi);
    /**
     * Overrides the behavior to apply when a hover-feature-info-layer-set wants to check for condition to register a layer in its set.
     * @param {AbstractGeoViewLayer} geoviewLayer - The geoview layer being registered
     * @param {string} layerPath - The layer path
     * @returns {boolean} True when the layer should be registered to this hover-feature-info-layer-set.
     */
    protected onRegisterLayerCheck(geoviewLayer: AbstractGeoViewLayer, layerPath: string): boolean;
    /**
     * Overrides the behavior to apply when a hover-feature-info-layer-set wants to register a layer in its set.
     * @param {AbstractGeoViewLayer} geoviewLayer - The geoview layer being registered
     * @param {string} layerPath - The layer path
     */
    protected onRegisterLayer(geoviewLayer: AbstractGeoViewLayer, layerPath: string): void;
    /**
     * Overrides the behavior to apply when a layer status changed for a hover-feature-info-layer-set.
     * @param {ConfigBaseClass} config - The layer config class
     * @param {string} layerPath - The layer path being affected
     * @param {string} layerStatus - The new layer status
     */
    protected onProcessLayerStatusChanged(config: ConfigBaseClass, layerPath: string, layerStatus: TypeLayerStatus): void;
    /**
     * Queries the features at the provided coordinate for all the registered layers.
     * @param {Coordinate} pixelCoordinate - The pixel coordinate where to query the features
     */
    queryLayers(pixelCoordinate: Coordinate): void;
    /**
     * Function used to enable listening of hover events. When a layer path is not provided,
     * hover events listening is enabled for all layers.
     * @param {string} layerPath - Optional parameter used to enable only one layer
     */
    enableHoverListener(layerPath?: string): void;
    /**
     * Function used to disable listening of hover events. When a layer path is not provided,
     * hover events listening is disable for all layers.
     * @param {string} layerPath - Optional parameter used to disable only one layer
     */
    disableHoverListener(layerPath?: string): void;
    /**
     * Function used to determine whether hover events are disabled for a layer. When a layer path is not provided,
     * the value returned is undefined if the map flags are a mixture of true and false values.
     * @param {string} layerPath - Optional parameter used to get the flag value of a layer.
     * @returns {boolean | undefined} The flag value for the map or layer.
     */
    isHoverListenerEnabled(layerPath?: string): boolean | undefined;
}
export type TypeHoverFeatureInfo = {
    geoviewLayerType: TypeGeoviewLayerType;
    featureIcon: HTMLCanvasElement;
    fieldInfo: TypeFieldEntry | undefined;
    nameField: string | null;
} | undefined | null;
export type TypeHoverLayerData = {
    layerStatus: TypeLayerStatus;
    eventListenerEnabled: boolean;
    queryStatus: TypeQueryStatus;
    feature: TypeHoverFeatureInfo;
};
export type TypeHoverFeatureInfoResultSetEntry = {
    layerStatus: TypeLayerStatus;
    data: TypeHoverLayerData;
};
export type TypeHoverFeatureInfoResultSet = {
    [layerPath: string]: TypeHoverFeatureInfoResultSetEntry;
};
