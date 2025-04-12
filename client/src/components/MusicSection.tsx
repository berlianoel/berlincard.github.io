import { motion } from 'framer-motion';

export default function MusicSection() {
  // Spotify playlist ID
  const spotifyPlaylistId = '37i9dQZF1DXcBWIGoYBM5M';

  return (
    <section 
      id="music"
      className="section mb-16 glass rounded-lg p-6 md:p-8"
    >
      <h2 className="font-cinzel text-3xl text-primary mb-6 flex items-center">
        <i className="fas fa-music mr-3"></i> My Playlist
      </h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="aspect-video rounded-lg overflow-hidden glass"
      >
        <iframe
          src={`https://open.spotify.com/embed/playlist/${spotifyPlaylistId}?utm_source=generator&theme=0`}
          width="100%" 
          height="380" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="rounded-lg"
        ></iframe>
      </motion.div>
    </section>
  );
}