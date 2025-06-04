import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

const placeholderPlugin = new Plugin({
  state: {
    init() {
      return DecorationSet.empty;
    },
    apply(tr, set) {
      set = set.map(tr.mapping, tr.doc);
      const action = tr.getMeta(placeholderPlugin);
      if (action && action.add) {
        const widget = document.createElement('placeholder');
        const deco = Decoration.widget(action.add.pos, widget, {
          id: action.add.id,
        });
        set = set.add(tr.doc, [deco]);
      } else if (action && action.remove) {
        set = set.remove(
          set.find(undefined, undefined, (spec) => spec.id === action.remove.id)
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
