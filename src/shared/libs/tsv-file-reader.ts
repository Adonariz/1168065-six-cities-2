import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { City, Facility, HousingType, Offer } from '../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim())
      .map((line) => line.split('\t'))
      .map(
        ([
          title,
          description,
          publishDate,
          city,
          previewImage,
          images,
          isPremium,
          isFavorite,
          rating,
          type,
          rooms,
          guests,
          price,
          facilities,
          name,
          email,
          location,
        ]) => ({
          title,
          description,
          publishDate: new Date(publishDate),
          city: City[city as keyof typeof City],
          previewImage,
          images: images.split(';').map((img) => img),
          isPremium: Boolean(isPremium),
          isFavorite: Boolean(isFavorite),
          rating: parseInt(rating, 10),
          type: HousingType[type as keyof typeof HousingType],
          rooms: parseInt(rooms, 10),
          guests: parseInt(guests, 10),
          price: parseInt(price, 10),
          facilities: facilities
            .split(';')
            .map((facility) => Facility[facility as keyof typeof Facility]),
          host: {
            name,
            email,
          },
          location: (() => {
            const [latitude, longitude] = location.split(';');
            return {
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            };
          })(),
        }),
      );
  }
}
