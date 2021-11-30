import React, {createRef, useContext, useRef} from 'react';
import {ProgramContext} from '../../../context/program/program-context';
import {Box} from '../../Containers/Box/Box';
import {Slider} from '../../UI/Slider/Slider';
import styles from './Memory.module.scss';
import {TraceBar} from './TraceBar/TraceBar';
import {TraceButtons} from './TraceButtons/TraceButtons';
import {TraceConsole} from './TraceConsole/TraceConsole';
import {TraceRow} from './TraceRow/TraceRow';
import {TraceVarType} from './TraceVar/TraceVar';
import {TraceVarsLookup} from './TraceVarsLookup/TraceVarsLookup';

const MEMORY_TITLE_TXT = 'memory';

const Memory = () => {
  const program = useContext(ProgramContext);
  const traceObj = program.trace[program.currentStep] || {};
  const rowsRefs = useRef({});

  const gotoStep = i => {
    program.setCurrentStep(i);
  };

  const step = () => {
    if (!program.isRunning) {
      return;
    }
    if (program.currentStep < program.trace.length - 1) {
      gotoStep(program.currentStep + 1);
    }
  };

  const previousStep = () => {
    if (!program.isRunning) {
      return;
    }
    if (program.currentStep > 0) {
      gotoStep(program.currentStep - 1);
    }
  };

  const stepOver = () => {
    if (!program.isRunning) {
      return;
    }
    const currentFP =
      program.trace[program.currentStep][TraceVarType.FP];
    for (
      let i = program.currentStep + 1;
      i < program.trace.length;
      i++
    ) {
      if (program.trace[i][TraceVarType.FP] === currentFP) {
        gotoStep(i);
        return;
      }
    }
  };

  const previousStepOver = () => {
    if (!program.isRunning) {
      return;
    }
    const currentFP =
      program.trace[program.currentStep][TraceVarType.FP];
    for (let i = program.currentStep - 1; i >= 0; i--) {
      if (program.trace[i][TraceVarType.FP] === currentFP) {
        gotoStep(i);
        return;
      }
    }
  };

  const stepOut = () => {
    if (!program.isRunning) {
      return;
    }
    const currentFP =
      program.trace[program.currentStep][TraceVarType.FP];
    const previousFP = program.memory[currentFP - 2];
    for (
      let i = program.currentStep + 1;
      i < program.trace.length;
      i++
    ) {
      if (program.trace[i][TraceVarType.FP] === previousFP) {
        gotoStep(i);
        return;
      }
    }
  };

  const scrollToRow = rowNumber => {
    const rowRef = rowsRefs.current[rowNumber];
    if (rowRef) {
      rowRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const renderTraceRows = () => {
    const vars = Object.keys(traceObj).reduce((obj, key) => {
      const row = traceObj[key];
      obj[row] = obj[row] ? [...obj[row], key] : [key];
      return obj;
    }, {});

    return Object.entries(program.memory).map(
      ([number, value], index) => {
        rowsRefs.current[number] = createRef();
        return (
          <TraceRow
            key={index}
            ref={rowsRefs.current[number]}
            isActive={traceObj[TraceVarType.PC] === Number(number)}
            number={number}
            value={value}
            vars={vars[number]}
          />
        );
      }
    );
  };

  return (
    <div className={styles.memory}>
      <Box title={MEMORY_TITLE_TXT}>
        <TraceBar>
          <Slider
            isDisabled={!program.isDebugging}
            max={program.trace.length - 1}
            min={0}
            val={program.currentStep}
            onChange={gotoStep}
          />
          <TraceButtons
            isDisabled={!program.isDebugging}
            onPreviousStep={previousStep}
            onPreviousStepOver={previousStepOver}
            onStep={step}
            onStepOut={stepOut}
            onStepOver={stepOver}
          />
        </TraceBar>
        <TraceConsole>{renderTraceRows()}</TraceConsole>
        <TraceVarsLookup
          apNum={traceObj[TraceVarType.AP]}
          fpNum={traceObj[TraceVarType.FP]}
          pcNum={traceObj[TraceVarType.PC]}
          onClick={scrollToRow}
        />
      </Box>
    </div>
  );
};

export {Memory};
