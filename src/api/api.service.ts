import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Podcast } from './entities/podcast.entity';
import { ItunesResponse, ItunesResult } from './interfaces/itunes.interface';
import { ITUNES_API_URL } from './constants/itunes.constants';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(Podcast)
    private readonly podcastRepository: Repository<Podcast>,
  ) {}

  async searchAll(term: string) {
    try {
      // search podcasts and save
      const podcastsPromise = this.searchAndStorePodcasts(term);

      // search episodes (no save)
      const episodesPromise = axios.get<ItunesResponse>(ITUNES_API_URL, {
        params: {
          term,
          media: 'podcast',
          entity: 'podcastEpisode',
          limit: 32,
        },
      });

      const [podcasts, episodesResponse] = await Promise.all([
        podcastsPromise,
        episodesPromise,
      ]);

      return {
        podcasts: podcasts,
        episodes: episodesResponse.data.results,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new HttpException('Failed to search', HttpStatus.BAD_GATEWAY);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async searchAndStorePodcasts(term: string): Promise<ItunesResult[]> {
    try {
      const response = await axios.get<ItunesResponse>(ITUNES_API_URL, {
        params: {
          term,
          media: 'podcast',
        },
      });

      const results = response.data.results;

      if (!results || results.length === 0) {
        return [];
      }

      // collect all podcasts with genres as JSON
      const podcastsToUpsert = results.map((result) => ({
        trackId: result.trackId,
        wrapperType: result.wrapperType,
        kind: result.kind,
        artistId: result.artistId,
        collectionId: result.collectionId,
        trackName: result.trackName,
        artistName: result.artistName,
        collectionName: result.collectionName,
        collectionCensoredName: result.collectionCensoredName,
        trackCensoredName: result.trackCensoredName,
        artistViewUrl: result.artistViewUrl,
        collectionViewUrl: result.collectionViewUrl,
        trackViewUrl: result.trackViewUrl,
        feedUrl: result.feedUrl,
        artworkUrl30: result.artworkUrl30,
        artworkUrl60: result.artworkUrl60,
        artworkUrl100: result.artworkUrl100,
        artworkUrl600: result.artworkUrl600,
        collectionPrice: result.collectionPrice,
        trackPrice: result.trackPrice,
        collectionHdPrice: result.collectionHdPrice,
        releaseDate: result.releaseDate
          ? new Date(result.releaseDate)
          : undefined,
        collectionExplicitness: result.collectionExplicitness,
        trackExplicitness: result.trackExplicitness,
        trackCount: result.trackCount,
        trackTimeMillis: result.trackTimeMillis,
        country: result.country,
        currency: result.currency,
        primaryGenreName: result.primaryGenreName,
        contentAdvisoryRating: result.contentAdvisoryRating,
        genres:
          result.genreIds && result.genres
            ? result.genreIds.map((genreId, index) => ({
                genreId,
                name: result.genres![index],
              }))
            : [],
      }));

      // bulk upsert podcasts
      await this.podcastRepository.upsert(podcastsToUpsert, ['trackId']);

      return results;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new HttpException('Failed to search', HttpStatus.BAD_GATEWAY);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
