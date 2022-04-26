import { LeftOutlined } from "@ant-design/icons"
import { Button, Checkbox } from "antd"
import { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { historyOpenState, listeningHistoryState } from "../../recoil"
import PlyrHistoryEntry from "./PlyrHisroyEntry"

const PlyrHistory = () => {
  const listeningHistory = useRecoilValue(listeningHistoryState)
  const [historyOpen, setHistoryOpen] = useRecoilState(historyOpenState)

  const [showDeleted, setShowDeleted] = useState(false)

  return (
    <div
      className={`h-[calc(100vh-77px)] fixed z-10 top-[77px] left-0 transition-dimension duration-300 ${
        historyOpen ? "w-96" : "w-0"
      } overflow-hidden bg-background`}
    >
      <div id="sidebar" className="flex flex-col px-4 gap-2 h-full w-full p-2">
        <div className="flex">
          <Button
            size="small"
            icon={<LeftOutlined />}
            onClick={() => setHistoryOpen(false)}
            className="flex-1 text-left mr-8"
          ></Button>
          <span
            className="pr-2 text-right whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer"
            onClick={() => setShowDeleted(!showDeleted)}
          >
            gelöschte Tracks anzeigen
          </span>
          <Checkbox
            checked={showDeleted}
            onChange={(e) => setShowDeleted(e.target.checked)}
          />
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden custom-scrollbar h-full">
          {listeningHistory.map((e) => (
            <PlyrHistoryEntry {...e} key={e.uri} showDeleted={showDeleted} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlyrHistory
