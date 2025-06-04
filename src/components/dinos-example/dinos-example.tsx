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
