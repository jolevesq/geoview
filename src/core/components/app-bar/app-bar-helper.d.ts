import { Dispatch, SetStateAction } from 'react';
import { TypeButtonPanel } from '@/ui/panel/panel-types';
export declare const helpFindGroupName: (buttonPanelGroups: Record<string, Record<string, TypeButtonPanel>>, buttonId: string) => string | undefined;
export declare const helpOpenClosePanelByIdState: (buttonPanelGroups: Record<string, Record<string, TypeButtonPanel>>, buttonId: string, groupName: string | undefined, setterCallback: Dispatch<SetStateAction<Record<string, Record<string, TypeButtonPanel>>>>, status: boolean) => void;
export declare const helpOpenPanelById: (buttonPanelGroups: Record<string, Record<string, TypeButtonPanel>>, buttonId: string, groupName: string | undefined, setterCallback: Dispatch<SetStateAction<Record<string, Record<string, TypeButtonPanel>>>>, closeAllCallback: () => void) => void;
export declare const helpClosePanelById: (mapId: string, buttonPanelGroups: Record<string, Record<string, TypeButtonPanel>>, buttonId: string, groupName: string | undefined, setterCallback: Dispatch<SetStateAction<Record<string, Record<string, TypeButtonPanel>>>>, focusWhenNoElementCallback?: () => void) => void;
export declare const helpCloseAll: (buttonPanelGroups: Record<string, Record<string, TypeButtonPanel>>, closeCallback: (buttonId: string, groupName: string | undefined) => void) => void;
