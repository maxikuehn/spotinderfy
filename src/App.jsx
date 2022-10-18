import SpotifyLogin from "./components/SpotifyLogin"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { lazy, Suspense, useEffect } from "react"
import TopBar from "./components/TopBar"
import LoadingPage from "./views/LoadingPage"
import { EAppState } from "./types"
import {
  appLoadingState,
  appState,
  currentUserPlaylistsState,
  currentUserState,
  playerState,
  spotifyAuthState,
} from "./recoil"
import { checkVersion } from "./services/AppVersion"
import api from "./api"

const PlayerLayout = lazy(() => import("./views/PlayerLayout"))
const ConfiguratorLayout = lazy(() => import("./views/ConfiguratorLayout"))

const App = () => {
  const [appLoading, setAppLoading] = useRecoilState(appLoadingState)
  const app = useRecoilValue(appState)
  const setCurrentUserPlaylists = useSetRecoilState(currentUserPlaylistsState)
  const setCurrentUserProfile = useSetRecoilState(currentUserState)
  const setPlayer = useSetRecoilState(playerState)
  let loggedIn = !!useRecoilValue(spotifyAuthState)

  const initFetch = async () => {
    setAppLoading(true)
    setCurrentUserPlaylists((await api.playlist.currentUser()).items)
    setCurrentUserProfile(await api.user.profile())
    setPlayer(await api.player.get())
    setAppLoading(false)
  }

  useEffect(() => {
    if (!loggedIn) return
    initFetch()
    if (!checkVersion()) window.location.reload()
  }, [loggedIn, app])

  const renderSwitch = () => {
    switch (app) {
      case EAppState.Configuration:
        return <ConfiguratorLayout />
      case EAppState.Player:
        return <PlayerLayout />
    }
  }

  return (
    <div className="w-screen h-screen bg-background">
      {loggedIn ? (
        appLoading ? (
          <LoadingPage />
        ) : (
          <div className="flex flex-col h-full">
            <TopBar />
            <Suspense fallback={<LoadingPage />}>{renderSwitch()}</Suspense>
          </div>
        )
      ) : (
        <SpotifyLogin />
      )}
    </div>
  )
}

export default App
