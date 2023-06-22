import { Excalidraw, LiveCollaborationTrigger, exportToCanvas } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";

export default function Whiteboard() {
  const [canvasUrl, setCanvasUrl] = useState<any>("");
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const initialData: any = {}
  useEffect(() => {
    console.log(excalidrawAPI);
  }, [excalidrawAPI])

  function changeApi(ExcalidriveElements: any) {
    console.log(ExcalidriveElements);
  }
  return (
    <>
      <button
        className="custom-button"
        onClick={async () => {
          if (!excalidrawAPI) {
            return
          }
          const elements = excalidrawAPI.getSceneElements();
          console.log(elements);
          if (!elements || !elements.length) {
            return
          }
          const canvas = await exportToCanvas({
            elements,
            appState: {
              ...initialData.appState,
              exportWithDarkMode: false,
            },
            files: excalidrawAPI.getFiles(),
            getDimensions: () => { return { width: 350, height: 350 } }
          });
          const ctx = canvas.getContext("2d");
          if (ctx !== null) {
            ctx.font = "30px Virgil";
            ctx.strokeText("My custom text", 50, 60);
          }

          setCanvasUrl(canvas.toDataURL());
        }}
      >
        Export to Canvas
      </button>
      <div className="export export-canvas">
        <img src={canvasUrl} alt="" />
      </div>
      <div style={{ height: "400px" }}>
        <Excalidraw onChange={changeApi} ref={(api) => setExcalidrawAPI(api)}
        />
      </div>
    </>
  )
}
