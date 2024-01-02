import axios from "axios"
import { useEffect, useState } from "react"
import YouTube from "react-youtube"
import '../style.css'


export const YouTubeShorts = () => {

    const youTubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY
    const youTubeChannelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID

    const [videos, setVideos] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        
        axios.get(`https://www.googleapis.com/youtube/v3/search?key=${youTubeApiKey}&channelId=${youTubeChannelId}&part=snippet,id&order=date&maxResults=100&type=video&videoDuration=short`)
            .then((response) => {
                setVideos(response.data.items.filter(video => video.snippet.title.includes('#shorts')))
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    // const opts = {
    //     height: '390',
    //     width: '200'
    // }

    console.log(videos)

    return (
        <div className="shorts__container">
            {
                isLoading ? <p>Loading...</p> :
                videos.map((video) => (
                    <YouTube key={video.id.videoId} videoId={video.id.videoId} className="video__holder" />
                ))
            }
        </div>
    )
}
