import { Dispatch, SetStateAction } from 'react';
import { TypeButtonPanel } from '@/ui/panel/panel-types';

export const helpFindGroupName = (
  buttonPanelGroups: Record<string, Record<string, TypeButtonPanel>>,
  buttonId: string
): string | undefined => {
  let groupName: string | undefined;
  Object.entries(buttonPanelGroups).forEach(([buttonPanelGroupName, buttonPanelGroup]) => {
    if (!groupName) {
      if (Object.keys(buttonPanelGroup).includes(buttonId)) {
        // Found it
        groupName = buttonPanelGroupName;
      }
    }
  });
  return groupName;
};

export const helpOpenClosePanelByIdState = (
  buttonPanelGroups: Record<string, Record<string, TypeButtonPanel>>,
  buttonId: string,
  groupName: string | undefined,
  setterCallback: Dispatch<SetStateAction<Record<string, Record<string, TypeButtonPanel>>>>,
  status: boolean
) => {
  // Read the group name
  const theGroupName = groupName || helpFindGroupName(buttonPanelGroups, buttonId);
  if (!theGroupName) return;

  // Open or Close it
  setterCallback((prevState) => {
    // Check if doing it
    const doIt = !!(
      prevState[theGroupName] &&
      prevState[theGroupName][buttonId] &&
      prevState[theGroupName][buttonId].panel &&
      prevState[theGroupName][buttonId].panel?.status !== status
    );

    // If is open/closed right now
    if (doIt) {
      return {
        ...prevState,
        [theGroupName]: {
          ...prevState[theGroupName],
          [buttonId]: {
            ...prevState[theGroupName][buttonId],
            panel: {
              ...prevState[theGroupName][buttonId].panel!,
              status,
            },
          },
        },
      };
    }

    // Leave as-is
    return prevState;
  });
};

export const helpOpenPanelById = (
  buttonPanelGroups: Record<string, Record<string, TypeButtonPanel>>,
  buttonId: string,
  groupName: string | undefined,
  setterCallback: Dispatch<SetStateAction<Record<string, Record<string, TypeButtonPanel>>>>,
  closeAllCallback: () => void
) => {
  // Read the group name
  const theGroupName = groupName || helpFindGroupName(buttonPanelGroups, buttonId);

  // Close any already opened panels
  closeAllCallback();

  // Open the panel
  helpOpenClosePanelByIdState(buttonPanelGroups, buttonId, theGroupName, setterCallback, true);
};

export const helpClosePanelById = (
  mapId: string,
  buttonPanelGroups: Record<string, Record<string, TypeButtonPanel>>,
  buttonId: string,
  groupName: string | undefined,
  setterCallback: Dispatch<SetStateAction<Record<string, Record<string, TypeButtonPanel>>>>,
  focusWhenNoElementCallback?: () => void
) => {
  // Read the group name
  const theGroupName = groupName || helpFindGroupName(buttonPanelGroups, buttonId);

  // Close the panel
  helpOpenClosePanelByIdState(buttonPanelGroups, buttonId, theGroupName, setterCallback, false);

  const buttonElement = buttonId && document.getElementById(mapId)?.querySelector(`#${buttonId}`);
  if (buttonElement) {
    // put back focus on calling button
    document.getElementById(buttonId)?.focus();
  } else {
    // Nothing to put focus on, callback
    focusWhenNoElementCallback?.();
  }
};

export const helpCloseAll = (
  buttonPanelGroups: Record<string, Record<string, TypeButtonPanel>>,
  closeCallback: (buttonId: string, groupName: string | undefined) => void
) => {
  // For each group
  Object.entries(buttonPanelGroups).forEach(([buttonPanelGroupName, buttonPanelGroup]) => {
    // For each button
    Object.keys(buttonPanelGroup).forEach((buttonId) => {
      // Callback to close it
      closeCallback(buttonId, buttonPanelGroupName);
    });
  });
};
