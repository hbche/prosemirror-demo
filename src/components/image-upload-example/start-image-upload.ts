import type { EditorView } from 'prosemirror-view';
import placeholderPlugin from './placeholder-plugin';
import uploadFile from './upload-file';
import findPlaceholder from './find-placeholder';
import { schema } from 'prosemirror-schema-basic';

function startImageUpload(view: EditorView, file: File) {
  // 一个新的对象作为此上传的ID
  const id = {};

  const tr = view.state.tr;
  if (!tr.selection.empty) {
    return tr.deleteSelection();
  }
  tr.setMeta(placeholderPlugin, { add: { id, pos: tr.selection.from } });
  view.dispatch(tr);

  uploadFile(file).then(
    (url) => {
      const pos = findPlaceholder(view.state, id);

      if (!pos) return;

      const imageNode = schema.nodes.image.create({ src: url });
      view.dispatch(
        view.state.tr
          .replaceWith(pos, pos, imageNode)
          .setMeta(placeholderPlugin, { remove: { id } })
      );
    },
    () => {
      view.dispatch(tr.setMeta(placeholderPlugin, { remove: { id } }));
    }
  );
}
export default startImageUpload;
