import type { EditorState } from 'prosemirror-state';
import placeholderPlugin from './placeholder-plugin';

/**
 * 获取给定ID的占位符的当前位置信息
 *
 * @param state
 * @param id
 * @returns
 */
function findPlaceholder(state: EditorState, id: any) {
  const decos = placeholderPlugin.getState(state);
  const found = decos?.find(undefined, undefined, (spec) => spec.id === id);

  return found?.length ? found[0].from : undefined;
}

export default findPlaceholder;
