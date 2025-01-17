import { Pixel } from 'ol/pixel';
import { Coordinate } from 'ol/coordinate';
import { Extent } from 'ol/extent';
import Feature from 'ol/Feature';
import RenderFeature from 'ol/render/Feature';
import { EventDelegateBase } from '@/api/events/event-helper';
import { TypeLayerStatus, TypeLayerEntryConfig } from '@/geo/map/map-schema-types';
import { AbstractGeoViewLayer, TypeGeoviewLayerType } from '@/geo/layer/geoview-layers/abstract-geoview-layers';
import { ConfigBaseClass } from '@/core/utils/config/validation-classes/config-base-class';
import { TypeHoverLayerData } from './hover-feature-info-layer-set';
import { LayerApi } from '@/geo/layer/layer';
/**
 * A class to hold a set of layers associated with a value of any type.
 * Layers are added/removed to the layer-set via the registerOrUnregisterLayer function.
 * @class LayerSet
 * @exports
 */
export declare class LayerSet {
    #private;
    /** The LayerApi to work with */
    protected layerApi: LayerApi;
    /** An object containing the result sets indexed using the layer path */
    resultSet: TypeResultSet;
    /** Sequence number to append to the layer name when we declare a layer as anonymous. */
    protected anonymousSequenceNumber: number;
    /**
     * Constructs a new LayerSet instance.
     * @param {LayerApi} layerApi - The LayerApi instance to work with.
     */
    constructor(layerApi: LayerApi);
    protected get mapId(): string;
    /**
     * Processes the layer status change in the layer-set.
     * @param {ConfigBaseClass} config - The layer config class
     * @param {string} layerPath - The layer path being affected
     * @param {TypeLayerStatus} layerStatus - The new layer status
     */
    processLayerStatusChanged(config: ConfigBaseClass, layerPath: string, layerStatus: TypeLayerStatus): void;
    /**
     * An overridable function for a layer-set to process a layer status changed event.
     * @param {ConfigBaseClass} config - The layer config class
     * @param {string} layerPath - The layer path being affected
     * @param {TypeLayerStatus} layerStatus - The new layer status
     */
    protected onProcessLayerStatusChanged(config: ConfigBaseClass, layerPath: string, layerStatus: TypeLayerStatus): void;
    /**
     * Registers or Unregisters the layer in the layer-set, making sure the layer-set is aware of the layer.
     * @param {AbstractGeoViewLayer} geoviewLayer - The layer to register/unregister
     * @param {string} layerPath - The path of the layer
     * @param {'add' | 'remove'} action - The action to perform: 'add' to register or 'remove' to unregister
     */
    registerOrUnregisterLayer(geoviewLayer: AbstractGeoViewLayer, layerPath: string, action: 'add' | 'remove'): void;
    /**
     * An overridable registration condition function for a layer-set to check if the registration
     * should happen for a specific geoview layer and layer path.
     * @param {AbstractGeoViewLayer} geoviewLayer - The geoview layer being registered
     * @param {string} layerPath - The layer path
     * @returns {boolean} True if the layer should be registered, false otherwise
     */
    protected onRegisterLayerCheck(geoviewLayer: AbstractGeoViewLayer, layerPath: string): boolean;
    /**
     * An overridable registration function for a layer-set that the registration process will use to
     * create a new entry in the layer set for a specific geoview layer and layer path.
     * @param {AbstractGeoViewLayer} geoviewLayer - The geoview layer being registered
     * @param {string} layerPath - The layer path
     */
    protected onRegisterLayer(geoviewLayer: AbstractGeoViewLayer, layerPath: string): void;
    /**
     * An overridable layer set updated function for a layer-set to indicate the layer set has been updated.
     * @param {string} layerPath - The layer path
     */
    protected onLayerSetUpdatedProcess(layerPath: string): void;
    /**
     * Processes layer data to query features on it, if the layer path can be queried.
     * @param {TypeLayerData | TypeHoverLayerData} data - The layer data
     * @param {TypeLayerEntryConfig} layerConfig - The layer configuration
     * @param {string} layerPath - The layer path
     * @param {QueryType} queryType - The query type
     * @param {TypeLocation} location - The location for the query
     * @returns {Promise<TypeFeatureInfoEntry[] | undefined | null>} A promise resolving to the query results
     */
    protected queryLayerFeatures(data: TypeLayerData | TypeHoverLayerData, layerConfig: TypeLayerEntryConfig, layerPath: string, queryType: QueryType, location: TypeLocation): Promise<TypeFeatureInfoEntry[] | undefined | null>;
    /**
     * Registers a callback to be executed whenever the layer set is updated.
     * @param {LayerSetUpdatedDelegate} callback - The callback function
     */
    onLayerSetUpdated(callback: LayerSetUpdatedDelegate): void;
    /**
     * Unregisters a callback from being called whenever the layer set is updated.
     * @param {LayerSetUpdatedDelegate} callback - The callback function to unregister
     */
    offLayerSetUpdated(callback: LayerSetUpdatedDelegate): void;
}
export type EventType = 'click' | 'hover' | 'all-features';
export declare const ArrayOfEventTypes: EventType[];
export type QueryType = 'at_pixel' | 'at_coordinate' | 'at_long_lat' | 'using_a_bounding_box' | 'using_a_polygon' | 'all';
export type TypeQueryStatus = 'init' | 'processing' | 'processed' | 'error';
export type TypeLocation = null | Pixel | Coordinate | Coordinate[] | string;
export type TypeLayerData = {
    layerPath: string;
    layerName: string;
    layerStatus: TypeLayerStatus;
    eventListenerEnabled: boolean;
    queryStatus: TypeQueryStatus;
    features: TypeFeatureInfoEntry[] | undefined | null;
};
export type TypeFeatureInfoByEventTypes = {
    [eventName in EventType]?: TypeLayerData;
};
export type codeValueEntryType = {
    name: string;
    code: unknown;
};
export type codedValueType = {
    type: 'codedValue';
    name: string;
    description: string;
    codedValues: codeValueEntryType[];
};
export type rangeDomainType = {
    type: 'range';
    name: string;
    range: [minValue: unknown, maxValue: unknown];
};
export type TypeFieldEntry = {
    fieldKey: number;
    value: unknown;
    dataType: 'string' | 'date' | 'number';
    alias: string;
    domain: null | codedValueType | rangeDomainType;
};
export interface TypeGeometry extends RenderFeature {
    ol_uid: string;
}
export type TypeFeatureInfoEntry = {
    featureKey: number;
    geoviewLayerType: TypeGeoviewLayerType;
    extent: Extent;
    geometry: TypeGeometry | Feature | null;
    featureIcon: HTMLCanvasElement;
    fieldInfo: Partial<Record<string, TypeFieldEntry>>;
    nameField: string | null;
};
/**
 * Partial definition of a TypeFeatureInfoEntry for simpler use case queries.
 * Purposely linking this simpler type to the main TypeFeatureInfoEntry type here, in case, for future we want
 * to add more information on one or the other and keep things loosely linked together.
 */
export type TypeFeatureInfoEntryPartial = Pick<TypeFeatureInfoEntry, 'fieldInfo'>;
/**
 * Define a delegate for the event handler function signature
 */
type LayerSetUpdatedDelegate = EventDelegateBase<LayerSet, LayerSetUpdatedEvent>;
/**
 * Define an event for the delegate
 */
export type LayerSetUpdatedEvent = {
    layerPath: string;
    resultSet: TypeResultSet;
};
export type TypeResultSetEntry = {
    layerName?: string;
    layerStatus: TypeLayerStatus;
    data: unknown;
};
export type TypeResultSet = {
    [layerPath: string]: TypeResultSetEntry;
};
export {};
