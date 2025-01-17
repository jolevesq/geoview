import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import { TypeLayerInitialSettings, TypeListOfLayerEntryConfig, TypeLocalizedString } from '@/geo/map/map-schema-types';
import { ConfigBaseClass } from '@/core/utils/config/validation-classes/config-base-class';
/** ******************************************************************************************************************************
 * Type used to define a layer group.
 */
export declare class GroupLayerEntryConfig extends ConfigBaseClass {
    /** Tag used to link the entry to a specific schema is not used by groups. */
    schemaTag: never;
    /** Layer entry data type. */
    entryType: import("@/geo/map/map-schema-types").TypeLayerEntryType;
    /** The ending element of the layer configuration path is not used on groups. */
    layerIdExtension: never;
    /** The display name of the layer (English/French). */
    layerName?: TypeLocalizedString;
    /**
     * Initial settings to apply to the GeoView layer entry at creation time. Initial settings are inherited from the parent in the
     * configuration tree.
     */
    initialSettings?: TypeLayerInitialSettings;
    /** Source settings to apply to the GeoView vector layer source at creation time is not used by groups. */
    source: never;
    /** The list of layer entry configurations to use from the GeoView layer group. */
    listOfLayerEntryConfig: TypeListOfLayerEntryConfig;
    /**
     * The class constructor.
     * @param {GroupLayerEntryConfig} layerConfig The layer configuration we want to instanciate.
     */
    constructor(layerConfig: GroupLayerEntryConfig);
    /**
     * The olLayer getter method for the ConfigBaseClass class and its descendant classes.
     * All layerConfig has an olLayer property, but the olLayer setter can only be use on group layers.
     */
    get olLayer(): BaseLayer | LayerGroup | null;
    /**
     * The olLayer setter method for the ConfigBaseClass class and its descendant classes.
     * All layerConfig has an olLayer property, but the olLayer setter can only be use on group layers.
     * If you want to set the olLayer property for a descendant of AbstractBaseLayerEntryConfig, you must
     * use its olLayerAndLoadEndListeners because it enforce the creation of the load end listeners.
     * @param {LayerGroup} olLayerValue The new olLayerd value.
     */
    set olLayer(olLayerValue: BaseLayer | LayerGroup | null);
}
