import { DOMParser, Schema } from 'prosemirror-model';
import { useEffect } from 'react';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import { EditorState, type Command } from 'prosemirror-state';
import { history, undo, redo } from 'prosemirror-history';
import { EditorView } from 'prosemirror-view';

const textSchema = new Schema({
  nodes: {
    text: {},
    doc: { content: 'text*' },
  },
});

const noteSchema = new Schema({
  nodes: {
    text: {},
    note: {
      content: 'text*',
      toDOM() {
        return ['note', 0];
      },
      parseDOM: [
        {
          tag: 'note',
        },
      ],
    },
    noteGroup: {
      content: 'note+',
      toDOM() {
        return ['noteGroup', 0];
      },
      parseDOM: [{ tag: 'noteGroup' }],
    },
    doc: {
      content: '(note | noteGroup)+',
    },
  },
});

/** 自定义 schema 示例 */
function SchemaExample() {
  useEffect(() => {
    const starSchema = new Schema({
      nodes: {
        text: {
          group: 'inline',
        },
        star: {
          inline: true,
          group: 'inline',
          toDOM() {
            return ['star', '✨'];
          },
          parseDOM: [{ tag: 'star' }],
        },
        paragraph: {
          group: 'block',
          content: 'inline*',
          toDOM() {
            return ['p', 0];
          },
          parseDOM: [{ tag: 'p' }],
        },
        boring_paragraph: {
          group: 'block',
          content: 'text*',
          marks: '',
          toDOM() {
            return ['p', { class: 'boring' }, 0];
          },
          parseDOM: [{ tag: 'p.boring', priority: 60 }],
        },
        doc: {
          content: 'block+',
        },
      },
      marks: {
        shouting: {
          toDOM() {
            return ['shouting', 0];
          },
          parseDOM: [{ tag: 'shouting' }],
        },
        link: {
          attrs: {
            href: { default: null },
          },
          toDOM(node) {
            return ['a', { href: node.attrs.href }, 0];
          },
          parseDOM: [
            {
              tag: 'a',
              getAttrs(dom) {
                return { href: dom.getAttribute('href') };
              },
            },
          ],
          inclusive: false,
        },
      },
    });

    const insertStar: Command = (state, dispatch) => {
      const type = starSchema.nodes.star;
      // const { $from } = state.selection;
      // if ($from.parent.canReplaceWith($from.index(), $from.index(), type)) {
      //   return false;
      // }

      dispatch?.(state.tr.replaceSelectionWith(type.create()));
      return true;
    };

    const toggleLink: Command = (state, dispatch) => {
      const { doc, selection } = state;
      // 必须有选中的内容才能生效
      if (selection.empty) return false;
      let attrs = null;
      if (
        !doc.rangeHasMark(selection.from, selection.to, starSchema.marks.link)
      ) {
        attrs = { href: prompt('Link to where?', 'https://example.com') };
        if (!attrs.href) return false;
      }

      return toggleMark(starSchema.marks.link, attrs)(state, dispatch);
    };

    const starKeymap = keymap({
      'Ctrl-b': toggleMark(starSchema.marks.shouting),
      'Ctrl-q': toggleLink,
      'Ctrl-i': insertStar,
    });

    const histKeymap = keymap({
      'Ctrl-z': undo,
      'Ctrl-y': redo,
    });

    const textView = new EditorView(document.querySelector('#text-editor')!, {
      state: EditorState.create({
        doc: DOMParser.fromSchema(textSchema).parse(
          document.querySelector('#text-content')!
        ),
        plugins: [histKeymap, keymap(baseKeymap), history()],
      }),
    });

    const starView = new EditorView(document.querySelector('#star-editor'), {
      state: EditorState.create({
        doc: DOMParser.fromSchema(starSchema).parse(
          document.querySelector('#star-content')!
        ),
        plugins: [starKeymap],
      }),
    });

    return () => {
      textView.destroy();
      starView.destroy();
    };
  }, []);

  return (
    <div className='schema-example'>
      <div id='text-editor' className='editor'>
        <div id='text-content'></div>
      </div>
      <div id='star-editor' className='editor'>
        <div id='star-content'></div>
      </div>
    </div>
  );
}

export default SchemaExample;
