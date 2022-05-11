import { Image } from "antd"
import { PlayCircle, PlusSquare, Trash } from "react-feather"
import { useRecoilValue, useSetRecoilState } from "recoil"
import {
  contextIdState,
  contextState,
  listeningHistoryState,
  toggleDeleted,
} from "../../recoil"
import {
  playerAddToQueue,
  playerPlayTrack,
  removeTracksFromPlaylist,
} from "../../services/Spotify"

const PlyrHistoryEntry = ({
  uri,
  name,
  artistNames,
  image,
  deleted,
  showDeleted,
}) => {
  const setListeningHistory = useSetRecoilState(listeningHistoryState)
  const contextId = useRecoilValue(contextIdState)
  const context = useRecoilValue(contextState)

  const spanClass = "whitespace-nowrap text-ellipsis overflow-hidden"
  let show = !deleted || showDeleted
  return (
    <div
      id="PlayerHistoryEntry"
      className={`flex gap-1 w-full px-1 overflow-hidden border rounded border-borderGrey transition-all duration-500 ${
        show ? "h-[54px] py-1 mb-1" : "h-0 mb-[-2px] opacity-0"
      }`}
    >
      <Image
        src={image}
        width={44}
        preview={false}
        alt="ListeningHistoryEntryImage"
      />
      <div className="flex flex-col flex-1 w-0">
        <span className={spanClass}>{name}</span>
        <span className={spanClass}>{artistNames.join(", ")}</span>
      </div>
      <div className="flex gap-1">
        {false && (
          <PlayCircle
            size={22}
            strokeWidth={1.2}
            className="self-center stroke-primary-300 cursor-pointer"
            onClick={() =>
              playerPlayTrack({ position: 0, context_uri: context })
            }
          />
        )}
        <PlusSquare
          size={22}
          strokeWidth={1.2}
          className="self-center stroke-primary-300 cursor-pointer"
          onClick={() => playerAddToQueue(uri, true)}
        />
        <Trash
          size={22}
          strokeWidth={1.2}
          className={`self-center stroke-red-800 ${
            deleted ? "grayscale" : "cursor-pointer"
          }`}
          onClick={() => {
            removeTracksFromPlaylist(contextId, [uri]).then(() =>
              setListeningHistory((history) => toggleDeleted(history, uri))
            )
          }}
        />
      </div>
    </div>
  )
}

export default PlyrHistoryEntry
