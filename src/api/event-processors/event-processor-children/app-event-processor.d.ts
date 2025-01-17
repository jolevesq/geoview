import { IAppState } from '@/core/stores/store-interface-and-intial-values/app-state';
import { AbstractEventProcessor } from '@/api/event-processors/abstract-event-processor';
import { NotificationDetailsType } from '@/core/components';
import { TypeDisplayLanguage, TypeDisplayTheme } from '@/geo/map/map-schema-types';
import { TypeHTMLElement } from '@/core/types/global-types';
export declare class AppEventProcessor extends AbstractEventProcessor {
    /**
     * Shortcut to get the App state for a given map id
     * @param {string} mapId The mapId
     * @returns {IAppState} The App state.
     */
    protected static getAppState(mapId: string): IAppState;
    /**
     * Shortcut to get the App state for a given map id
     * @param {string} mapId The mapId
     * @returns {IAppState} The App state.
     */
    protected static getAppStateAsync(mapId: string): Promise<IAppState>;
    static addAppNotification(mapId: string, notification: NotificationDetailsType): Promise<void>;
    static getDisplayLanguage(mapId: string): TypeDisplayLanguage;
    static getDisplayTheme(mapId: string): TypeDisplayTheme;
    static getSupportedLanguages(mapId: string): TypeDisplayLanguage[];
    static setAppIsCrosshairActive(mapId: string, isActive: boolean): void;
    static setDisplayLanguage(mapId: string, lang: TypeDisplayLanguage): void;
    static setDisplayTheme(mapId: string, theme: TypeDisplayTheme): void;
    static setFullscreen(mapId: string, active: boolean, element: TypeHTMLElement): void;
    static setCircularProgress(mapId: string, active: boolean): void;
}
