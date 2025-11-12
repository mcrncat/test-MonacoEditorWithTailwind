import LeftPanel from "./panels/LeftPanel";
import CanvasPanel from "./panels/CanvasPanel";
import RightPanel from "./panels/RightPanel";

export default function MainLayout() {
  return (
    <div className="grid grid-cols-[16rem_1fr_18rem] flex-1 border-t border-gray-200">
      <LeftPanel />
      <CanvasPanel />
      <RightPanel />
    </div>
  );
}
