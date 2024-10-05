'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Video {
  id: number;
  title: string;
  path: string;
}

interface LinkGenerationFormData {
  name: string;
  email: string;
  company: string;
  expiryValue: string;
  expiryUnit: 'minutes' | 'hours' | 'days';
}

const videos: Video[] = [
  { id: 1, title: "WMS Short Video", path: "/FinalVideoWMS.mp4" },
  { id: 2, title: "WMS Long Video", path: "/WMSVideo.mp4" },
];

const VideoCard: React.FC<{ video: Video; onSelect: () => void }> = ({ video, onSelect }) => (
  <Card className="w-[300px] cursor-pointer" onClick={onSelect}>
    <CardHeader>
      <CardTitle>{video.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <video width="100%" height="auto" controls>
        <source src={video.path} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </CardContent>
  </Card>
);

const LinkGenerationForm: React.FC<{ onSubmit: (data: LinkGenerationFormData) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<LinkGenerationFormData>({
    name: '',
    email: '',
    company: '',
    expiryValue: '',
    expiryUnit: 'minutes',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        name="email"
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        name="company"
        placeholder="Customer/Company Name"
        value={formData.company}
        onChange={handleChange}
        required
      />
      <div className="flex space-x-2">
        <Input
          name="expiryValue"
          type="number"
          placeholder="Set link expiry"
          value={formData.expiryValue}
          onChange={handleChange}
          required
          className="w-2/3"
        />
        <Select
          value={formData.expiryUnit}
          onValueChange={(value: 'minutes' | 'hours' | 'days') => setFormData({ ...formData, expiryUnit: value })}
        >
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="minutes">Minutes</SelectItem>
            <SelectItem value="hours">Hours</SelectItem>
            <SelectItem value="days">Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">Generate Link</Button>
    </form>
  );
};

const VideoSelection: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/videos');
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
        toast({
          title: "Error",
          description: "Failed to fetch videos. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchVideos();
  }, []);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleLinkGeneration = async (formData: LinkGenerationFormData) => {
    try {
      const response = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          videoId: selectedVideo?.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate link');
      }

      const data = await response.json();
      setGeneratedLink(data.link);
      toast({
        title: "Link generated successfully",
        description: "You can now copy and share the link.",
      });
    } catch (error) {
      console.error('Error generating link:', error);
      toast({
        title: "Error",
        description: "Failed to generate link. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Select a Video</h1>
      <div className="flex space-x-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onSelect={() => handleVideoSelect(video)} />
        ))}
      </div>
      {selectedVideo && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4">Generate Link</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate Video Link</DialogTitle>
            </DialogHeader>
            <LinkGenerationForm onSubmit={handleLinkGeneration} />
            {generatedLink && (
              <div className="mt-4">
                <h3 className="font-semibold">Generated Link:</h3>
                <p className="break-all">{generatedLink}</p>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedLink);
                    toast({
                      title: "Link copied",
                      description: "The link has been copied to your clipboard.",
                    });
                  }}
                  className="mt-2"
                >
                  Copy Link
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VideoSelection;