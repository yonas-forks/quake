import {lighten} from "polished";
import React from 'react';
import Editor from "rich-markdown-editor";
import styled from "styled-components";
import './QuakeEditor.css';

interface EditorProps {
  value: any;
}

function QuakeEditor(props: EditorProps) {
  return (
    <div className="App">
      <StyledEditor
        defaultValue={props.value}
      />
    </div>
  );
}

export default QuakeEditor;

const StyledEditor = styled(Editor)`
  flex-grow: 1;
  justify-content: start;

  > div {
    background: transparent;
  }

  & * {
    box-sizing: content-box;
  }

  .notice-block.tip,
  .notice-block.warning {
    font-weight: 500;
  }

  .heading-anchor {
    box-sizing: border-box;
  }

  .heading-name {
    pointer-events: none;
    display: block;
    position: relative;
    top: -60px;
    visibility: hidden;
  }

  .heading-name:first-child,
  .heading-name:first-child + .ProseMirror-yjs-cursor {
    & + h1,
    & + h2,
    & + h3,
    & + h4 {
      margin-top: 0;
    }
  }

  p {
    a {
      color: #111319;
      border-bottom: 1px solid ${lighten(0.5, "#111319")};
      text-decoration: none !important;
      font-weight: 500;

      &:hover {
        border-bottom: 1px solid #111319;
        text-decoration: none;
      }
    }
  }

  .ProseMirror {
    & > .ProseMirror-yjs-cursor {
      display: none;
    }

    .ProseMirror-yjs-cursor {
      position: relative;
      margin-left: -1px;
      margin-right: -1px;
      border-left: 1px solid black;
      border-right: 1px solid black;
      height: 1em;
      word-break: normal;

      &:after {
        content: "";
        display: block;
        position: absolute;
        left: -8px;
        right: -8px;
        top: 0;
        bottom: 0;
      }

      > div {
        opacity: 0;
        transition: opacity 100ms ease-in-out;
        position: absolute;
        top: -1.8em;
        font-size: 13px;
        background-color: rgb(250, 129, 0);
        font-style: normal;
        line-height: normal;
        user-select: none;
        white-space: nowrap;
        color: white;
        padding: 2px 6px;
        font-weight: 500;
        border-radius: 4px;
        pointer-events: none;
        left: -1px;
      }

      &:hover {
        > div {
          opacity: 1;
        }
      }
    }
  }

  &.show-cursor-names .ProseMirror-yjs-cursor > div {
    opacity: 1;
  }
`;