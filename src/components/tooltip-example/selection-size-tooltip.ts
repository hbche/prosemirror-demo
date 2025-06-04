import { Plugin, type EditorState } from 'prosemirror-state';
import type { EditorView } from 'prosemirror-view';

class SelectionSizeTooltip {
  tooltip: HTMLDivElement;

  constructor(view: EditorView) {
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'selection-size-tooltip';
    view.dom.parentElement?.appendChild(this.tooltip);

    this.update(view, null);
  }

  update(view: EditorView, lastState: EditorState | null) {
    let state = view.state;
    // 如果文档/选择没有变化，则不执行任何操作
    if (
      lastState &&
      lastState.doc.eq(state.doc) &&
      lastState.selection.eq(state.selection)
    ) {
      return;
    }

    // 如果选择为空，则隐藏工具提示
    if (state.selection.empty) {
      this.tooltip.style.display = 'none';
      return;
    }

    // 否则，重新计算定位并更新其内容
    this.tooltip.style.display = '';
    let { from, to } = state.selection;
    // 这些是屏幕坐标
    let start = view.coordsAtPos(from),
      end = view.coordsAtPos(to);
    // 获取工具提示框所在的盒子，以此为基础进行计算
    // offsetParent获取离tooltip最近的定位元素或 table、td、th、body元素。当元素的display设置为null时，offsetParent为null
    const box = this.tooltip.offsetParent?.getBoundingClientRect?.();
    if (!box) return;

    // 从选择的断电找到一个中心位置
    const left = Math.max((start.left + end.left) / 2, start.left + 3);
    this.tooltip.style.left = `${left - box.left}px`;
    this.tooltip.style.bottom = box.bottom - start.top + 'px';
    this.tooltip.textContent = `${to - from}`;
  }

  destroy() {
    this.tooltip.remove();
  }
}

const selectionSizePlugin = new Plugin({
    view(editorView) {
        return new SelectionSizeTooltip(editorView)
    }
})

export default selectionSizePlugin;
