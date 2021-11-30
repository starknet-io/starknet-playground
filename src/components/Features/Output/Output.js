import React, {useContext, useEffect, useRef} from 'react';
import {ProgramContext} from '../../../context/program/program-context';
import {Box} from '../../Containers/Box/Box';
import styles from './Output.module.scss';

const OUTPUT_TITLE_TXT = 'output';

const Output = () => {
  const outputsEndRef = useRef();
  const {outputs} = useContext(ProgramContext);

  useEffect(() => {
    scrollToBottom();
  });

  const scrollToBottom = () => {
    if (outputsEndRef.current) {
      outputsEndRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };

  const renderOutputs = () => {
    return outputs.map(({output, isError}, index) => {
      const classes = [styles.text, isError && styles.isError].join(
        ' '
      );
      return (
        <div key={index} className={classes}>
          {output}
          {index < outputs.length - 1 && <hr />}
          <div ref={outputsEndRef} />
        </div>
      );
    });
  };

  return (
    <div className={styles.output}>
      <Box title={OUTPUT_TITLE_TXT}>{renderOutputs()}</Box>
    </div>
  );
};

export {Output};
