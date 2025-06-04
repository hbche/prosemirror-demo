# ProseMirror

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDIwOC4xIDIzOC4wIj48cGF0aCBkPSJNMTA0IDJBMTAyIDEwMiAwIDAgMCAyIDEwNGExMDIgMTAyIDAgMCAwIDEwMiAxMDIgMTAyIDEwMiAwIDAgMCAxMDItMTAyQTEwMiAxMDIgMCAwIDAgMTA0IDJ6bTAgMTQuOWE4Ny4xIDg3LjEgMCAwIDEgODcuMSA4Ny4xIDg3LjEgODcuMSAwIDAgMS04Ny4xIDg3LjFBODcuMSA4Ny4xIDAgMCAxIDE2LjkgMTA0IDg3LjEgODcuMSAwIDAgMSAxMDQgMTYuOXoiLz48cGF0aCBkPSJNMTQ3LjEgOTIuN2MtNi45IDgzLjkgMTAuOCAxMDMuNCAxMC44IDEwMy40cy01NS4xIDUuNS04Mi43LTEzLjRjLTMwLjUtMjAuOS0yNi4wLTY3LjUtMjUuOS05NC42LjEtMjguNCAyNS42LTQ1LjggNDkuOS00NS4zQzEyOC4zIDQzLjMgMTQ5LjQgNjQuNCAxNDcuMSA5Mi43eiIvPjxwYXRoIGQ9Ik04Mi4xIDEzOS41YzExLjMgMzYuMyA1MC42IDYyLjQgNTAuNiA2Mi40bDE4LjUtMS40eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik04Mi4xIDEzOS41YzMgMTMuMyAxNy45IDI5LjkgMzAuNCA0MS42IDI0LjggMjMuMiA0MiAyMi40IDg2IDU0LjctMTguMi01MS44LTE4LjgtNjItNDMuNS0xMDYuMS0yNC43LTQ0LTY3LjYtMjAuMy02Ny42LTIwLjNTNzkgMTI2IDgyLjEgMTM5LjN6Ii8+PHBhdGggZD0iTTEwOC45IDc2LjBzLTQuMC0xMS42LTE4LjAtMTEuNWMtMzAuMC4yLTI4LjggNTIuMSAxNi45IDUyLjAgMzkuNi0uMSAzOS4yLTQ5LjQgMTYuMS00OS42LTEwLjItLjItMTUuMCA5LjEtMTUuMCA5LjF6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTEwOS40IDk1LjBjMTAuOC4wIDIuMCAxNC45LS42IDIwLjktMS44LTguNC0xMC4yLTIwLjkuNi0yMC45ek05My4xIDgwLjFjLTUuNiAwLTEwLjIgNC41LTEwLjIgMTAuMiAwIDUuNiA0LjUgMTAuMiAxMC4yIDEwLjIgNS42IDAgMTAuMi00LjUgMTAuMi0xMC4yIDAtNS42LTQuNS0xMC4yLTEwLjItMTAuMnptMzAuNS0uMWMtNC44IDAtOC44IDQuNS04LjggMTAuMiAwIDUuNiAzLjkgMTAuMiA4LjggMTAuMiA0LjggMCA4LjgtNC41IDguOC0xMC4yIDAtNS42LTMuOS0xMC4yLTguOC0xMC4yeiIvPjwvc3ZnPg==" width="48" height="48" />

本项目是基于 vite 的 react-ts 木板创建的项目，用于学习 ProseMirror。

## react-ts vite 推荐配置

此模板提供了一个最小化的设置，以便在 Vite 中使用 React，并支持 HMR 和一些 ESLint
规则。

