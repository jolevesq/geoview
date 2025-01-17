import { TypeMapFeaturesConfig } from '@/core/types/global-types';
export type TypeEventHandlerFunction<T> = (payload: T) => void;
/**
 * Class used to handle event emitting and subscribing for the API
 *
 * @exports
 * @class Event
 */
export declare class Event {
    #private;
    /**
     * Initiate the event emitter
     */
    constructor();
    /**
     * Unregisters all events for the given handler name.
     *
     * @param {string} handlerName - The name of the handler an event needs to be removed from
     */
    offAll(handlerName: string): void;
    /**
     * Emits a map reload event to all handlers. The map reload is an event thrown by the MapViewer which tells the Shell that it wants to reload itself.
     * @param {string} handlerName - The handler name for this map construct event
     * @param {TypeMapFeaturesConfig} mapFeaturesConfig - The map features config to emit
     * @private
     */
    emitMapReload(handlerName: string, mapFeaturesConfig: TypeMapFeaturesConfig): void;
    /**
     * Registers a map reload event callback.
     * @param {string} handlerName - The handler name for this map reload event
     * @param {TypeEventHandlerFunction<TypeMapFeaturesConfig>} callback - The callback to be executed whenever the event is emitted
     */
    onMapReload(handlerName: string, callback: TypeEventHandlerFunction<TypeMapFeaturesConfig>): void;
    /**
     * Unregisters a map reload event callback.
     * @param {string} handlerName - The handler name for this map reload event
     * @param {TypeEventHandlerFunction<TypeMapFeaturesConfig>} callback - The callback to be removed whenever the event is emitted
     */
    offMapReload(handlerName: string, callback: TypeEventHandlerFunction<TypeMapFeaturesConfig>): void;
    /**
     * Emits a map reconstruct event to all handlers. The map reconstruct is an event thrown as part of a map reload process.
     * It focuses on reconstructing a map: its store, its react root, its AppStart.
     * @param {string} handlerName - The handler name for this map construct event
     * @param {TypeMapFeaturesConfig} mapFeaturesConfig - The map features config to emit
     * @private
     */
    emitMapReconstruct(handlerName: string, mapFeaturesConfig: TypeMapFeaturesConfig): void;
    /**
     * Registers a map reconstruct event callback.
     * @param {string} handlerName - The handler name for this map construct event
     * @param {TypeEventHandlerFunction<TypeMapFeaturesConfig>} callback - The callback to be executed whenever the event is emitted
     */
    onMapReconstruct(handlerName: string, callback: TypeEventHandlerFunction<TypeMapFeaturesConfig>): void;
    /**
     * Unregisters a map reconstruct event callback.
     * @param {string} handlerName - The handler name for this map construct event
     * @param {TypeEventHandlerFunction<TypeMapFeaturesConfig>} callback - The callback to be removed whenever the event is emitted
     */
    offMapReconstruct(handlerName: string, callback: TypeEventHandlerFunction<TypeMapFeaturesConfig>): void;
}
