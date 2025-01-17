import { TypeLegendResultSetEntry } from '@/geo/utils/legends-layer-set';
import { ILayerState } from '@/core/stores/store-interface-and-intial-values/layer-state';
import { AbstractEventProcessor } from '@/api/event-processors/abstract-event-processor';
export declare class LegendEventProcessor extends AbstractEventProcessor {
    /**
     * Shortcut to get the Layer state for a given map id
     * @param {string} mapId The mapId
     * @returns {ILayerState} The Layer state
     */
    protected static getLayerState(mapId: string): ILayerState;
    private static getLayerIconImage;
    /** ***************************************************************************************************************************
     * This method propagates the information stored in the legend layer set to the store.
     *
     * @param {string} mapId The map identifier.
     * @param {string} layerPath The layer path that changed.
     * @param {TypeLegendResultSetEntry} legendResultSetEntry The legend result set that triggered the propagation.
     */
    static propagateLegendToStore(mapId: string, layerPath: string, legendResultSetEntry: TypeLegendResultSetEntry): void;
}
