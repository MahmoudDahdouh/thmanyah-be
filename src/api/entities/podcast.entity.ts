import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('podcasts')
export class Podcast {
  @PrimaryColumn({ type: 'bigint' })
  trackId: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  wrapperType: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  kind: string;

  @Column({ type: 'bigint', nullable: true })
  artistId: number;

  @Column({ type: 'bigint', nullable: true })
  collectionId: number;

  @Index()
  @Column({ type: 'varchar', length: 500 })
  trackName: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  artistName: string;

  @Index()
  @Column({ type: 'varchar', length: 500 })
  collectionName: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  collectionCensoredName: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  trackCensoredName: string;

  @Column({ type: 'text', nullable: true })
  artistViewUrl: string;

  @Column({ type: 'text', nullable: true })
  collectionViewUrl: string;

  @Column({ type: 'text', nullable: true })
  trackViewUrl: string;

  @Column({ type: 'text', nullable: true })
  feedUrl: string;

  @Column({ type: 'text', nullable: true })
  artworkUrl30: string;

  @Column({ type: 'text', nullable: true })
  artworkUrl60: string;

  @Column({ type: 'text', nullable: true })
  artworkUrl100: string;

  @Column({ type: 'text', nullable: true })
  artworkUrl600: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  collectionPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  trackPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  collectionHdPrice: number;

  @Index()
  @Column({ type: 'timestamptz', nullable: true })
  releaseDate: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  collectionExplicitness: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  trackExplicitness: string;

  @Column({ type: 'int', nullable: true })
  trackCount: number;

  @Column({ type: 'bigint', nullable: true })
  trackTimeMillis: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  currency: string;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: true })
  primaryGenreName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  contentAdvisoryRating: string;

  @Column({ type: 'jsonb', nullable: true })
  genres: { genreId: string; name: string }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
