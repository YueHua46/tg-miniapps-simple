import { useRef } from "react";
import { useGlobalStore } from "../stores";

export default function MainButton() {
  const inp = useRef<HTMLInputElement>(null);
  const [setMainButtonText, triggerMainBtn] = useGlobalStore((state) => [
    state.setMainButtonText,
    state.triggerMainButton,
  ]);
  return (
    <div className="flex flex-col">
      <h2>Main Button</h2>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <label htmlFor="mb-inp">main button text:</label>
          <input id="mb-inp" type="text" ref={inp} className="flex-1" />
        </div>
        <button
          onClick={() => {
            if (inp.current) {
              setMainButtonText(inp.current.value);
            }
          }}
        >
          Change main button text
        </button>
        <button onClick={() => triggerMainBtn()}>
          Trigger main button visible
        </button>
      </div>
    </div>
  );
}
