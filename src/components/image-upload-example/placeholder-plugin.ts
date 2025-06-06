import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

const placeholderPlugin = new Plugin({
  state: {
    init() {
      return DecorationSet.empty;
    },
    apply(tr, set) {
      // 调整装饰位置以适应事务所做的更改
      set = set.map(tr.mapping, tr.doc);
      // 查看交易是否添加或移除任何占位符
      let action = tr.getMeta(placeholderPlugin);
      if (action && action.add) {
        let widget = document.createElement('placeholder');
        let deco = Decoration.widget(action.add.pos, widget, {
          id: action.add.id,
        });
        set = set.add(tr.doc, [deco]);
      } else if (action && action.remove) {
        set = set.remove(
          set.find(undefined, undefined, (spec) => spec.id == action.remove.id)
        );
      }
      return set;
    },
  },
  props: {
    decorations(state) {
      return this.getState(state);
    },
  },
});

export default placeholderPlugin;
