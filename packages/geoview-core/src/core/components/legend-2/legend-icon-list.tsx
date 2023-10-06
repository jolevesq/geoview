/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import { useTheme, Theme } from '@mui/material/styles';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import { IconButton, CheckBoxOutIcon, CheckBoxIcon } from '@/ui';
import { api } from '@/app';
import {
  TypeVectorLayerEntryConfig,
  TypeStyleGeometry,
  TypeLayerEntryConfig,
  TypeStyleSettings,
  TypeUniqueValueStyleConfig,
  TypeClassBreakStyleConfig,
} from '../../types/cgpv-types';

const sxClasses = {
  tableIconLabel: {
    color: 'text.primary',
    fontSize: 14,
    noWrap: true,
    marginLeft: 20,
  },
  table: {
    border: '1px solid #C1C1C1',
    borderRadius: '4px',
    padding: '16px 17px 16px 23px',
  },
  tableHeader: {
    borderRight: '1px solid #C1C1C1',
    borderTop: '1px solid #C1C1C1',
    '& th': {
      borderBottom: '1px solid #C1C1C1',
      backgroundColor: '#FFFFFF',
      padding: '2px 4px 2px 4px',
    },
    '& th:first-child': {
      borderRight: '1px solid #C1C1C1',
    },
    borderleft: '1px solid #C1C1C1',
  },
  tableRow: {
    borderBottom: '1px solid #C1C1C1',
    '& td': {
      margin: 0,
      padding: '2px 4px 2px 4px',
      alignItems: 'center',
    },
    '& td:first-child': {
      borderRight: '1px solid #C1C1C1',
      flexGrow: 1,
    },
    '& td:last-child': {
      borderRight: '1px solid #C1C1C1',
    },
  },
};

export interface TypeLegendIconListProps {
  iconImages: string[];
  iconLabels: string[];
  layerConfig?: TypeVectorLayerEntryConfig;
  mapId?: string;
  geometryKey?: TypeStyleGeometry;
  isParentVisible?: boolean;
  toggleParentVisible?: () => void;
  toggleMapVisible?: (layerConfig: TypeLayerEntryConfig) => void;
}

