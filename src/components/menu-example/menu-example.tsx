import { EditorState, Plugin, type Command } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import {
  baseKeymap,
  setBlockType,
  toggleMark,
  wrapIn,
} from 'prosemirror-commands';
import { DOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { history, redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { useEffect } from 'react';
import './menu-example.scss';

interface MenuItemVO {
  command: Command;
  dom: HTMLElement;
}

class MenuView {
  dom: HTMLDivElement;
  items: MenuItemVO[];
  editorView: EditorView;

  constructor(items: MenuItemVO[], view: EditorView) {
    this.items = items;
    this.editorView = view;

    this.dom = document.createElement('div');
    this.dom.className = 'menubar';

    items.forEach(({ dom }) => {
      this.dom.appendChild(dom);
    });
    this.update();

    this.dom.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.editorView.focus();
      items.forEach(({ command, dom }) => {
        if (dom.contains(e.target as Node)) {
          command(this.editorView.state, this.editorView.dispatch, view);
        }
      });
    });
  }

  update() {
    this.items.forEach(({ command, dom }: MenuItemVO) => {
      const active = command(this.editorView.state, undefined, this.editorView);
      dom.style.display = active ? '' : 'none';
    });
  }

  destroy() {
    this.dom.remove();
  }
}

function menuPlugin(items: MenuItemVO[]) {
  return new Plugin({
    view(editorView) {
      // 创建 菜单视图
      const menuView = new MenuView(items, editorView);
      // 将菜单视图插入到编辑器视图前面
      editorView.dom.parentNode!.insertBefore(menuView.dom, editorView.dom);
      return menuView;
    },
  });
}

function icon(text: string, name: string) {
  const span = document.createElement('span');
  span.className = `menuicon ${name}`;
  span.title = name;
  span.textContent = text;
  return span;
}

const menu = menuPlugin([
  { command: toggleMark(schema.marks.strong), dom: icon('B', 'strong') },
  { command: toggleMark(schema.marks.em), dom: icon('I', 'em') },
  {
    command: setBlockType(schema.nodes.paragraph),
    dom: icon('P', 'paragraph'),
  },
  {
    command: setBlockType(schema.nodes.heading, { level: 1 }),
    dom: icon('H1', 'heading'),
  },
  {
    command: setBlockType(schema.nodes.heading, { level: 2 }),
    dom: icon('H2', 'heading'),
  },
  {
    command: setBlockType(schema.nodes.heading, { level: 3 }),
    dom: icon('H3', 'heading'),
  },
  { command: wrapIn(schema.nodes.blockquote), dom: icon('quote', 'quote') },
]);

/** 自定义菜单 示例 */
function MenuExample() {
  useEffect(() => {
    const view = new EditorView(document.querySelector('#menu-editor'), {
      state: EditorState.create({
        doc: DOMParser.fromSchema(schema).parse(
          document.querySelector('#menu-editor-content')!
        ),
        plugins: [
          keymap(baseKeymap),
          menu,
          history(),
          keymap({
            'Ctrl-z': undo,
            'Ctrl-y': redo,
          }),
        ],
      }),
    });

    return () => view.destroy();
  }, []);

  return (
    <div className='menu-example'>
      <div id='menu-editor' className='editor'>
        <div id='menu-editor-content'></div>
      </div>
    </div>
  );
}

export default MenuExample;
