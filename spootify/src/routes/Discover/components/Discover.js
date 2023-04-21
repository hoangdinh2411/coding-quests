import React, { Component } from 'react'
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock'
import '../styles/_discover.scss'
import { fetching } from '../../../api'
import config from '../../../config'

export default class Discover extends Component {
  constructor() {
    super()

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    }
    this.handleUpdateState = this.handleUpdateState.bind(this)
  }

  componentWillMount = () => {
    this.fetchMultiplyAPI()
  }

  fetchMultiplyAPI = async () => {
    const [newReleases_res, playlists_res, categories_res] = await Promise.all([
      fetching(
        config.url.new_releases +
          '?country=vn&limit=10&offset=5&locate=vn_VN&timestamp=2020-01-01T00:00:00'
      ),
      fetching(config.url.playlists + '?country=vn&limit=10&offset=5'),

      fetching(
        config.url.categories + '?country=vn&locate=vn_VN&limit=10&offset=5'
      ),
    ])

    this.handleUpdateState('newReleases', newReleases_res.data.albums.items)
    this.handleUpdateState('playlists', playlists_res.data.playlists.items)
    this.handleUpdateState('categories', categories_res.data.categories.items)
  }

  handleUpdateState = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
    const { newReleases, playlists, categories } = this.state
    return (
      <div className='discover'>
        <DiscoverBlock
          text='RELEASED THIS WEEK'
          id='released'
          data={newReleases}
        />
        <DiscoverBlock
          text='FEATURED PLAYLISTS'
          id='featured'
          data={playlists}
        />
        <DiscoverBlock
          text='BROWSE'
          id='browse'
          data={categories}
          imagesKey='icons'
        />
      </div>
    )
  }
}
