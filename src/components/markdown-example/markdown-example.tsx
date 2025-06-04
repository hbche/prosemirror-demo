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
