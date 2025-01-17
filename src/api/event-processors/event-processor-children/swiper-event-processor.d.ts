import { GeoviewStoreType } from '@/core/stores';
import { ISwiperState } from '@/core/stores/store-interface-and-intial-values/swiper-state';
import { AbstractEventProcessor } from '@/api/event-processors/abstract-event-processor';
/**
 * Event processor focusing on interacting with the swiper state in the store.
 */
export declare class SwiperEventProcessor extends AbstractEventProcessor {
    /**
     * Overrides initialization of the Swiper Event Processor
     * @param {GeoviewStoreType} store The store associated with the Swiper Event Processor
     * @returns An array of the subscriptions callbacks which were created
     */
    protected onInitialize(store: GeoviewStoreType): Array<() => void> | void;
    /**
     * Shortcut to get the Swiper state for a given map id
     * @param {string} mapId The mapId
     * @returns {ISwiperState | undefined} The Swiper state. Forcing the return to also be 'undefined', because
     *                                       there will be no swiperState if the Swiper plugin isn't active.
     *                                       This helps the developers making sure the existence is checked.
     */
    protected static getSwiperState(mapId: string): ISwiperState | undefined;
    /**
     * Sets the layer paths on which the swiper should be activated.
     *
     * @param {string} mapId the map id
     * @param {string[]} layerPaths The array of layer paths
     */
    static setLayerPaths(mapId: string, layerPaths: string[]): void;
    /**
     * Adds a swiper functionality to the specified map id and layer path
     * @param {string} mapId The map ID
     * @param {string} layerPath The layer path
     */
    static addLayerPath(mapId: string, layerPath: string): void;
    /**
     * Removes a swiper functionality for the specified map id and layer path
     * @param {string} mapId The map ID
     * @param {string} layerPath The layer path
     */
    static removeLayerPath(mapId: string, layerPath: string): void;
    /**
     * Removes the swiper functionality for all layer paths
     * @param {string} mapId The map ID
     */
    static removeAll(mapId: string): void;
}
