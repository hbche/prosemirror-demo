import { Plugin, Selection, PluginKey, EditorState } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';
import { Schema, type Node } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { useEffect } from 'react';
import { exampleSetup } from 'prosemirror-example-setup';
import './fold-example.scss';

// Create a unique key for the plugin metadata
const foldPluginKey = new PluginKey('fold');

function setFolding(view: EditorView, pos: number, fold: boolean) {
  // 根据 position 信息找到节点
  const section = view.state.doc.nodeAt(pos);
  if (section && section.type.name === 'section') {
    // 在事务中存储元数据属性，使用plugin或者plugin的名称作为key
    // 我们使用插件本身作为元数据标签。如果存在，它将包含一个 {pos, fold} 对象。根据fold值，代码会在给定位置添加或删除装饰节点
    const tr = view.state.tr.setMeta(foldPluginKey, { pos, fold });
    const { from, to } = view.state.selection;
    const endPos = pos + section.nodeSize;
    if (from < endPos && to > pos) {
      const newSel = Selection.findFrom(view.state.doc.resolve(endPos), -1);
      if (newSel) {
        tr.setSelection(newSel);
      }
    }
    view.dispatch(tr);
  }
}

const foldPlugin: Plugin = new Plugin({
  key: foldPluginKey,
  state: {
    init(): DecorationSet {
      return DecorationSet.empty;
    },
    apply(tr, value): DecorationSet {
      value = value.map(tr.mapping, tr.doc);
      const update = tr.getMeta(foldPluginKey);
      if (update && update.fold) {
        const node = tr.doc.nodeAt(update.pos);
        if (node && node.type.name === 'section') {
          value = value.add(tr.doc, [
            Decoration.node(
              update.pos,
              update.pos + node.nodeSize,
              {},
              { foldSection: true }
            ),
          ]);
        }
      } else if (update) {
        const found = value.find(update.pos + 1, update.pos + 1);
        if (found.length > 0) {
          value = value.remove(found);
        }
      }

      return value;
    },
  },
  props: {
    decorations: (state): DecorationSet => foldPlugin.getState(state),
    nodeViews: {
      section: (node, view, getPos, decorations) =>
        new SectionView(node, view, getPos as () => number, decorations),
    },
  },
});

class SectionView {
  dom: HTMLElement;
  header: HTMLElement;
  foldButton: HTMLElement;
  contentDOM: HTMLElement;
  folded?: boolean;

  constructor(
    node: Node,
    view: EditorView,
    getPos: () => number,
    deco: readonly Decoration[]
  ) {
    this.dom = document.createElement('section');
    this.header = this.dom.appendChild(document.createElement('header'));
    this.header.contentEditable = 'false';
    this.foldButton = this.header.appendChild(document.createElement('button'));
    this.foldButton.title = '触发折叠展开';
    this.foldButton.onmousedown = (e) => {
      this.foldClick(view, getPos, e);
    };
    this.contentDOM = this.dom.appendChild(document.createElement('div'));
    this.setFolded(deco.some((d) => d.spec.foldSelection));
  }

  setFolded(folded: boolean) {
    this.folded = folded;
    this.foldButton.textContent = folded ? '▽' : '△';
    this.contentDOM.style.display = folded ? 'none' : '';
  }

  update(node: Node, deco: readonly Decoration[]) {
    if (node.type.name !== 'section') return false;
    const folded = deco.some((d) => d.spec.foldSection);
    if (folded !== this.folded) {
      this.setFolded(folded);
    }
    return true;
  }

  foldClick(view: EditorView, getPos: () => number, e: MouseEvent) {
    e.preventDefault();
    setFolding(view, getPos(), !this.folded);
  }
}

function FoldExample() {
  useEffect(() => {
    const schema = new Schema({
      nodes: basicSchema.spec.nodes.append({
        doc: {
          content: 'section+',
        },
        section: {
          content: 'heading block+',
          parseDOM: [{ tag: 'section' }],
          toDOM() {
            return ['section', 0];
          },
        },
      }),
      marks: basicSchema.spec.marks,
    });

    const view = new EditorView(document.querySelector('#fold-editor')!, {
      state: EditorState.create({
        doc: schema.node('doc', null, [
          schema.node('section', null, [
            schema.node('heading', { level: 1 }, [schema.text('One')]),
            schema.node('paragraph', null, [
              schema.text(
                'This is the first section. Click the top right corner to collapse it.'
              ),
            ]),
          ]),
          schema.node('section', null, [
            schema.node('heading', { level: 1 }, [schema.text('Two')]),
            schema.node('paragraph', null, [
              schema.text("Here's another section."),
            ]),
          ]),
        ]),
        plugins: exampleSetup({ schema }).concat(foldPlugin),
      }),
    });

    return () => view.destroy();
  }, []);

  return (
    <div className='fold-example'>
      <div id='fold-editor' className='editor'>
        <div id='fold-content'></div>
      </div>
    </div>
  );
}

export default FoldExample;
