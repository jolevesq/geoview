import { GeoviewStoreType } from '@/core/stores';
import { IFeatureInfoState } from '@/core/stores/store-interface-and-intial-values/feature-info-state';
import { TypeFeatureInfoResultSet } from '@/geo/utils/feature-info-layer-set';
import { EventType } from '@/geo/utils/layer-set';
import { AbstractEventProcessor } from '@/api/event-processors/abstract-event-processor';
/**
 * Event processor focusing on interacting with the feature info state in the store (currently called detailsState).
 */
export declare class FeatureInfoEventProcessor extends AbstractEventProcessor {
    #private;
    /**
     * Overrides initialization of the Feature Info Event Processor
     * @param {GeoviewStoreType} store - The store associated with the Feature Info Event Processor
     * @returns An array of the subscriptions callbacks which were created
     */
    protected onInitialize(store: GeoviewStoreType): Array<() => void> | void;
    /**
     * Shortcut to get the Feature Info state for a given map id
     * @param {string} mapId - The mapId
     * @returns {IFeatureInfoState} The Feature Info state
     */
    protected static getFeatureInfoState(mapId: string): IFeatureInfoState;
    /**
     * Propagates feature info layer sets to the store
     *
     * @param {string} mapId - The map identifier of the modified result set.
     * @param {string} layerPath - The layer path that has changed.
     * @param {EventType} eventType - The event type that triggered the layer set update.
     * @param {TypeFeatureInfoResultSet} resultSet - The result set associated to the map.
     */
    static propagateFeatureInfoToStore(mapId: string, layerPath: string, eventType: EventType, resultSet: TypeFeatureInfoResultSet): void;
}
