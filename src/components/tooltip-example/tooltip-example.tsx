import { exampleSetup } from 'prosemirror-example-setup';
import { Schema, DOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { useEffect } from 'react';
import selectionSizePlugin from './selection-size-tooltip';
import './tooltip-example.scss';

function TooltipExample() {
  useEffect(() => {
    const customSchema = new Schema({
      nodes: {
        doc: {
          content: 'block+',
        },
        paragraph: {
          content: 'inline*',
          group: 'block',
          parseDOM: [{ tag: 'p' }],
          toDOM() {
            return ['p', 0];
          },
        },
        text: {
          group: 'inline',
          parseDOM: [{ tag: 'span' }],
          toDOM() {
            return ['span', 0];
          },
        },
      },
      marks: schema.spec.marks,
    });

    const content = document.querySelector('#content')!;
    const startDoc = DOMParser.fromSchema(customSchema).parse(content);
    const view = new EditorView(content, {
      state: EditorState.create({
        doc: startDoc,
        plugins: exampleSetup({
          schema: customSchema,
        }).concat(selectionSizePlugin),
      }),
    });

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div id='editor'>
      <div id='content'></div>
    </div>
  );
}

export default TooltipExample;
