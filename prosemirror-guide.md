# ProseMirror 完整使用指南

![ProseMirror](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDIwOC4xIDIzOC4wIj48cGF0aCBkPSJNMTA0IDJBMTAyIDEwMiAwIDAgMCAyIDEwNGExMDIgMTAyIDAgMCAwIDEwMiAxMDIgMTAyIDEwMiAwIDAgMCAxMDItMTAyQTEwMiAxMDIgMCAwIDAgMTA0IDJ6bTAgMTQuOWE4Ny4xIDg3LjEgMCAwIDEgODcuMSA4Ny4xIDg3LjEgODcuMSAwIDAgMS04Ny4xIDg3LjFBODcuMSA4Ny4xIDAgMCAxIDE2LjkgMTA0IDg3LjEgODcuMSAwIDAgMSAxMDQgMTYuOXoiLz48cGF0aCBkPSJNMTQ3LjEgOTIuN2MtNi45IDgzLjkgMTAuOCAxMDMuNCAxMC44IDEwMy40cy01NS4xIDUuNS04Mi43LTEzLjRjLTMwLjUtMjAuOS0yNi4wLTY3LjUtMjUuOS05NC42LjEtMjguNCAyNS42LTQ1LjggNDkuOS00NS4zQzEyOC4zIDQzLjMgMTQ5LjQgNjQuNCAxNDcuMSA5Mi43eiIvPjxwYXRoIGQ9Ik04Mi4xIDEzOS41YzExLjMgMzYuMyA1MC42IDYyLjQgNTAuNiA2Mi40bDE4LjUtMS40eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik04Mi4xIDEzOS41YzMgMTMuMyAxNy45IDI5LjkgMzAuNCA0MS42IDI0LjggMjMuMiA0MiAyMi40IDg2IDU0LjctMTguMi01MS44LTE4LjgtNjItNDMuNS0xMDYuMS0yNC43LTQ0LTY3LjYtMjAuMy02Ny42LTIwLjNTNzkgMTI2IDgyLjEgMTM5LjN6Ii8+PHBhdGggZD0iTTEwOC45IDc2LjBzLTQuMC0xMS42LTE4LjAtMTEuNWMtMzAuMC4yLTI4LjggNTIuMSAxNi45IDUyLjAgMzkuNi0uMSAzOS4yLTQ5LjQgMTYuMS00OS42LTEwLjItLjItMTUuMCA5LjEtMTUuMCA5LjF6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTEwOS40IDk1LjBjMTAuOC4wIDIuMCAxNC45LS42IDIwLjktMS44LTguNC0xMC4yLTIwLjkuNi0yMC45ek05My4xIDgwLjFjLTUuNiAwLTEwLjIgNC41LTEwLjIgMTAuMiAwIDUuNiA0LjUgMTAuMiAxMC4yIDEwLjIgNS42IDAgMTAuMi00LjUgMTAuMi0xMC4yIDAtNS42LTQuNS0xMC4yLTEwLjItMTAuMnptMzAuNS0uMWMtNC44IDAtOC44IDQuNS04LjggMTAuMiAwIDUuNiAzLjkgMTAuMiA4LjggMTAuMiA0LjggMCA4LjgtNC41IDguOC0xMC4yIDAtNS42LTMuOS0xMC4yLTguOC0xMC4yeiIvPjwvc3ZnPg== 'ProseMirror')

## 目录