目前，有两个官方插件可用：

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)
  使用 [Babel](https://babeljs.io/) 进行快速刷新
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)
  使用 [SWC](https://swc.rs/) 进行快速刷新

## 扩展 ESLint 配置

如果我们正在开发生产应用程序，我们建议更新配置以启用类型感知的 lint 规则：

```js
export default tseslint.config({
  extends: [
    // 移除 ...tseslint.configs.recommended 并替换为此
    ...tseslint.configs.recommendedTypeChecked,
    // 或者，使用此配置以获得更严格的规则
    ...tseslint.configs.strictTypeChecked,
    // 可选地，添加此配置以获得风格化规则
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // 其他选项...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

我们还可以安装
[eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)
和
[eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)
以获得 React 特定的 lint 规则：

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    // 添加 react-x 和 react-dom 插件
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // 其他规则...
    // 启用其推荐的 TypeScript 规则
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

## 增加 Sass 编译

安装依赖

```bash
npm install sass --save-dev
```

## ProseMirror 概念

### 什么是 Schema

Schema 在 ProseMirror 中定义了文档的结构和内容模型，是一组约束。它规定了：

1. 节点类型（Node Types）：文档中可以包含哪些类型的节点（如段落、标题、列表等）
2. 标记类型（Mark Types）：可以应用于文本的格式化标记（如粗体、斜体、链接等）
3. 内容规则：每种节点可以包含什么样的子内容
4. 属性定义：节点和标记可以有哪些属性

#### Schema 的基本结构

```typescript
import { Schema } from 'prosemirror-model';

const mySchema = new Schema({
  nodes: {
    // 定义节点类型
    // 文档节点
    doc: {
      content: 'block+',
    },
    // 段落节点
    paragraph: {
      content: 'inline',
      group: 'block',
    },
    // 文本节点
    text: {
      group: 'inline',
    },
  },
  marks: {
    // 定义标记类型
    strong: {},
    em: {},
  },
});
```

#### 内容表达式

Schema 使用内容表达式来定义节点的内容规则：

1. `"block+"`-一个或多个块级元素
2. `"inline*"`-零个或多个行内元素
3. `"paragraph block*"`-一个段落后跟零个或多个块级元素
4. `"text*"`-零个或多个文本节点

#### Schema 的重要性

Schema 是 ProseMirror 编辑器的基础，它具有一些作用：

- 确保文档结构的一致性和有效性
- 定义了编辑器可以执行的操作
- 为序列化和反序列化提供规则
- 支持协同编辑时的冲突解决

通过合理设计 Schema，我们可以创建符合特定需求的富文本编辑器，确保用户只能创建符
合预期结构的文档内容。

### 什么是节点 NodeTypes

NodeTypes 定义了文档中可以存在的各种节点类型。每个节点类型都描述了：

1. 内容规则 content：该节点可以包含什么样的子内容
2. 属性 attrs：节点可以拥有的属性
3. 组归属 group：节点属于哪个组（用于内容表达式匹配）
4. 解析[parseDOM]和序列化[toDOM]规则：如何与 DOM 进行转换

#### 基本节点类型

在 ProseMirror 中，有几个基础的节点类型：

1. 文档节点（doc）

   ```typescript
   doc: {
     content: 'block+'; // 必须包含一个或多个块级元素
   }
   ```

2. 段落节点（paragraph）

   ```typescript
   paragraph: {
     content: 'inline*', // 可以包含零个或多个内联元素
     group: 'block', // 属于块级组
     parseDOM: [{tag: "p"}],
     toDOM(): {
       return [
         "p", 0
       ]
     }
   }
   ```

3. 文本节点（text）

   ```typescript
   text: {
     group: "inline", // 属于内敛组
   }
   ```

4. 标题节点（heading）

   ```typescript
   heading: {
     attrs: {level: {default: 1}}, // 有一个level属性
     content: "inline",
     group: "block",
     defining: true,
     parseDOM: [
       {tag: 'h1', attrs: {level: 1}},
       {tag: 'h2', attrs: {level: 2}},
       // ...更多级别
     ],
     toDOM(node) {
       return ["h" + node.attrs.level, 0]
     }
   }
   ```

#### 节点类型的属性

每个节点类型可以定义以下属性：

- content: 内容表达式，定义节点可以包含的子内容
- group: 节点所属的组名
- attrs: 节点的属性定义
- parseDOM: 从 DOM 解析的规则
- toDOM: 转换为 DOM 的规则
- defining: 是否为定义性节点（影响光标行为
- isolating: 是否隔离内容（阻止某些操作跨越边界）

#### content 表达式

Content Expressions 是在 Schema 的 `content` 字段中使用的字符串，用于控制某个节
点类型可以包含哪些有效的子节点序列。

##### 基本语法

1. 数量修饰

- `"paragraph"`: 恰好一个段落
- `"paragraph+"`: 一个或多个段落
- `"paragraph*"`: 零个或多个段落
- `"caption?"`: 零个或一个标题节点

2. 范围修饰

- `{2}`: 恰好两个
- `{1, 5}`: 1 到 5 个
- `{2,}`: 2 个或更多

3. 序列组合

- `"heading paragraph+"`: 点一个标题，然后一个或多个段落

4. 选择操作符

   - `"(paragraph | bluckquote)+"`: 一个或多个段落或引用块

#### 节点组 group

当多个节点类型需要在不同地方重复使用时，可以创建节点组：

```typescript
const groupSchema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: { content: 'text*', group: 'block' },
    blockquote: { content: 'block+', group: 'block' },
    text: {},
  },
});
```

在这个例子中：

- `"block+"`等价于 `"(paragraph | blockquote)+"`
- 通过 `group: "block"` 将段落和引用块归为一组

#### 重要注意事项

1. 顺序的重要性在选择表达式时，节点的顺序很重要，创建实例时会使用第一个类型：

   ```js
   // 正确的顺序
   {
     content: '(paragraph | blockquote)+';
   }

   // 错误的顺序可能导致栈溢出
   {
     content: '(blockquote | paragraph)+';
   }
   ```

2. 避免空节点建议块级内容的节点至少要求一个子节点：

   ```js
   doc: {content: "block+"}, // 好的做法
   blockquote: {content: "block+"}, // 好的做法
   ```

   这是因为浏览器会完全折叠空节点，使其难以编辑。

3. 内容校验

   - 高级概念（如 transforms）会检查内容有效性
   - 原始节点创建方法通常不检查，需要调用者确保输入合理
   - 可以使用 createChecked 方法或 check 方法来验证内容

#### toDOM - 节点到 DOM 的转换

toDOM 方法定义了如何将 ProseMirror 节点转换为 DOM 元素。

##### 基本语法

```js
toDOM(node) {
  // 形似 react node 结构，children是一个数组
  return [tagName, attributes, ...children]
}
```

##### 返回值格式

1. 简单元素
   ```JS
   paragraph: {
     toDOM() {
       return ["p", 0]
     }
   }
   // 0 表示子内容的插入位置
   ```
2. 带属性的元素
   ```JS
   heading: {
     toDOM(node) {
       return [`h${node.attrs.level}`, 0]
     }
   }
   ```
3. 复杂结构
   ```JS
   code_block: {
     toDOM(node) {
       return [pre, ["code", 0]]
     }
   }
   // 创建 <pre><code>内容</code></pre> 结构
   ```
4. 带样式和属性
   ```JS
   image: {
     toDOM(node) {
       return [img, {
         src: node.attrs.src,
         alt: node.attrs.alt,
         title: node.attrs.title
       }]
     }
   }
   ```

##### 实际示例

官方 dinos 示例

```typescript
const dinoNodeSpec: NodeSpec = {
  toDOM: (node) => [
    'img',
    {
      'dino-type': node.attrs.type,
      src: dinoUrlMap[node.attrs.type],
      title: node.attrs.type,
      class: 'dinosaur',
    },
  ],
};
```

#### parseDOM - DOM 到节点的解析

parseDOM 定义了如何将 DOM 元素解析为 ProseMirror 节点。

##### 基本语法

```js
parseDOM: [
  {
    tag: "selector",
    attrs: attributeSpec,
    getAttrs: function,
    // 其他选项...
  }
]
```

##### 解析规则

1. 简单标签匹配
   ```js
   paragraph: {
     parseDOM: [{ tag: 'paragraph' }];
   }
   ```
2. 多个标签匹配
   ```javascript
   heading: {
     parseDOM: [
       {
         tag: 'h1',
         attrs: { level: 1 },
       },
       {
         tag: 'h2',
         attrs: { level: 2 },
       },
       // ...
     ];
   }
   ```
3. 使用 getAttrs 函数
   ```js
   image: {
     parseDOM: [
       {
         tag: 'img[src]',
         getAttrs(dom) {
           return {
             src: dom.getAttribute('src'),
             alt: dom.getAttribute('alt'),
             title: dom.getAttrbute('title'),
           };
         },
       },
     ];
   }
   ```
4. 条件解析
   ```js
   parseDOM: [
     {
       tag: 'img[dino-type]',
       getAttrs(dom) {
         const type = dom.getAttributes('dino-type');
         return type && dinos.indexOf(type) > -1 ? { type } : false;
       },
     },
   ];
   ```

##### 高级选项

1. preserveWhitespace
   ```js
   code_block: {
     parseDOM: [
       {
         tag: 'pre',
         // 保留所有空白字符
         preserveWhitespace: 'full',
       },
     ];
   }
   ```
2. priority

   ```js
   parseDOM: [
     {
       tag: 'div',
       priority: 80, // 更高的优先级
       getAttrs(dom) {
         return dom.classList.contains('special') ? {} : false;
       },
     },
   ];
   ```

3. context
   ```js
   parseDOM: [
     {
       tag: 'li',
       context: 'bullet_list/|ordered_list/', // 表示只在列表上下文中匹配
     },
   ];
   ```

### 什么是 Marks

Marks 用于为**内联内容**添加**额外的样式或其他信息**，比如粗体、斜体、链接等。与
节点不同，标记是附加在文本上的格式化信息。

#### Mark 的基本结构

```js
const markSchema = new Schema({
  nodes: {
    doc: {content: 'block+'},
    paragraph: {content: 'text*', group: 'block', marks: "_"},
    heading：{content: "text*", group: 'block', marks: ""},
    text: {content: "inline*", inline: true}
  },
  marks: {
    strong: {},
    em: {}
  }
});
```

#### Mark 数据结构

```ts
marks: [Mark {type: MarkType, attrs: Object}, ...]
```

内联节点持有一组活跃的标记，这些标记以 `Mark` 实例数组的形式表示。

#### Mark 的配置选项

1. 基本属性

   ```js
   marks: {
    strong: {
      parseDOM: [
        {
          tag: 'strong'
        },
        {
          tag: 'b'
        }
      ],
      toDOM() {
        return ['strong', 0]
      }
    },
    em: {
      parseDOM: [
        {
          tag: 'i',
        },
        {
          tag: 'em'
        }
      ],
      toDOM() {
        return ['em', 0];
      }
    }
   }
   ```

2. 带属性的标记
   ```js
   marks: {
     link: {
       attrs: {
         href: {},
         title: {default: null},
       },
       inclusive: false,
       parseDOM: [{
         tag: 'a[href]',
         getAttrs(dom) {
           return {
             href: dom.getAttribute('href'),
             title: dom.getAttribute('title')
           };
         }
       }],
       toDOM(node) {
         let {href, title} = node.attrs;
         return [
           'a',
           {href, title},
           0
         ];
       }
     }
   }
   ```

#### Marks 的重要属性

1. `attrs` - 属性定义定义标记可以拥有的属性：
   ```js
   link: {
     attrs: {
       href: {},
       title: {default: null}
     }
   }
   ```
2. `inclusive` - 包容性决定当光标位于标记末尾时，该标记是否应该保持活跃：
   ```js
   link: {
     inclusive: false; // 链接标记通常不包容
   }
   ```
3. `excludes` - 排斥性确定该标记可以与哪些其他标记共存：
   ```js
   code: {
     excludes: '_'; // 排斥所有标签
   }
   ```
4. `group` - 分组将标记分组，便于管理：
   ```js
   strong: {
     group: 'fontStyle'
   },
   em: {
     group: 'fontStyle'
   }
   ```
5. `spanning` - 跨节点决定标记是否可以跨越多个相邻节点：
   ```js
   comment: {
     spanning: false; // 不允许跨节点
   }
   ```

#### 节点中的标记控制

可以通过节点的 `marks` 属性控制哪些标记可以应用：

```js
nodes: {
  paragraph: {
    content: 'text*',
    marks: '_' // 允许所有标记
  },
  heading: {
    content: 'text*',
    marks: "", // 不允许任何标记
  },
  code_block: {
    content: 'text*',
    marks: 'code' // 只允许 code 标记
  }
}
```

标记集合的解释：

- "\_" - 通配符，允许所有标记
- "" - 空字符串，不允许任何标记
- "strong em" - 只允许指定的标记（空格分隔）

#### 自定义标记示例

```js
const customMark = {
  highlight: {
    attrs: { color: { default: 'yellow' } },
    parseDOM: [
      {
        tag: 'mark',
        getAttrs: (dom) => {
          return {
            color: dom.style.backgroundColor || 'yellow',
          };
        },
      },
    ],
    toDOM(mark) {
      return [
        'mark',
        {
          styles: `background-color: ${mark.attrs.color}`,
        },
        0,
      ];
    },
  },
  strikethrough: {
    parseDOM: [{ tag: 's' }, { tag: 'del' }],
    toDOM() {
      return ['s', 0];
    },
  },
};
```

#### 重要特性

1. 叠加性：多个标记可以同时应用于同一文本
2. 范围性：标记可以跨越文本的任意范围
3. 属性化：标记可以携带额外的属性信息
4. 可控性：可以精确控制哪些节点允许哪些标记

Marks 为 ProseMirror 提供了灵活而强大的文本**格式化能力**，是构建富文本编辑器的
重要组成部分。

### toDOM 和 parseDOM 注意事项

1. 双向一致性：确保 toDOM 和 parseDOM 能够正确地相互转换
2. 属性处理：在 parseDOM 中正确提取属性，在 toDOM 中正确设置属性
3. 错误处理：在 getAttrs 中返回 false 可以拒绝匹配
4. 性能考虑：复杂的 getAttrs 函数可能影响解析性能

通过合理使用 toDOM 和 parseDOM，您可以实现 ProseMirror 文档与 HTML DOM 之间的无
缝转换，这对于编辑器的序列化、反序列化以及与外部系统的集成都非常重要。

#### 自定义节点类型

官方示例中定义 dinos 节点

```typescript
// 创建一个节点类型描述，用于定义 schema
const dinoNodeSpec: NodeSpec = {
  // 节点属性定义
  attrs: {
    type: {
      default: 'brontosaurus',
    },
  },
  //如果是内敛节点，需要设置为true
  inline: true,
  // 节点所属的组名
  group: 'inline',
  // 当节点被选中时，此类型的节点是否支持拖拽，默认为false
  draggable: true,

  // 节点到DOM转换规则：所有节点渲染为 带dino-tpye 属性的img元素
  toDOM: (node) => [
    'img',
    {
      'dino-type': node.attrs.type,
      //   src: `/img/dino/${node.attrs.type}.png`,
      src: dinoUrlMap[node.attrs.type],
      title: node.attrs.type,
      calss: 'dinoosaur',
    },
  ],
  // 从DOM解析时，将其转换成一个 dino 节点
  parseDOM: [
    {
      tag: 'image[dino-type]',
      getAttrs: (dom) => {
        let type = dom.getAttribute('dino-type');
        return type && dinos.indexOf(type) > -1 ? { type } : false;
      },
    },
  ],
};
```

自定义代码块节点 code_block

```typescript
const customSchema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: {
      content: 'inline',
      group: 'block',
    },
    // 自定义代码块节点
    code_block: {
      content: 'text*',
      marks: '',
      group: 'block',
      code: true,
      defining: true,
      parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
      toDOM() {
        return ['pre', ['code', 0]];
      },
    },
    text: { content: 'inline' },
  },
  marks: {
    // 标记定义...
  },
});
```

#### 节点类型的重要性

NodeTypes 决定了：

- 文档的结构层次
- 用户可以创建的内容类型
- 编辑器的行为和约束
- 内容的验证规则

通过合理定义 NodeTypes，我们可以创建符合特定需求的文档结构，确保内容的一致性和有
效性。

## ProseMirror 示例

安装必要依赖

```bash
npm i prosemirror-state prosemirror-view prosemirror-model prosemirror-schema-basic prosemirror-schema-list prosemirror-example-setup
```

### 基础示例

```ts
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
    // 声明 schema
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
      marks: schema.spec.marks,
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
```

### dinos 示例

```ts
import { buildMenuItems, exampleSetup } from 'prosemirror-example-setup';
import { Dropdown, MenuItem, type MenuElement } from 'prosemirror-menu';
import { Schema, type NodeSpec, DOMParser, NodeType } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { EditorState, type Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { useEffect } from 'react';
import brontosaurus from './img/dino/brontosaurus.png';
import pterodactyl from './img/dino/pterodactyl.png';
import stegosaurus from './img/dino/stegosaurus.png';
import triceratops from './img/dino/triceratops.png';
import tyrannosaurus from './img/dino/tyrannosaurus.png';

function DinosExample() {
  useEffect(() => {
    // 支持的恐龙类型
    const dinos: string[] = [
      'brontosaurus',
      'stegosaurus',
      'triceratops',
      'tyrannosaurus',
      'pterodactyl',
    ];
    const dinoUrlMap: { [key: string]: any } = {
      brontosaurus: brontosaurus,
      stegosaurus: stegosaurus,
      triceratops: triceratops,
      tyrannosaurus: tyrannosaurus,
      pterodactyl: pterodactyl,
    };

    // 创建一个节点类型描述，用于定义 schema
    const dinoNodeSpec: NodeSpec = {
      // 节点属性定义
      attrs: {
        type: {
          default: 'brontosaurus',
        },
      },
      //如果是内敛节点，需要设置为true
      inline: true,
      // 节点所属的组名
      group: 'inline',
      // 当节点被选中时，此类型的节点是否支持拖拽，默认为false
      draggable: true,

      // 节点到DOM转换规则：所有节点渲染为 带dino-tpye 属性的img元素
      toDOM: (node) => [
        'img',
        {
          'dino-type': node.attrs.type,
          //   src: `/img/dino/${node.attrs.type}.png`,
          src: dinoUrlMap[node.attrs.type],
          title: node.attrs.type,
          calss: 'dinoosaur',
        },
      ],
      // 从DOM解析时，将其转换成一个 dino 节点
      parseDOM: [
        {
          tag: 'image[dino-type]',
          getAttrs: (dom) => {
            let type = dom.getAttribute('dino-type');
            return type && dinos.indexOf(type) > -1 ? { type } : false;
          },
        },
      ],
    };

    // 创建一个包含 dinoNodeSpec 的 Schema
    const dinoSchema = new Schema({
      nodes: schema.spec.nodes.addBefore('image', 'dino', dinoNodeSpec),
      marks: schema.spec.marks,
    });

    const content = document.querySelector('#content')!;
    const startDoc = DOMParser.fromSchema(dinoSchema).parse(content);

    // 获取之前声明的 dino 节点类型
    const dinoType: NodeType = dinoSchema.nodes.dino;
    // 声明插入 dino 的函数
    const insertDino = (type: string) => {
      return function (
        state: EditorState,
        dispatch?: (tr: Transaction) => void
      ) {
        const { $from } = state.selection,
          index = $from.index();
        if (!$from.parent.canReplaceWith(index, index, dinoType)) {
          return false;
        }

        if (dispatch) {
          dispatch(state.tr.replaceSelectionWith(dinoType.create({ type })));
        }

        return true;
      };
    };

    const menu = buildMenuItems(dinoSchema);
    dinos.forEach((name) => {
      (menu.insertMenu as Dropdown & { content: MenuElement[] }).content.push(
        new MenuItem({
          title: `Insert ${name}`,
          label: name.charAt(0).toUpperCase() + name.slice(1),
          enable(state) {
            return insertDino(name)(state);
          },
          run(state, dispatch) {
            return insertDino(name)(state, dispatch);
          },
        })
      );
    });

    const view = new EditorView(document.querySelector('#editor'), {
      state: EditorState.create({
        doc: startDoc,
        plugins: exampleSetup({
          schema: dinoSchema,
          menuContent: menu.fullMenu,
        }),
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

export default DinosExample;
```

### markdown 示例

`prosemirror-markdown` 包定义了一个 ProseMirrors `chema`，可以准确地表达用
Markdown 表达的东西。它还带有一个解析器 [defaultMarkdownParser] 和序列化器
[defaultMarkdownSerializer]，可以将 `schema` 中的文档与 Markdown 文本进行转换。

```tsx
import { exampleSetup } from 'prosemirror-example-setup';
import {
  defaultMarkdownParser,
  defaultMarkdownSerializer,
  schema,
} from 'prosemirror-markdown';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { useEffect, useState } from 'react';
import './markdown-example.scss';

class MarkdownView {
  textarea: HTMLTextAreaElement;

  constructor(target: HTMLElement, content: string) {
    this.textarea = target.appendChild(document.createElement('textarea'));
    this.textarea.value = content;
  }

  get content() {
    return this.textarea.value;
  }

  focus() {
    this.textarea.focus();
  }

  destroy() {
    this.textarea.remove();
  }
}

class ProseMirrorView {
  view: EditorView;

  constructor(target: HTMLElement, content: string) {
    this.view = new EditorView(target, {
      state: EditorState.create({
        // 将markdown内容转换为ProseMirror的schema
        doc: defaultMarkdownParser.parse(content),
        plugins: exampleSetup({ schema }),
      }),
    });
  }

  get content() {
    // 将ProseMirror的schema转换为markdown内容
    return defaultMarkdownSerializer.serialize(this.view.state.doc);
  }

  focus() {
    this.view.focus();
  }

  destroy() {
    this.view.destroy();
  }
}

function MarkdownExample() {
  const [viewType, setViewType] = useState<'markdown' | 'wysiwym'>('markdown');
  const [view, setView] = useState<MarkdownView | ProseMirrorView>();

  const handleViewUpdate = (viewType: 'markdown' | 'wysiwym') => {
    setViewType(viewType);
    const place: HTMLElement = document.querySelector('#editor')!;
    if (view) {
      view.destroy();
    }

    if (viewType === 'markdown') {
      setView(new MarkdownView(place, view?.content || ''));
    } else {
      setView(new ProseMirrorView(place, view?.content || ''));
    }
  };

  useEffect(() => {
    const place: HTMLElement = document.querySelector('#editor')!;
    const view: MarkdownView | ProseMirrorView = new MarkdownView(
      place,
      (document.querySelector('#content')! as HTMLTextAreaElement).value || ''
    );
    setView(view);
    return () => view.destroy();
  }, []);

  return (
    <div className='markdown-example'>
      <div id='editor'>
        <div id='content'></div>
      </div>
      <div>
        <label>
          Markdown
          <input
            type='radio'
            name='view'
            value='markdown'
            checked={viewType === 'markdown'}
            onChange={() => handleViewUpdate('markdown')}
          />
        </label>
        <label>
          <input
            type='radio'
            name='view'
            value='wysiwym'
            checked={viewType === 'wysiwym'}
            onChange={() => handleViewUpdate('wysiwym')}
          />
          WYSIWYM
        </label>
      </div>
    </div>
  );
}

export default MarkdownExample;
```
