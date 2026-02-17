import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { City, Offer, parseFacility } from '../types/index.js';
import { booleanFromString } from '../helpers/boolean-from-string.js';
import { parseHousing } from '../helpers/parse-housing.js';

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
          images: images.split(';'),
          isPremium: booleanFromString(isPremium),
          isFavorite: booleanFromString(isFavorite),
          rating: parseFloat(rating),
          type: parseHousing(type),
          rooms: parseInt(rooms, 10),
          guests: parseInt(guests, 10),
          price: parseInt(price, 10),
          facilities: facilities
            .split(';')
            .map((facility) => parseFacility(facility)),
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
