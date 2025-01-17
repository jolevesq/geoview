import { GeoviewStoreType } from '@/core/stores';
import { AbstractEventProcessor } from '@/api/event-processors/abstract-event-processor';
import { TypeFeatureInfoResultSet } from '@/geo/utils/feature-info-layer-set';
import { IDataTableState } from '@/core/stores/store-interface-and-intial-values/data-table-state';
export declare class DataTableEventProcessor extends AbstractEventProcessor {
    #private;
    /**
     * Overrides initialization of the Feature Info Event Processor
     * @param {GeoviewStoreType} store - The store associated with the Feature Info Event Processor
     * @returns An array of the subscriptions callbacks which were created
     */
    protected onInitialize(store: GeoviewStoreType): Array<() => void> | void;
    /**
     * Shortcut to get the DataTable state for a given map id
     * @param {string} mapId - The mapId
     * @returns {IDataTableState} The DataTable state
     */
    protected static getDataTableState(mapId: string): IDataTableState;
    /**
     * Filter the map based on filters set on date table.
     * @param {string} mapId - Id of the map.
     * @param {string} layerPath - Path of the layer
     * @param {string} filterStrings - Filters set on the data table
     * @param {boolean} isMapRecordExist - Filtered Map switch is on off.
     */
    static applyFilters(mapId: string, layerPath: string, filterStrings: string, isMapRecordExist: boolean): void;
    /**
     * Initialize columns filter information for a layer.
     * @param {string} mapId - Id of the map.
     * @param {string} layerPath - Path of the layer
     */
    static setInitialSettings(mapId: string, layerPath: string): void;
    /**
     * Shortcut to get the DataTable state for a given map id
     * @param {string} mapId - Id of the map.
     * @param {string} layerPath - Layer path to apply filter.
     */
    static triggerGetAllFeatureInfo(mapId: string, layerPath: string): void;
    /**
     * Propagates feature info layer sets to the store
     *
     * @param {string} mapId - The map identifier of the modified result set.
     * @param {string} layerPath - The layer path that has changed.
     * @param {TypeFeatureInfoResultSet} resultSet - The result set associated to the map.
     */
    static propagateFeatureInfoToStore(mapId: string, layerPath: string, resultSet: TypeFeatureInfoResultSet): void;
}
