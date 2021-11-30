import PropTypes from 'prop-types';
import React, {forwardRef, memo, useContext} from 'react';
import SplitPane from 'react-split-pane';
import {AppContext} from '../../../context/app/app-context';
import {Editor} from '../Editor/Editor';
import {Memory} from '../Memory/Memory';
import {Output} from '../Output/Output';
import {Watch} from '../Watch/Watch';
import styles from './Program.module.scss';

const ProgramRef = forwardRef(({file, type}, ref) => {
  const {isCairoMode} = useContext(AppContext);
  const editorSize = isCairoMode ? '70%' : '80%';
  const editorPaneSize = isCairoMode ? '60%' : '100%';
  const filePath = file
    ? `${process.env.PUBLIC_URL}/${type}s/${file}.cairo`
    : '';

  return (
    <>
      <div ref={ref} className={styles.program}>
        <SplitPane split="vertical">
          <SplitPane
            maxSize={'65%'}
            size={editorPaneSize}
            split="horizontal"
          >
            <Editor
              filePath={filePath}
              maxSize={'90%'}
              size={editorSize}
            />
            <Output maxSize={'65%'} />
          </SplitPane>
          {isCairoMode && (
            <SplitPane maxSize={'50%'} split="horizontal">
              <Memory maxSize={'90%'} />
              <Watch maxSize={'90%'} />
            </SplitPane>
          )}
        </SplitPane>
      </div>
    </>
  );
});

ProgramRef.displayName = 'Program';

ProgramRef.propTypes = {
  file: PropTypes.string,
  type: PropTypes.string
};

const Program = memo(ProgramRef);

export {Program};
