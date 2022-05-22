import PropTypes from 'prop-types';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  AnalyticsEventType,
  SendAnalyticsEvent
} from '../../../api/analytics';
import {
  compile,
  debug,
  format,
  prove,
  run
} from '../../../api/playground';
import {addJob} from '../../../api/sharp';
import {deploy} from '../../../api/starknet';
import {ProgramContext} from '../../../context/program/program-context';
import {TabsContext} from '../../../context/tabs/tabs-context';
import {promiseHandler} from '../../../utils/promise-handler';
import {readFile} from '../../../utils/read-file';
import {Box} from '../../Containers/Box/Box';
import {DeployModal} from '../../UI/Modal/DeployModal';
import {ProveModal} from '../../UI/Modal/ProveModal';
import {DeployOutput} from '../Output/DeployOutput';
import {ProveOutput} from '../Output/ProveOutput';
import {CodeEditor} from './CodeEditor/CodeEditor';
import styles from './Editor.module.scss';
import {EditorButtons} from './EditorButtons/EditorButtons';

const SCROLL_MARGIN_TOP = 32;
const SCROLL_MARGIN_BOTTOM = 50;
const PADDING_MARGIN_BOTTOM = 62;
const EDITOR_TITLE_TXT = 'editor';
const COMPILING_MSG = 'Compiling...';
const COMPILE_MSG = 'The contract was compiled successfully.';
const SHARP_MSG = 'Sending job to SHARP...';
const DEPLOYING_MSG = 'Deploying the contract...';
const DEPLOY_FAILED_MSG = ['Got an error while deploying:'];
const DEPLOY_ERROR_MSG = [
  'The "%lang starknet" directive is missing.',
  'Only StarkNet contracts can be deployed.',
  'See the "StarkNet contract" lesson in the "All lessons" menu.'
];

