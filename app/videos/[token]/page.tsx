"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface VideoData {
  videoPath: string;
  videoTitle: string;
  userName: string;
  company: string;
}

const VideoPlayer: React.FC = () => {
  const params = useParams();
  const token = params.token as string;
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:3000/api/validate/${token}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Link has expired or is invalid');
          }
          return response.json();
        })
        .then(data => {
          setVideoData({
            videoPath: `${data.frontendUrl}${data.videoPath}`,
            videoTitle: data.videoTitle,
            userName: data.userName,
            company: data.company
          });
        })
        .catch(err => {
          setError(err.message);
        });
    }
  }, [token]);

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  if (!videoData) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{videoData.videoTitle}</h1>
      <p className="mb-2">Shared by: {videoData.userName} from {videoData.company}</p>
      <video width="100%" height="auto" controls>
        <source src={videoData.videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;