import { exampleSetup } from 'prosemirror-example-setup';
import { DOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { useEffect, useState } from 'react';
import startImageUpload from './start-image-upload';
import placeholderPlugin from './placeholder-plugin';

function ImageUploadExample() {
  const [view, setView] = useState<EditorView>();

  useEffect(() => {
    const view = new EditorView(document.querySelector('#editor'), {
      state: EditorState.create({
        doc: DOMParser.fromSchema(schema).parse(
          document.querySelector('#content')!
        ),
        plugins: exampleSetup({ schema }).concat(placeholderPlugin),
      }),
    });
    setView(view);

    console.log('Available nodes:', schema.spec.nodes.get('image'));
    console.log('Has image node:', !!schema.nodes.image);

    return () => view.destroy();
  }, []);

  return (
    <div>
      <div id='editor'>
        <div id='content'></div>
      </div>
      上传图片：
      <input
        type='file'
        id='file-input'
        onChange={(e) => {
          if (
            view &&
            view.state.selection.$from.parent.inlineContent &&
            e.target.files?.length
          ) {
            startImageUpload(view, e.target.files[0]);
            view.focus();
          }
        }}
      />
    </div>
  );
}

export default ImageUploadExample;
