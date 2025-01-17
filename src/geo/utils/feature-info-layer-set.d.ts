import { Coordinate } from 'ol/coordinate';
import { EventDelegateBase } from '@/api/events/event-helper';
import { ConfigBaseClass } from '@/core/utils/config/validation-classes/config-base-class';
import { TypeLayerStatus } from '@/geo/map/map-schema-types';
import { AbstractGeoViewLayer } from '@/geo/layer/geoview-layers/abstract-geoview-layers';
import { EventType, LayerSet, TypeLayerData, TypeResultSet } from './layer-set';
import { LayerApi } from '@/geo/layer/layer';
/**
 * A class containing a set of layers associated with a TypeLayerData object, which will receive the result of a
 * "get feature info" request made on the map layers when the user click a location on the map.
 *
 * @class FeatureInfoLayerSet
 */
export declare class FeatureInfoLayerSet extends LayerSet {
    #private;
    /** The resultSet object as existing in the base class, retyped here as a TypeFeatureInfoResultSet */
    resultSet: TypeFeatureInfoResultSet;
    /**
     * The class constructor that instanciate a set of layer.
     * @param {LayerApi} layerApi - The layer Api to work with.
     */
    constructor(layerApi: LayerApi);
    /**
     * Overrides the behavior to apply when a feature-info-layer-set wants to check for condition to register a layer in its set.
     * @param {AbstractGeoViewLayer} geoviewLayer - The geoview layer being registered
     * @param {string} layerPath - The layer path
     * @returns {boolean} True when the layer should be registered to this feature-info-layer-set.
     */
    protected onRegisterLayerCheck(geoviewLayer: AbstractGeoViewLayer, layerPath: string): boolean;
    /**
     * Overrides the behavior to apply when a feature-info-layer-set wants to register a layer in its set.
     * @param {AbstractGeoViewLayer} geoviewLayer - The geoview layer being registered
     * @param {string} layerPath - The layer path
     */
    protected onRegisterLayer(geoviewLayer: AbstractGeoViewLayer, layerPath: string): void;
    /**
     * Overrides the behavior to apply when a layer status changed for a feature-info-layer-set.
     * @param {ConfigBaseClass} config - The layer config class
     * @param {string} layerPath - The layer path being affected
     * @param {string} layerStatus - The new layer status
     */
    protected onProcessLayerStatusChanged(config: ConfigBaseClass, layerPath: string, layerStatus: TypeLayerStatus): void;
    /**
     * Registers a query ended event handler.
     * @param {QueryEndedDelegate} callback - The callback to be executed whenever the event is emitted
     */
    onQueryEnded(callback: QueryEndedDelegate): void;
    /**
     * Unregisters a query ended event handler.
     * @param {QueryEndedDelegate} callback - The callback to stop being called whenever the event is emitted
     */
    offQueryEnded(callback: QueryEndedDelegate): void;
    /**
     * Queries the features at the provided coordinate for all the registered layers.
     * @param {Coordinate} longLatCoordinate - The longitude/latitude coordinate where to query the features
     * @returns {Promise<TypeFeatureInfoResultSet>} A promise which will hold the result of the query
     */
    queryLayers(longLatCoordinate: Coordinate): Promise<TypeFeatureInfoResultSet>;
    /**
     * Function used to enable listening of click events. When a layer path is not provided,
     * click events listening is enabled for all layers
     * @param {string} layerPath - Optional parameter used to enable only one layer
     */
    enableClickListener(layerPath?: string): void;
    /**
     * Function used to disable listening of click events. When a layer path is not provided,
     * click events listening is disable for all layers
     * @param {string} layerPath - Optional parameter used to disable only one layer
     */
    disableClickListener(layerPath?: string): void;
    /**
     * Function used to determine whether click events are disabled for a layer. When a layer path is not provided,
     * the value returned is undefined if the map flags are a mixture of true and false values.
     * @param {string} layerPath - Optional parameter used to get the flag value of a layer.
     * @returns {boolean | undefined} The flag value for the map or layer.
     */
    isClickListenerEnabled(layerPath?: string): boolean | undefined;
}
export type TypeFeatureInfoResultSetEntry = {
    layerName?: string;
    layerStatus: TypeLayerStatus;
    data: TypeLayerData;
};
export type TypeFeatureInfoResultSet = {
    [layerPath: string]: TypeFeatureInfoResultSetEntry;
};
/**
 * Define a delegate for the event handler function signature
 */
type QueryEndedDelegate = EventDelegateBase<FeatureInfoLayerSet, QueryEndedEvent>;
/**
 * Define an event for the delegate
 */
export type QueryEndedEvent = {
    coordinate: Coordinate;
    resultSet: TypeResultSet;
    eventType: EventType;
};
export {};
