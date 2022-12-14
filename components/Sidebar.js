import { useState, useEffect } from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  console.log(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  console.log(playlists);

  // console.log(session);

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-gray-800 overflow-y-scroll h-screen scrollbar-hide  sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
      <div className="space-y-4">
        <button
          className="flex item-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <HomeIcon className="h-5 w-5" />
          <p>Logout</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>

        <button className="flex item-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-800" />

        <button className="flex item-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Library</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>My Playlists</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-800" />

        {/* Playlist custom ones */}
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            className="cursor-pointer hover:text-white"
            onClick={() => setPlaylistId(playlist.id)}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
