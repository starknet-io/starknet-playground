import React, {useContext} from 'react';
import {ProgramContext} from '../../../context/program/program-context';
import styles from './Watch.module.scss';
import {WatchConsole} from './WatchConsole/WatchConsole';
import {WatchTable} from './WatchTable/WatchTable';
import {WatchTableRow} from './WatchTableRow/WatchTableRow';

const Watch = () => {
  const ctx = useContext(ProgramContext);
  const identifiers = ctx.currentIdentifiers[ctx.currentStep] || {};

  const renderTableRows = () => {
    return Object.entries(identifiers).map(([name, value], index) => (
      <WatchTableRow key={index} name={name} value={value} />
    ));
  };

  return (
    <div className={styles.watch}>
      <WatchConsole>
        <WatchTable>{renderTableRows()}</WatchTable>
      </WatchConsole>
    </div>
  );
};

export {Watch};
