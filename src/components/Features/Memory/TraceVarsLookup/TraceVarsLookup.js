import PropTypes from 'prop-types';
import React from 'react';
import {TraceVar, TraceVarType} from '../TraceVar/TraceVar';
import varStyles from '../TraceVar/TraceVar.module.scss';
import styles from './TraceVarsLookup.module.scss';

const TraceVarsLookup = ({apNum, fpNum, pcNum, onClick}) => {
  return (
    <div className={styles.traceVarsLookup}>
      <TraceVar
        isClickable={!!apNum}
        type={TraceVarType.AP}
        onClick={() => onClick(apNum)}
      />
      {apNum && (
        <span className={varStyles[TraceVarType.AP]}>{apNum}</span>
      )}
      <TraceVar
        isClickable={!!fpNum}
        type={TraceVarType.FP}
        onClick={() => onClick(fpNum)}
      />
      {fpNum && (
        <span className={varStyles[TraceVarType.FP]}>{fpNum}</span>
      )}
      <TraceVar
        isClickable={!!pcNum}
        type={TraceVarType.PC}
        onClick={() => onClick(pcNum)}
      />
      {pcNum && (
        <span className={varStyles[TraceVarType.PC]}>{pcNum}</span>
      )}
    </div>
  );
};

TraceVarsLookup.propTypes = {
  apNum: PropTypes.number,
  fpNum: PropTypes.number,
  pcNum: PropTypes.number,
  onClick: PropTypes.func
};

export {TraceVarsLookup};
