import CodeMirror from 'codemirror';
import 'codemirror/addon/mode/simple';
import 'codemirror/keymap/sublime';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ambiance.css';
import PropTypes from 'prop-types';
import React, {forwardRef} from 'react';
import {Controlled as CodeMirror2} from 'react-codemirror2';
import {AppModes} from '../../../../constants/app-modes';
import styles from './CodeEditor.module.scss';

CodeMirror.defineSimpleMode(AppModes.CAIRO, {
  start: [
    {
      regex:
        /(?:func|struct|namespace|call|ret|jmp|if|let|const|import|from|as|abs|rel|local|static_assert|tempvar|return|assert|felt|cast|else|alloc_locals|with|with_attr|nondet|dw|codeoffset|new|using|and)\b/,
      token: 'keyword'
    },
    {regex: /ap|fp/, token: 'atom'},
    {
      regex: /-?[0-9]+/,
      token: 'number'
    },
    {regex: /\/\/.*/, token: 'comment'},
    {regex: /[-+*=<>!]+/, token: 'operator'},
    {regex: /[a-zA-Z_][a-zA-Z_0-9]*/, token: 'variable'},
    {
      regex: /%{/,
      token: 'meta',
      mode: {spec: 'python', end: /%}/}
    }
  ],
  meta: {
    dontIndentStates: ['comment'],
    lineComment: '//'
  }
});

const editorOptions = {
  theme: 'ambiance',
  mode: 'cairo',
  viewportMargin: '100',
  keyMap: 'sublime',
  lineNumbers: true,
  tabSize: 4,
  indentWithTabs: false,
  indentUnit: 4,
  extraKeys: {
    Tab: function (cm) {
      if (cm.somethingSelected()) {
        cm.indentSelection('add');
      } else {
        const spaces = Array(cm.getOption('indentUnit') + 1).join(
          ' '
        );
        cm.replaceSelection(spaces);
      }
    },
    'Ctrl-Space': 'autocomplete'
  }
};

const CodeEditor = forwardRef(
  ({content = '', onBeforeChange = () => {}}, ref) => {
    return (
      <div className={styles.codeEditor}>
        <CodeMirror2
          ref={ref}
          options={editorOptions}
          value={content}
          onBeforeChange={onBeforeChange}
        />
      </div>
    );
  }
);

CodeEditor.displayName = 'CodeEditor';

CodeEditor.propTypes = {
  content: PropTypes.string,
  onBeforeChange: PropTypes.func
};

export {CodeEditor};
