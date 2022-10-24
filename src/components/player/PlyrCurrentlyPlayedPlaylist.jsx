import { Typography } from "antd"
import { useRecoilValue } from "recoil"
import { fullJoinPlaylistState } from "../../recoil"
const { Text } = Typography

const StyledItem = ({ position, isPlaying }) => (
  <div
    className={`absolute rounded-t-full bottom-0 w-[3px] bg-spotify-green animate-music-playing`}
    style={{
      left: `${position * 5}px`,
      animationDelay: `${position * -934}ms`,
      animationPlayState: `${isPlaying ? "running" : "paused"}`,
    }}
  />
)
const PlyrCurrentlyPlayedPlaylist = () => {
  const fullJoinPlaylist = useRecoilValue(fullJoinPlaylistState)

  if (!fullJoinPlaylist) return null
  const { name, tracks, uri } = fullJoinPlaylist

  return (
    <div
      className="flex flex-row space-x-1 items-baseline hover:cursor-pointer"
      onClick={() => window.open(uri, "_self")}
    >
      <div className="relative w-5">
        {Array.from({ length: 4 }).map((_, pos) => (
          <StyledItem key={pos} position={pos} isPlaying={true} />
        ))}
      </div>
      <div className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[150px]">
        {name}
      </div>
      <Text keyboard type="secondary" className="whitespace-nowrap">
        {tracks.total} {`Track${tracks.total !== 1 ? "s" : ""}`}
      </Text>
    </div>
  )
}
export default PlyrCurrentlyPlayedPlaylist
