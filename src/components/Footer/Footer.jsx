import { Image, Typography } from "antd"
import PlyrCurrentlyPlayedPlaylist from "./PlyrCurrentlyPlayedPlaylist"
import SpotifyLogo from "../../assets/images/Spotify_Logo_RGB_White.png"

const Footer = () => {
  return (
    <div id="foter" className="w-full h-fit px-4 py-3 z-10">
      <div className="flex items-end space-x-2 h-8">
        <PlyrCurrentlyPlayedPlaylist />
        <div className="flex-1" />
        <Image
          src={SpotifyLogo}
          alt="Spotify Logo"
          height={24}
          preview={false}
          draggable={false}
          className="cursor-pointer"
          onClick={() => window.open("https://spotify.com/", "_blank")}
        />
      </div>
    </div>
  )
}
export default Footer
