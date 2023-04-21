export default {
  api: {
    baseUrl: 'https://api.spotify.com/v1',
    authUrl: 'https://accounts.spotify.com/api/token',
    clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
  },
  url: {
    new_releases: '/browse/new-releases',
    playlists: '/browse/featured-playlists',
    categories: '/browse/categories',
  },
}