const Editor = ({filePath}) => {
  const program = useContext(ProgramContext);
  const tabs = useContext(TabsContext);
  const codeEditorRef = useRef(null);
  const [marks, setMarks] = useState([]);
  const [showProveModal, setShowProveModal] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);

  useEffect(() => {
    async function loadFile() {
      if (filePath) {
        const content = await readFile(filePath);
        program.setEditorContent(content);
      } else {
        program.setEditorContent('');
      }
    }

    loadFile();
  }, []);

  useEffect(() => {
    if (program.currentStep !== -1) {
      clearMarks();
      const entry = program.trace[program.currentStep];
      const loc = program.instLocations[entry.pc];
      addMark(loc);
      scroll();
    }
  }, [program.currentStep]);

  useEffect(() => {
    if (!program.isDebugging) {
      clearMarks();
    }
  }, [program.isDebugging]);

  useEffect(() => {
    updateLinks();
  }, [program.content]);

  useEffect(() => {
    const {editor} = codeEditorRef.current;
    if (program.isRunning) {
      editor.setOption('readOnly', 'nocursor');
    } else {
      editor.setOption('readOnly', false);
    }
  }, [program.isRunning]);

  const scroll = () => {
    const target = document.getElementsByClassName(
      'currentInstruction'
    )[0];
    if (target) {
      const targetRect = target.getBoundingClientRect();
      const scrollParent = codeEditorRef.current.ref.parentNode;
      const scrollParentRect = scrollParent.getBoundingClientRect();
      if (
        targetRect.bottom >
        scrollParentRect.bottom - SCROLL_MARGIN_BOTTOM
      ) {
        const targetBottom =
          scrollParent.scrollTop +
          targetRect.bottom -
          scrollParentRect.bottom;
        scrollParent.scrollTo({
          top:
            targetBottom +
            SCROLL_MARGIN_BOTTOM +
            PADDING_MARGIN_BOTTOM,
          behavior: 'smooth'
        });
      } else if (targetRect.top < scrollParentRect.top) {
        const targetTop =
          scrollParent.scrollTop +
          targetRect.top -
          scrollParentRect.top;
        scrollParent.scrollTo({
          top: targetTop - SCROLL_MARGIN_TOP,
          behavior: 'smooth'
        });
      }
    }
  };

  const clearMarks = () => {
    marks.forEach(mark => mark.clear());
    setMarks([]);
  };

  const addMark = loc => {
    const {editor} = codeEditorRef.current;
    setMarks([
      ...marks,
      editor.markText(
        {line: loc[0] - 1, ch: loc[1] - 1},
        {line: loc[2] - 1, ch: loc[3] - 1},
        {className: 'currentInstruction'}
      )
    ]);
  };

  const updateLinks = () => {
    const {editor} = codeEditorRef.current;
    const regex = /\[(.*)\]\((.*?)\)/g;
    const matches = [...program.content.matchAll(regex)].reverse();
    for (const linkMatch of matches) {
      const text = linkMatch[1];
      const url = linkMatch[2];
      const a = document.createElement('a');
      a.target = '_blank';
      a.href = url;
      a.text = text;
      editor.markText(
        editor.posFromIndex(linkMatch.index),
        editor.posFromIndex(linkMatch.index + linkMatch[0].length),
        {
          replacedWith: a
        }
      );
    }
  };

  const runHandler = async () => {
    const {name} = tabs.getActiveTab();
    SendAnalyticsEvent(AnalyticsEventType.RUN, name);
    program.setIsRunning(true);
    const [response, error] = await promiseHandler(
      run(program.content)
    );
    if (error) {
      SendAnalyticsEvent(AnalyticsEventType.RUN_ERROR, name);
      program.addOutput(error.message, true);
    } else {
      SendAnalyticsEvent(AnalyticsEventType.SEND_SUCCESS, name);
      program.addOutput(response.output);
    }
    SendAnalyticsEvent(AnalyticsEventType.ABORT, name);
    program.setIsRunning(false);
  };

  const compileHandler = async () => {
    const {name} = tabs.getActiveTab();
    program.setIsRunning(true);
    program.addOutput(COMPILING_MSG);
    // eslint-disable-next-line no-unused-vars
    const [response, error] = await promiseHandler(
      compile(program.content)
    );
    if (error) {
      program.addOutput(error.message, true);
    } else {
      program.addOutput(COMPILE_MSG);
    }
    SendAnalyticsEvent(AnalyticsEventType.ABORT, name);
    program.setIsRunning(false);
  };

  const debugHandler = async () => {
    program.setIsRunning(true);
    const [response, error] = await promiseHandler(
      debug(program.content)
    );
    if (error) {
      program.addOutput(error.message, true);
      program.setIsRunning(false);
    } else {
      program.setDebugResult(response);
      program.setIsDebugging(true);
    }
  };

  const stopHandler = async () => {
    const {name} = tabs.getActiveTab();
    SendAnalyticsEvent(AnalyticsEventType.ABORT, name);
    program.stop();
  };

  const formatHandler = async () => {
    const {name} = tabs.getActiveTab();
    SendAnalyticsEvent(AnalyticsEventType.FORMAT, name);
    program.setIsRunning(true);
    const [response, error] = await promiseHandler(
      format(program.content)
    );
    error
      ? program.addOutput(error.message, true)
      : program.setEditorContent(response.formattedCode);
    program.setIsRunning(false);
  };

  const proveHandler = async () => {
    setShowProveModal(false);
    const {name, puzzleHash} = tabs.getActiveTab();
    SendAnalyticsEvent(AnalyticsEventType.PROVE_WITH_SHARP, name);
    program.setIsRunning(true);
    const [response, error] = await promiseHandler(
      prove(program.content)
    );
    if (error) {
      program.addOutput(error.message, true);
      program.setIsRunning(false);
    } else {
      return addJobHandler(response, puzzleHash);
    }
  };

  const addJobHandler = async (response, puzzleHash) => {
    const {fact, output, programHash} = response;
    program.addOutput(`${output}\n\n${SHARP_MSG}`);
    const [jobResponse, jobError] = await promiseHandler(
      addJob(response.encodedCairoPie)
    );
    if (jobError) {
      program.addOutput(jobError.message, true);
      SendAnalyticsEvent(AnalyticsEventType.SEND_ERROR, name);
    } else {
      const {cairoJobKey} = jobResponse;
      let statusUrl = `sharp.html?job_key=${cairoJobKey}&program_hash=${programHash}&fact=${fact}`;
      if (puzzleHash !== null) {
        statusUrl += `&puzzle_hash=${puzzleHash}`;
      }
      program.addOutput(<ProveOutput statusUrl={statusUrl} />);
      SendAnalyticsEvent(AnalyticsEventType.SEND_SUCCESS, name);
    }
    program.setIsRunning(false);
  };

  const checkIsStarkNetLang = () => {
    if (program.content.includes('%lang starknet')) {
      setShowDeployModal(true);
    } else {
      program.addOutput(DEPLOY_ERROR_MSG, true);
    }
  };

  const deployHandler = async () => {
    const {name} = tabs.getActiveTab();
    setShowDeployModal(false);
    SendAnalyticsEvent(AnalyticsEventType.DEPLOY_CONTRACT, name);
    program.addOutput(COMPILING_MSG);
    const [response, error] = await promiseHandler(
      compile(program.content)
    );
    if (error) {
      program.addOutput(error.message, true);
      program.setIsRunning(false);
    } else {
      return doDeploy(response);
    }
  };

  const doDeploy = async compileResponse => {
    const {contractClass} = compileResponse;
    program.addOutput(DEPLOYING_MSG);
    const [response, error] = await promiseHandler(
      deploy(contractClass)
    );
    if (error) {
      DEPLOY_FAILED_MSG.push(error.message);
      program.addOutput(DEPLOY_FAILED_MSG, true);
      SendAnalyticsEvent(AnalyticsEventType.DEPLOY_ERROR, name);
    } else {
      const {transactionHash, address} = response;
      program.addOutput(
        <DeployOutput address={address} txHash={transactionHash} />
      );
      SendAnalyticsEvent(AnalyticsEventType.DEPLOY_SUCCESS, name);
    }
    program.setIsRunning(false);
  };

  return (
    <>
      <div className={styles.editor}>
        <Box title={EDITOR_TITLE_TXT}>
          <div className={styles.wrapper}>
            <EditorButtons
              isRunning={program.isRunning}
              onCompile={compileHandler}
              onDebug={debugHandler}
              onDeploy={checkIsStarkNetLang}
              onFormat={formatHandler}
              onProve={() => setShowProveModal(true)}
              onRun={runHandler}
              onStop={stopHandler}
            />
            <CodeEditor
              ref={codeEditorRef}
              content={program.content}
              onBeforeChange={(codeMirror, data, value) =>
                program.setEditorContent(value)
              }
            />
          </div>
        </Box>
      </div>
      <ProveModal
        show={showProveModal}
        onClose={() => setShowProveModal(false)}
        onContinue={proveHandler}
      />
      <DeployModal
        show={showDeployModal}
        onClose={() => setShowDeployModal(false)}
        onContinue={deployHandler}
      />
    </>
  );
};

Editor.propTypes = {
  filePath: PropTypes.string
};

export {Editor};