export function LegendIconList(props: TypeLegendIconListProps): JSX.Element {
  const { iconImages, iconLabels, isParentVisible, toggleParentVisible, toggleMapVisible, geometryKey, layerConfig, mapId } = props;
  const theme: Theme & {
    iconImg: React.CSSProperties;
  } = useTheme();

  const allChecked = iconImages.map(() => true);
  const allUnChecked = iconImages.map(() => false);
  const initialChecked = isParentVisible ? allChecked : allUnChecked;

  const [isChecked, setChecked] = useState<boolean[]>(initialChecked);
  const [countChildren, setCountChildren] = useState<number>(isParentVisible ? iconImages.length : 0);
  const [initParentVisible, setInitParentVisible] = useState(isParentVisible);
  const [isAllChecked, setIsAllChecked] = useState(isParentVisible);

  const handleToggleAll = () => {
    setIsAllChecked(!isAllChecked);
    setChecked(iconImages.map(() => !isAllChecked));
  };

  const handleToggleLayer = (index: number) => {
    const checklist = isChecked.map((checked, i) => (i === index ? !checked : checked));
    const count = checklist.filter((f) => f === true).length;
    setChecked(checklist);
    setCountChildren(count);
    setIsAllChecked(checklist.every((value) => value === true));
    if (isParentVisible !== undefined && toggleParentVisible !== undefined) {
      if ((count === 0 && isParentVisible === true) || (count > 0 && isParentVisible === false)) {
        toggleParentVisible();
      }
    }
  };

  useEffect(() => {
    const getStyleArraySize = (geometryStyle: TypeStyleSettings): number => {
      if (geometryStyle.styleType === 'uniqueValue') return (geometryStyle as TypeUniqueValueStyleConfig).uniqueValueStyleInfo.length;
      if (geometryStyle.styleType === 'classBreaks') return (geometryStyle as TypeClassBreakStyleConfig).classBreakStyleInfo.length;
      return 1;
    };

    const handleVisibility = (visibilityLayerConfig: TypeVectorLayerEntryConfig) => {
      const geometryStyle = visibilityLayerConfig.style![geometryKey!];
      if (geometryStyle !== undefined) {
        const styleArraySize = getStyleArraySize(geometryStyle);
        isChecked.forEach((checked, i) => {
          if (geometryStyle.styleType === 'uniqueValue') {
            if (i < styleArraySize) {
              if ((geometryStyle as TypeUniqueValueStyleConfig).uniqueValueStyleInfo[i].visible !== 'always') {
                (geometryStyle as TypeUniqueValueStyleConfig).uniqueValueStyleInfo[i].visible = checked === true ? 'yes' : 'no';
              }
            } else if (i === styleArraySize && (geometryStyle as TypeUniqueValueStyleConfig).defaultSettings) {
              (geometryStyle as TypeUniqueValueStyleConfig).defaultVisible = checked === true ? 'yes' : 'no';
            }
          } else if (geometryStyle.styleType === 'classBreaks') {
            if (i < styleArraySize) {
              if ((geometryStyle as TypeClassBreakStyleConfig).classBreakStyleInfo[i].visible !== 'always') {
                (geometryStyle as TypeClassBreakStyleConfig).classBreakStyleInfo[i].visible = checked === true ? 'yes' : 'no';
              }
            } else if (i === styleArraySize && (geometryStyle as TypeClassBreakStyleConfig).defaultSettings) {
              (geometryStyle as TypeClassBreakStyleConfig).defaultVisible = checked === true ? 'yes' : 'no';
            }
          }
        });
        if (toggleMapVisible !== undefined) {
          toggleMapVisible(visibilityLayerConfig as TypeLayerEntryConfig);
        }
      }
    };

    if (isParentVisible !== initParentVisible) {
      setChecked(isParentVisible === true ? allChecked : allUnChecked);
      setCountChildren(isParentVisible === true ? allChecked.length : 0);
      setInitParentVisible(isParentVisible);
    }

    if (layerConfig && layerConfig.style !== undefined && geometryKey && mapId) {
      const layerPath = layerConfig.geoviewRootLayer
        ? `${layerConfig.geoviewRootLayer.geoviewLayerId}/${String(layerConfig.layerId).replace('-unclustered', '')}`
        : String(layerConfig.layerId).replace('-unclustered', '');
      const unclusteredLayerPath = `${layerPath}-unclustered`;
      const cluster = !!api.maps[mapId].layer.registeredLayers[unclusteredLayerPath];
      if (cluster) {
        handleVisibility(api.maps[mapId].layer.registeredLayers[layerPath] as TypeVectorLayerEntryConfig);
        handleVisibility(api.maps[mapId].layer.registeredLayers[unclusteredLayerPath] as TypeVectorLayerEntryConfig);
      } else handleVisibility(layerConfig);
    }
  }, [
    isParentVisible,
    allChecked,
    allUnChecked,
    countChildren,
    initParentVisible,
    isChecked,
    layerConfig,
    geometryKey,
    toggleMapVisible,
    mapId,
  ]);

  console.log('Check Count', countChildren);

  return (
    <TableContainer>
      <Table sx={sxClasses.table}>
        <TableHead>
          <TableRow sx={sxClasses.tableHeader}>
            <TableCell>Name</TableCell>
            <TableCell>
              <Checkbox color="primary" checked={isAllChecked} onChange={handleToggleAll} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {iconImages.map((icon, index) => (
            <TableRow key={iconLabels[index]} sx={sxClasses.tableRow}>
              <TableCell>
                <img alt={iconLabels[index]} src={icon} style={theme.iconImg} />
                <span style={sxClasses.tableIconLabel}>{iconLabels[index]}</span>
              </TableCell>
              <TableCell>
                <Checkbox color="primary" checked={isChecked[index]} onChange={() => handleToggleLayer(index)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}