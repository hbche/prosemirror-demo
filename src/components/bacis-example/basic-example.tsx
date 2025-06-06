import { exampleSetup } from 'prosemirror-example-setup';
import { DOMParser, Schema } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { useEffect } from 'react';
import './bacis-example.scss';

function BasicExample() {
  useEffect(() => {
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
      marks: schema.spec.marks.append({
        link: {
          attrs: { href: { default: null }, color: { default: 'blue' } },
          parseDOM: [
            {
              tag: 'a[href]',
              getAttrs(dom) {
                return {
                  href: dom.getAttribute('href'),
                  color: dom.getAttribute('color'),
                };
              },
            },
          ],
          toDOM(node) {
            return [
              'a',
              {
                href: node.attrs.href,
                color: node.attrs.color,
                style: `cursor: pointer; color: ${node.attrs.color}`,
              },
              0,
            ];
          },
        },
      }),
    });

    const view = new EditorView(document.querySelector('#editor')!, {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(
          document.querySelector('#content')!
        ),
        plugins: exampleSetup({ schema: mySchema }),
      }),
    });


    // 卸载时销毁 prosemirror-view 实例，避免重复生成
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

export default BasicExample;