1. [基础概念](#基础概念)
2. [核心模块详解](#核心模块详解)
3. [创建你的第一个编辑器](#创建你的第一个编辑器)
4. [Schema（模式）详解](#schema模式详解)
5. [State（状态）管理](#state状态管理)
6. [View（视图）和交互](#view视图和交互)
7. [Transform（变换）和事务](#transform变换和事务)
8. [插件系统](#插件系统)
9. [命令系统](#命令系统)
10. [实际应用示例](#实际应用示例)
11. [常见问题和解决方案](#常见问题和解决方案)
12. [最佳实践](#最佳实践)

## 基础概念

### ProseMirror 是什么？

ProseMirror 是一个用于构建富文本编辑器的工具包，它采用了与传统所见即所得编辑器不
同的方法：

- **文档即数据结构**：文档不是 HTML 字符串，而是结构化的数据
- **不可变状态**：每次编辑都创建新的状态，而不是直接修改现有状态
- **事务驱动**：所有更改都通过事务进行，可以被拦截、修改或撤销
- **模块化设计**：核心功能分布在多个独立的包中

### 核心理念

```javascript
// 传统编辑器的问题
div.innerHTML = '<p>Hello <strong>World</strong></p>'; // 难以控制和验证

// ProseMirror 的方式
const doc = schema.node('doc', null, [
  schema.node('paragraph', null, [
    schema.text('Hello '),
    schema.text('World', [schema.marks.strong.create()]),
  ]),
]); // 结构化、可验证、可预测
```

## 核心模块详解

### 1. prosemirror-model

定义文档的数据结构和模式。

```javascript
import { Schema, Node, Mark } from 'prosemirror-model';

// 定义节点类型
const mySchema = new Schema({
  nodes: {
    doc: { content: 'paragraph+' },
    paragraph: {
      content: 'text*',
      toDOM: () => ['p', 0],
      parseDOM: [{ tag: 'p' }],
    },
    text: {},
  },
  marks: {
    strong: {
      toDOM: () => ['strong', 0],
      parseDOM: [{ tag: 'strong' }],
    },
  },
});
```

### 2. prosemirror-state

管理编辑器的状态和事务。

```javascript
import { EditorState, Transaction } from 'prosemirror-state';

// 创建初始状态
const state = EditorState.create({
  schema: mySchema,
  plugins: [
    /* 插件列表 */
  ],
});

// 应用事务
const tr = state.tr.insertText('Hello World');
const newState = state.apply(tr);
```

### 3. prosemirror-view

提供用户界面和交互处理。

```javascript
import { EditorView } from 'prosemirror-view';

const view = new EditorView(document.getElementById('editor'), {
  state: initialState,
  dispatchTransaction: (tr) => {
    const newState = view.state.apply(tr);
    view.updateState(newState);
  },
});
```

### 4. prosemirror-transform

提供文档变换的底层 API。

```javascript
import { Transform } from 'prosemirror-transform';

// 创建变换
const tr = new Transform(doc);
tr.insertText(0, 'Hello');
tr.addMark(0, 5, schema.marks.strong.create());
```

## 创建你的第一个编辑器

### 最简单的编辑器

```javascript
import { schema } from 'prosemirror-schema-basic';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

// 创建状态
const state = EditorState.create({ schema });

// 创建视图
const view = new EditorView(document.getElementById('editor'), { state });
```

### 添加基础功能

```javascript
import { schema } from 'prosemirror-schema-basic';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { history, undo, redo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';

const state = EditorState.create({
  schema,
  plugins: [
    history(),
    keymap({ 'Mod-z': undo, 'Mod-y': redo }),
    keymap(baseKeymap),
  ],
});

const view = new EditorView(document.getElementById('editor'), { state });
```

### 使用 example-setup（推荐用于快速开始）

```javascript
import { schema } from 'prosemirror-schema-basic';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { exampleSetup } from 'prosemirror-example-setup';

const view = new EditorView(document.getElementById('editor'), {
  state: EditorState.create({
    schema,
    plugins: exampleSetup({ schema }),
  }),
});
```

## Schema（模式）详解

Schema 定义了文档的结构规则，类似于 HTML 的 DTD 或 XML Schema。

### 基本 Schema 结构

```javascript
const mySchema = new Schema({
  nodes: {
    // 文档根节点（必需）
    doc: {
      content: 'block+', // 包含一个或多个块级元素
    },

    // 段落节点
    paragraph: {
      content: 'inline*', // 包含零个或多个内联元素
      group: 'block', // 属于块级组
      parseDOM: [{ tag: 'p' }],
      toDOM: () => ['p', 0],
    },

    // 标题节点
    heading: {
      attrs: { level: { default: 1 } }, // 属性定义
      content: 'inline*',
      group: 'block',
      defining: true, // 定义性节点，影响选择行为
      parseDOM: [
        { tag: 'h1', attrs: { level: 1 } },
        { tag: 'h2', attrs: { level: 2 } },
        // ...
      ],
      toDOM: (node) => [`h${node.attrs.level}`, 0],
    },

    // 文本节点（必需）
    text: {
      group: 'inline',
    },
  },

  marks: {
    // 粗体标记
    strong: {
      parseDOM: [
        { tag: 'strong' },
        {
          tag: 'b',
          getAttrs: (node) => node.style.fontWeight !== 'normal' && null,
        },
      ],
      toDOM: () => ['strong', 0],
    },

    // 斜体标记
    em: {
      parseDOM: [{ tag: 'i' }, { tag: 'em' }],
      toDOM: () => ['em', 0],
    },

    // 链接标记
    link: {
      attrs: { href: {}, title: { default: null } },
      inclusive: false, // 不会自动扩展到新输入的文本
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs: (dom) => ({
            href: dom.getAttribute('href'),
            title: dom.getAttribute('title'),
          }),
        },
      ],
      toDOM: (node) => ['a', node.attrs, 0],
    },
  },
});
```

### Content 表达式

Content 表达式定义了节点可以包含的内容：

```javascript
// 基本表达式
'text*'; // 零个或多个文本节点
'paragraph+'; // 一个或多个段落
'heading paragraph*'; // 一个标题后跟零个或多个段落
'(paragraph | heading)+'; // 一个或多个段落或标题
'inline*'; // 零个或多个内联内容

// 组合表达式
'block+'; // 一个或多个块级元素
'inline* (hard_break inline*)*'; // 内联内容，可以被硬换行分割
```

### 自定义节点示例

```javascript
// 代码块节点
code_block: {
  content: "text*",
  marks: "",  // 不允许任何标记
  group: "block",
  code: true,  // 标记为代码内容
  defining: true,
  attrs: { language: { default: "" } },
  parseDOM: [{
    tag: "pre",
    preserveWhitespace: "full",  // 保留空白字符
    getAttrs: (node) => ({ language: node.getAttribute("data-language") || "" })
  }],
  toDOM: (node) => ["pre", { "data-language": node.attrs.language }, ["code", 0]]
}

// 图片节点
image: {
  inline: true,
  attrs: { src: {}, alt: { default: null }, title: { default: null } },
  group: "inline",
  draggable: true,
  parseDOM: [{
    tag: "img[src]",
    getAttrs: (dom) => ({
      src: dom.getAttribute("src"),
      title: dom.getAttribute("title"),
      alt: dom.getAttribute("alt")
    })
  }],
  toDOM: (node) => ["img", node.attrs]
}
```

## State（状态）管理

EditorState 是不可变的，包含了编辑器的完整状态。

### 状态的组成

```javascript
const state = EditorState.create({
  schema, // 文档模式
  doc, // 当前文档
  selection, // 当前选择
  plugins, // 插件列表
});

// 访问状态属性
console.log(state.doc); // 当前文档
console.log(state.selection); // 当前选择
console.log(state.tr); // 新的事务
```

### 选择（Selection）

```javascript
import { TextSelection, NodeSelection, AllSelection } from 'prosemirror-state';

// 文本选择（光标或文本范围）
const textSel = TextSelection.create(doc, 5, 10);

// 节点选择（选中整个节点）
const nodeSel = NodeSelection.create(doc, 5);

// 全选
const allSel = new AllSelection(doc);

// 在事务中设置选择
tr.setSelection(TextSelection.create(tr.doc, 10));
```

### 事务（Transaction）

事务是状态变更的描述，基于 Transform 类：

```javascript
// 创建事务
const tr = state.tr;

// 插入文本
tr.insertText('Hello World', 0);

// 删除内容
tr.delete(5, 10);

// 替换内容
tr.replaceWith(5, 10, schema.text('New text'));

// 添加标记
tr.addMark(0, 5, schema.marks.strong.create());

// 设置属性
tr.setNodeMarkup(0, null, { level: 2 });

// 应用事务
const newState = state.apply(tr);
```

### 插件状态

插件可以在状态中存储自己的数据：

```javascript
const myPlugin = new Plugin({
  key: new PluginKey('myPlugin'),
  state: {
    init: () => ({ count: 0 }),
    apply: (tr, value) => {
      // 根据事务更新插件状态
      return { count: value.count + 1 };
    },
  },
});

// 获取插件状态
const pluginState = myPlugin.getState(editorState);
```

## View（视图）和交互

EditorView 负责将状态渲染为 DOM 并处理用户交互。

### 基本视图配置

```javascript
const view = new EditorView(document.getElementById('editor'), {
  state: initialState,

  // 自定义事务分发
  dispatchTransaction: (tr) => {
    console.log('Transaction:', tr);
    const newState = view.state.apply(tr);
    view.updateState(newState);
  },

  // 编辑器属性
  editable: () => true, // 是否可编辑

  // DOM 属性
  attributes: {
    class: 'my-editor',
    spellcheck: 'false',
  },

  // 处理点击
  handleClick: (view, pos, event) => {
    console.log('Clicked at position:', pos);
    return false; // 返回 true 表示已处理，阻止默认行为
  },

  // 处理键盘事件
  handleKeyDown: (view, event) => {
    if (event.key === 'Tab') {
      // 处理 Tab 键
      return true;
    }
    return false;
  },
});
```

### 节点视图（NodeView）

自定义节点的渲染和交互：

```javascript
class ImageNodeView {
  constructor(node, view, getPos) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;

    // 创建 DOM 元素
    this.dom = document.createElement('div');
    this.dom.className = 'image-wrapper';

    this.img = document.createElement('img');
    this.img.src = node.attrs.src;
    this.img.alt = node.attrs.alt || '';

    // 添加交互
    this.img.addEventListener('click', () => {
      // 选中这个节点
      const pos = this.getPos();
      const selection = NodeSelection.create(view.state.doc, pos);
      view.dispatch(view.state.tr.setSelection(selection));
    });

    this.dom.appendChild(this.img);
  }

  // 更新节点
  update(node) {
    if (node.type !== this.node.type) return false;
    this.node = node;
    this.img.src = node.attrs.src;
    this.img.alt = node.attrs.alt || '';
    return true;
  }

  // 销毁时清理
  destroy() {
    // 清理事件监听器等
  }
}

// 在插件中注册节点视图
const imagePlugin = new Plugin({
  props: {
    nodeViews: {
      image: (node, view, getPos) => new ImageNodeView(node, view, getPos),
    },
  },
});
```

### 装饰（Decorations）

为文档添加视觉效果而不修改文档结构：

```javascript
import { Decoration, DecorationSet } from 'prosemirror-view';

const decorationPlugin = new Plugin({
  state: {
    init: () => DecorationSet.empty,
    apply: (tr, decorations) => {
      // 映射装饰到新文档
      decorations = decorations.map(tr.mapping, tr.doc);

      // 添加新装饰
      const deco = Decoration.inline(5, 10, { class: 'highlight' });
      decorations = decorations.add(tr.doc, [deco]);

      return decorations;
    },
  },
  props: {
    decorations: (state) => decorationPlugin.getState(state),
  },
});

// 装饰类型
Decoration.inline(from, to, attrs); // 内联装饰
Decoration.node(from, to, attrs); // 节点装饰
Decoration.widget(pos, dom, spec); // 小部件装饰
```

## Transform（变换）和事务

Transform 提供了修改文档的底层 API。

### 基本变换操作

```javascript
// 插入内容
tr.insert(pos, content);
tr.insertText(pos, text, marks);

// 删除内容
tr.delete(from, to);

// 替换内容
tr.replace(from, to, slice);
tr.replaceWith(from, to, ...nodes);

// 标记操作
tr.addMark(from, to, mark);
tr.removeMark(from, to, markType);

// 节点操作
tr.setNodeMarkup(pos, type, attrs, marks);
tr.split(pos, depth, typesAfter);
tr.join(pos, depth);
tr.wrap(from, to, wrappers);
tr.lift(from, to);
```

### 步骤（Steps）

每个变换操作都会产生一个步骤，步骤可以被应用、撤销和重做：

```javascript
// 获取事务的步骤
const steps = tr.steps;

// 应用步骤
steps.forEach((step) => {
  doc = step.apply(doc).doc;
});

// 获取逆步骤（用于撤销）
const invertedSteps = steps.map((step) => step.invert(doc));
```

### 映射（Mapping）

当文档发生变化时，位置需要被映射到新的位置：

```javascript
// 创建映射
const mapping = tr.mapping;

// 映射位置
const newPos = mapping.map(oldPos);

// 映射范围
const newRange = mapping.mapResult(from, to);
```

## 插件系统

插件是扩展 ProseMirror 功能的主要方式。

### 插件结构

```javascript
const myPlugin = new Plugin({
  // 插件键（用于识别插件）
  key: new PluginKey('myPlugin'),

  // 插件状态
  state: {
    init: (config, state) => {
      // 初始化插件状态
      return { active: false };
    },
    apply: (tr, value, oldState, newState) => {
      // 根据事务更新插件状态
      const meta = tr.getMeta(myPlugin);
      if (meta) {
        return { ...value, ...meta };
      }
      return value;
    },
  },

  // 视图属性
  props: {
    // 处理键盘事件
    handleKeyDown: (view, event) => {
      if (event.key === 'F1') {
        // 处理 F1 键
        return true;
      }
      return false;
    },

    // 处理点击
    handleClick: (view, pos, event) => {
      // 处理点击事件
      return false;
    },

    // 装饰
    decorations: (state) => {
      return myPlugin.getState(state).decorations;
    },

    // 节点视图
    nodeViews: {
      paragraph: (node, view, getPos) =>
        new CustomParagraphView(node, view, getPos),
    },
  },

  // 过滤事务
  filterTransaction: (tr, state) => {
    // 返回 false 可以阻止事务
    return true;
  },

  // 添加到事务
  appendTransaction: (transactions, oldState, newState) => {
    // 可以返回一个额外的事务
    return null;
  },
});
```

### 实用插件示例

#### 1. 占位符插件

```javascript
function placeholderPlugin(text) {
  return new Plugin({
    props: {
      decorations: (state) => {
        const doc = state.doc;
        if (
          doc.childCount === 1 &&
          doc.firstChild.isTextblock &&
          doc.firstChild.content.size === 0
        ) {
          return DecorationSet.create(doc, [
            Decoration.widget(1, () => {
              const placeholder = document.createElement('span');
              placeholder.className = 'placeholder';
              placeholder.textContent = text;
              return placeholder;
            }),
          ]);
        }
        return null;
      },
    },
  });
}
```

#### 2. 自动保存插件

```javascript
function autoSavePlugin(saveCallback, delay = 1000) {
  let timeout;

  return new Plugin({
    view: () => ({
      update: (view, prevState) => {
        if (!view.state.doc.eq(prevState.doc)) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            saveCallback(view.state.doc);
          }, delay);
        }
      },
    }),
  });
}
```

#### 3. 字数统计插件

```javascript
const wordCountPlugin = new Plugin({
  key: new PluginKey('wordCount'),
  state: {
    init: (_, state) => ({ words: countWords(state.doc) }),
    apply: (tr, value, oldState, newState) => {
      if (oldState.doc.eq(newState.doc)) return value;
      return { words: countWords(newState.doc) };
    },
  },
});

function countWords(doc) {
  let words = 0;
  doc.descendants((node) => {
    if (node.isText) {
      words += node.text.split(/\s+/).filter((word) => word.length > 0).length;
    }
  });
  return words;
}
```

## 命令系统

命令是可以应用于编辑器状态的函数，通常绑定到按键或菜单项。

### 命令的结构

```javascript
function myCommand(state, dispatch, view) {
  // state: 当前编辑器状态
  // dispatch: 分发事务的函数（可选，用于查询模式）
  // view: 编辑器视图（可选）

  // 检查命令是否可以执行
  if (!canExecute(state)) {
    return false;
  }

  // 如果只是查询，不执行
  if (!dispatch) {
    return true;
  }

  // 执行命令
  const tr = state.tr;
  // ... 修改事务
  dispatch(tr);
  return true;
}
```

### 常用命令

```javascript
import {
  toggleMark,
  setBlockType,
  wrapIn,
  splitBlock,
  liftEmptyBlock,
  newlineInCode,
  createParagraphNear,
  liftEmptyBlock,
  splitBlockKeepMarks,
} from 'prosemirror-commands';

// 切换标记
const toggleBold = toggleMark(schema.marks.strong);
const toggleItalic = toggleMark(schema.marks.em);

// 设置块类型
const makeParagraph = setBlockType(schema.nodes.paragraph);
const makeHeading1 = setBlockType(schema.nodes.heading, { level: 1 });

// 包装块
const wrapInBlockquote = wrapIn(schema.nodes.blockquote);
```

### 自定义命令

```javascript
// 插入当前时间
function insertCurrentTime(state, dispatch) {
  if (dispatch) {
    const time = new Date().toLocaleTimeString();
    dispatch(state.tr.insertText(time));
  }
  return true;
}

// 清除格式
function clearFormatting(state, dispatch) {
  const { from, to } = state.selection;
  if (from === to) return false;

  if (dispatch) {
    const tr = state.tr;
    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.marks.length > 0) {
        const start = Math.max(pos, from);
        const end = Math.min(pos + node.nodeSize, to);
        node.marks.forEach((mark) => {
          tr.removeMark(start, end, mark);
        });
      }
    });
    dispatch(tr);
  }
  return true;
}

// 智能引用
function smartQuotes(state, dispatch) {
  const { $from } = state.selection;
  const textBefore = $from.parent.textBetween(0, $from.parentOffset);

  if (textBefore.endsWith('"')) {
    if (dispatch) {
      const pos = $from.pos - 1;
      dispatch(state.tr.replaceWith(pos, pos + 1, schema.text('"')));
    }
    return true;
  }

  return false;
}
```

### 键盘映射

```javascript
import { keymap } from 'prosemirror-keymap';

const myKeymap = keymap({
  'Mod-b': toggleMark(schema.marks.strong),
  'Mod-i': toggleMark(schema.marks.em),
  'Mod-Shift-1': setBlockType(schema.nodes.heading, { level: 1 }),
  'Mod-Shift-2': setBlockType(schema.nodes.heading, { level: 2 }),
  'Ctrl-Space': clearFormatting,
  'Mod-t': insertCurrentTime,
  '"': smartQuotes,
});
```

## 实际应用示例

基于你的项目，让我展示一些实际的应用示例：

### 1. 折叠功能（基于你的 fold-example）

```javascript
// 改进的折叠插件
const foldPlugin = new Plugin({
  key: new PluginKey('fold'),
  state: {
    init: () => DecorationSet.empty,
    apply: (tr, decorations) => {
      decorations = decorations.map(tr.mapping, tr.doc);

      const action = tr.getMeta(foldPlugin);
      if (action) {
        if (action.type === 'fold') {
          const deco = Decoration.node(
            action.pos,
            action.pos + action.node.nodeSize,
            { class: 'folded' },
            { folded: true }
          );
          decorations = decorations.add(tr.doc, [deco]);
        } else if (action.type === 'unfold') {
          const found = decorations.find(action.pos, action.pos + 1);
          decorations = decorations.remove(found);
        }
      }

      return decorations;
    },
  },
  props: {
    decorations: (state) => foldPlugin.getState(state),
    nodeViews: {
      section: (node, view, getPos) => new SectionView(node, view, getPos),
    },
  },
});

class SectionView {
  constructor(node, view, getPos) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;

    this.dom = document.createElement('section');
    this.header = document.createElement('header');
    this.foldButton = document.createElement('button');
    this.contentDOM = document.createElement('div');

    this.foldButton.textContent = '▼';
    this.foldButton.onclick = () => this.toggleFold();

    this.header.appendChild(this.foldButton);
    this.dom.appendChild(this.header);
    this.dom.appendChild(this.contentDOM);

    this.updateFoldState();
  }

  toggleFold() {
    const pos = this.getPos();
    const decorations = foldPlugin.getState(this.view.state);
    const isFolded = decorations.find(pos, pos + 1).length > 0;

    const tr = this.view.state.tr.setMeta(foldPlugin, {
      type: isFolded ? 'unfold' : 'fold',
      pos: pos,
      node: this.node,
    });

    this.view.dispatch(tr);
  }

  updateFoldState() {
    const pos = this.getPos();
    const decorations = foldPlugin.getState(this.view.state);
    const isFolded = decorations.find(pos, pos + 1).length > 0;

    this.foldButton.textContent = isFolded ? '▶' : '▼';
    this.contentDOM.style.display = isFolded ? 'none' : 'block';
  }

  update(node, decorations) {
    if (node.type !== this.node.type) return false;
    this.node = node;
    this.updateFoldState();
    return true;
  }
}
```

### 2. 图片上传功能

```javascript
function imageUploadPlugin() {
  return new Plugin({
    props: {
      handleDOMEvents: {
        drop: (view, event) => {
          const files = Array.from(event.dataTransfer.files);
          const imageFiles = files.filter((file) =>
            file.type.startsWith('image/')
          );

          if (imageFiles.length > 0) {
            event.preventDefault();

            imageFiles.forEach((file) => {
              uploadImage(file).then((url) => {
                const pos = view.posAtCoords({
                  left: event.clientX,
                  top: event.clientY,
                });

                if (pos) {
                  const node = view.state.schema.nodes.image.create({
                    src: url,
                    alt: file.name,
                  });

                  const tr = view.state.tr.insert(pos.pos, node);
                  view.dispatch(tr);
                }
              });
            });

            return true;
          }

          return false;
        },

        paste: (view, event) => {
          const items = Array.from(event.clipboardData.items);
          const imageItems = items.filter((item) =>
            item.type.startsWith('image/')
          );

          if (imageItems.length > 0) {
            event.preventDefault();

            imageItems.forEach((item) => {
              const file = item.getAsFile();
              uploadImage(file).then((url) => {
                const node = view.state.schema.nodes.image.create({
                  src: url,
                  alt: 'Pasted image',
                });

                const tr = view.state.tr.replaceSelectionWith(node);
                view.dispatch(tr);
              });
            });

            return true;
          }

          return false;
        },
      },
    },
  });
}

async function uploadImage(file) {
  // 这里实现你的图片上传逻辑
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  return result.url;
}
```

### 3. Markdown 支持

````javascript
import { MarkdownParser, MarkdownSerializer } from 'prosemirror-markdown';

// 创建 Markdown 解析器
const markdownParser = new MarkdownParser(schema, {
  blockquote: { block: 'blockquote' },
  paragraph: { block: 'paragraph' },
  list_item: { block: 'list_item' },
  bullet_list: { block: 'bullet_list' },
  ordered_list: { block: 'ordered_list' },
  heading: {
    block: 'heading',
    getAttrs: (tok) => ({ level: +tok.attrGet('level') }),
  },
  code_block: { block: 'code_block' },
  fence: {
    block: 'code_block',
    getAttrs: (tok) => ({ language: tok.info || '' }),
  },
  hr: { node: 'horizontal_rule' },
  image: {
    node: 'image',
    getAttrs: (tok) => ({
      src: tok.attrGet('src'),
      title: tok.attrGet('title') || null,
      alt: (tok.children[0] && tok.children[0].content) || null,
    }),
  },
  hardbreak: { node: 'hard_break' },

  em: { mark: 'em' },
  strong: { mark: 'strong' },
  link: {
    mark: 'link',
    getAttrs: (tok) => ({
      href: tok.attrGet('href'),
      title: tok.attrGet('title') || null,
    }),
  },
  code_inline: { mark: 'code' },
});

// 创建 Markdown 序列化器
const markdownSerializer = new MarkdownSerializer(
  {
    blockquote: (state, node) => {
      state.wrapBlock('> ', null, node, () => state.renderContent(node));
    },
    code_block: (state, node) => {
      state.write('```' + (node.attrs.language || '') + '\n');
      state.text(node.textContent, false);
      state.ensureNewLine();
      state.write('```');
      state.closeBlock(node);
    },
    heading: (state, node) => {
      state.write(state.repeat('#', node.attrs.level) + ' ');
      state.renderInline(node);
      state.closeBlock(node);
    },
    horizontal_rule: (state, node) => {
      state.write(node.attrs.markup || '---');
      state.closeBlock(node);
    },
    bullet_list: (state, node) => {
      state.renderList(node, '  ', () => (node.attrs.bullet || '*') + ' ');
    },
    ordered_list: (state, node) => {
      let start = node.attrs.order || 1;
      let maxW = String(start + node.childCount - 1).length;
      let space = state.repeat(' ', maxW + 2);
      state.renderList(node, space, (i) => {
        let nStr = String(start + i);
        return state.repeat(' ', maxW - nStr.length) + nStr + '. ';
      });
    },
    list_item: (state, node) => {
      state.renderContent(node);
    },
    paragraph: (state, node) => {
      state.renderInline(node);
      state.closeBlock(node);
    },
    image: (state, node) => {
      state.write(
        '![' +
          state.esc(node.attrs.alt || '') +
          '](' +
          state.esc(node.attrs.src) +
          (node.attrs.title ? ' ' + state.quote(node.attrs.title) : '') +
          ')'
      );
    },
    hard_break: (state, node, parent, index) => {
      for (let i = index + 1; i < parent.childCount; i++) {
        if (parent.child(i).type != node.type) {
          state.write('\\\n');
          return;
        }
      }
    },
    text: (state, node) => {
      state.text(node.text);
    },
  },
  {
    em: { open: '*', close: '*' },
    strong: { open: '**', close: '**' },
    link: {
      open: '[',
      close: (state, mark) =>
        '](' +
        state.esc(mark.attrs.href) +
        (mark.attrs.title ? ' ' + state.quote(mark.attrs.title) : '') +
        ')',
    },
    code: { open: '`', close: '`' },
  }
);

// 使用示例
function createMarkdownEditor() {
  const view = new EditorView(document.getElementById('editor'), {
    state: EditorState.create({
      doc: markdownParser.parse('# Hello World\n\nThis is **bold** text.'),
      plugins: exampleSetup({ schema }),
    }),
  });

  // 获取 Markdown 内容
  function getMarkdown() {
    return markdownSerializer.serialize(view.state.doc);
  }

  // 设置 Markdown 内容
  function setMarkdown(markdown) {
    const doc = markdownParser.parse(markdown);
    view.updateState(
      EditorState.create({
        doc,
        plugins: view.state.plugins,
      })
    );
  }

  return { view, getMarkdown, setMarkdown };
}
````

### 4. 协作编辑

```javascript
import { collab, sendableSteps, getVersion } from 'prosemirror-collab';

function createCollaborativeEditor(version, clientID) {
  const plugins = exampleSetup({ schema }).concat([
    collab({ version, clientID }),
  ]);

  const view = new EditorView(document.getElementById('editor'), {
    state: EditorState.create({ schema, plugins }),
    dispatchTransaction: (tr) => {
      const newState = view.state.apply(tr);
      view.updateState(newState);

      // 发送步骤到服务器
      const sendable = sendableSteps(newState);
      if (sendable) {
        sendStepsToServer(sendable.version, sendable.steps, sendable.clientID);
      }
    },
  });

  // 接收来自服务器的步骤
  function receiveSteps(version, steps, clientIDs) {
    const tr = receiveTransaction(view.state, steps, clientIDs);
    if (tr) {
      view.dispatch(tr);
    }
  }

  return { view, receiveSteps };
}

function sendStepsToServer(version, steps, clientID) {
  fetch('/collab', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ version, steps, clientID }),
  });
}
```

## 常见问题和解决方案

### 1. 如何获取和设置编辑器内容？

```javascript
// 获取 HTML
function getHTML(view) {
  const div = document.createElement('div');
  const fragment = DOMSerializer.fromSchema(
    view.state.schema
  ).serializeFragment(view.state.doc.content);
  div.appendChild(fragment);
  return div.innerHTML;
}

// 设置 HTML
function setHTML(view, html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  const doc = DOMParser.fromSchema(view.state.schema).parse(div);
  view.updateState(
    EditorState.create({
      doc,
      plugins: view.state.plugins,
    })
  );
}

// 获取纯文本
function getText(view) {
  return view.state.doc.textContent;
}

// 获取 JSON
function getJSON(view) {
  return view.state.doc.toJSON();
}

// 设置 JSON
function setJSON(view, json) {
  const doc = view.state.schema.nodeFromJSON(json);
  view.updateState(
    EditorState.create({
      doc,
      plugins: view.state.plugins,
    })
  );
}
```

### 2. 如何处理焦点和选择？

```javascript
// 聚焦编辑器
view.focus();

// 设置选择
const tr = view.state.tr.setSelection(
  TextSelection.create(view.state.doc, 5, 10)
);
view.dispatch(tr);

// 获取选择的文本
const { from, to } = view.state.selection;
const selectedText = view.state.doc.textBetween(from, to);

// 选择全部
const allSelection = new AllSelection(view.state.doc);
view.dispatch(view.state.tr.setSelection(allSelection));
```

### 3. 如何验证和清理内容？

```javascript
// 验证文档
function validateDoc(doc, schema) {
  try {
    doc.check();
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// 清理文档（移除不符合 schema 的内容）
function cleanDoc(doc, schema) {
  const fragment = schema.topNodeType.createAndFill().content;
  return schema.topNodeType.create(null, fragment);
}
```

### 4. 如何处理大文档的性能？

```javascript
// 虚拟滚动插件（简化版）
const virtualScrollPlugin = new Plugin({
  view: (editorView) => {
    let scrollContainer = editorView.dom.parentElement;
    let visibleRange = { from: 0, to: editorView.state.doc.content.size };

    function updateVisibleRange() {
      const scrollTop = scrollContainer.scrollTop;
      const containerHeight = scrollContainer.clientHeight;

      // 计算可见范围（这里需要更复杂的逻辑）
      // ...

      // 只渲染可见部分
      if (visibleRange.from !== newFrom || visibleRange.to !== newTo) {
        visibleRange = { from: newFrom, to: newTo };
        // 触发重新渲染
      }
    }

    scrollContainer.addEventListener('scroll', updateVisibleRange);

    return {
      destroy: () => {
        scrollContainer.removeEventListener('scroll', updateVisibleRange);
      },
    };
  },
});
```

## 最佳实践

### 1. 项目结构

```
src/
├── editor/
│   ├── schema/
│   │   ├── nodes/
│   │   ├── marks/
│   │   └── index.js
│   ├── plugins/
│   │   ├── history.js
│   │   ├── keymap.js
│   │   └── index.js
│   ├── commands/
│   │   ├── formatting.js
│   │   ├── blocks.js
│   │   └── index.js
│   ├── views/
│   │   ├── ImageView.js
│   │   ├── TableView.js
│   │   └── index.js
│   └── index.js
└── components/
    ├── Editor.jsx
    ├── Toolbar.jsx
    └── MenuBar.jsx
```

### 2. 性能优化

```javascript
// 1. 使用 React.memo 避免不必要的重渲染
const Editor = React.memo(({ initialContent, onChange }) => {
  const editorRef = useRef();

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorView(/* ... */);
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return <div id='editor' />;
});

// 2. 防抖保存
const useDebouncedSave = (callback, delay) => {
  const timeoutRef = useRef();

  return useCallback(
    (...args) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );
};

// 3. 批量更新
function batchUpdates(view, updates) {
  let tr = view.state.tr;
  updates.forEach((update) => {
    tr = update(tr);
  });
  view.dispatch(tr);
}
```

### 3. 错误处理

```javascript
// 全局错误处理
const errorHandlingPlugin = new Plugin({
  filterTransaction: (tr, state) => {
    try {
      // 验证事务
      const newState = state.apply(tr);
      newState.doc.check();
      return true;
    } catch (error) {
      console.error('Transaction validation failed:', error);
      return false;
    }
  },

  appendTransaction: (transactions, oldState, newState) => {
    // 检查状态一致性
    try {
      newState.doc.check();
    } catch (error) {
      console.error('State inconsistency detected:', error);
      // 返回修复事务
      return oldState.tr.replaceWith(
        0,
        newState.doc.content.size,
        oldState.doc
      );
    }
    return null;
  },
});

// 视图错误处理
const view = new EditorView(element, {
  state,
  dispatchTransaction: (tr) => {
    try {
      const newState = view.state.apply(tr);
      view.updateState(newState);
    } catch (error) {
      console.error('Failed to apply transaction:', error);
      // 可以选择回滚或显示错误消息
    }
  },
});
```

### 4. 测试

```javascript
// 单元测试示例
import { EditorState } from 'prosemirror-state';
import { schema } from 'prosemirror-schema
```
