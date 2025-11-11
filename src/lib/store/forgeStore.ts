import { create } from "zustand";

type ForgeState = {
  editorRef?: any;
  setEditor: (ref: any) => void;
  selectedNode?: { id: string; text?: string };
  selectNode: (node: { id: string; text?: string }) => void;
  updateNode: (id: string, patch: any) => void;
};

export const useForgeStore = create<ForgeState>((set, get) => ({
  setEditor: (ref) => set({ editorRef: ref }),
  selectNode: (node) => set({ selectedNode: node }),
  updateNode: (id, patch) => {
    const editor = get().editorRef;
    if (!editor) return;
    const html = editor.getValue();
    // ここに文字列操作ロジックを実装してMonacoへ反映
    const updated = html; // 仮
    editor.setValue(updated);
  },
}));
