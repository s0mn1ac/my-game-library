import { Platform } from './platform.model';
import { Esrb } from './esrb.model';
import { Genre } from './genre.model';
import { Store } from './store.model';
import { ParentPlatform } from './parent-platform.model';
import { StatusEnum } from '../enums/status.enum';
import { MetaScore } from './meta-score.model';
import { Developer } from './developer.model';
import { Publisher } from './publisher.model';
import { UserScore } from './user-score.model';

export class Game {

    id: number;
    name: string;
    slug: string;
    image: string;
    releaseDate: string;
    tba: boolean;
    metascore: MetaScore;
    avgPlaytime: number;
    screenshots: string[];
    esrb: Esrb;
    genres: Genre[];
    parentPlatforms: ParentPlatform[];
    platforms: Platform[];
    stores: Store[];
    description: string;
    dominantColor: string;
    saturatedColor: string;
    developers: Developer[];
    publishers: Publisher[];
    status: StatusEnum = StatusEnum.notStarted;
    score: UserScore;
    preferredPlatform: Platform;
    notes: string[] = [];

    constructor(result: any) {
        this.id = result.id;
        this.name = result.name;
        this.slug = result.slug;
        this.image = result.background_image;
        this.releaseDate = result.released;
        this.tba = result.tba;
        this.metascore = new MetaScore(result.metacritic);
        this.score = new UserScore(result.score ?? 5);
        this.avgPlaytime = result.playtime;
        this.screenshots = result.screenshots?.map((screenshot: any) => screenshot.image);
        this.esrb = result.esrb_rating != null ? this.buildEsrb(result.esrb_rating) : null;
        this.genres = this.buildGenres(result.genres);
        this.parentPlatforms = this.buildParentPlatforms(result.parent_platforms);
        this.platforms = this.buildPlatforms(result.platforms);
        this.stores = this.buildStores(result.stores);
        this.description = result.description;
        this.dominantColor = `#${result.dominant_color}`;
        this.saturatedColor = `#${result.saturated_color}`;
        this.developers = this.buildDevelopers(result.developers);
        this.publishers = this.buildPublishers(result.publishers);
        this.status = StatusEnum.notStarted;
    }

    private buildEsrb(esrbRaw: any): Esrb {
        const esrb: Esrb = new Esrb();
        esrb.id = esrbRaw.id;
        esrb.name = esrbRaw.name;
        esrb.slug = esrbRaw.slug;
        return esrb;
    }

    private buildGenres(genresRaw: any[]): Genre[] {
        const genres: Genre[] = [];
        genresRaw?.forEach((genreRaw: any) => {
            const genre: Genre = new Genre();
            genre.id = genreRaw.id;
            genre.name = genreRaw.name;
            genre.slug = genreRaw.slug;
            genre.image = genreRaw.image_background;
            genres.push(genre);
        });
        return genres;
    }

    private buildParentPlatforms(parentPlatformsRaw: any): ParentPlatform[] {
        const parentPlatforms: ParentPlatform[] = [];
        parentPlatformsRaw?.forEach((parentPlatformRaw: any) => {
            const parentPlatform: ParentPlatform = new ParentPlatform();
            parentPlatform.id = parentPlatformRaw.platform.id;
            parentPlatform.name = parentPlatformRaw.platform.name;
            parentPlatform.slug = parentPlatformRaw.platform.slug;
            parentPlatform.image = `assets/images/platforms/${parentPlatform.slug}`;
            parentPlatforms.push(parentPlatform);
        });
        return parentPlatforms;
    }

    private buildPlatforms(platformsRaw: any): Platform[] {
        const platforms: Platform[] = [];
        platformsRaw?.forEach((platformRaw: any) => {
            const platform: Platform = new Platform();
            platform.name = platformRaw.platform.name;
            platform.slug = platformRaw.platform.slug;
            platform.releaseDate = platformRaw.released_at;
            platforms.push(platform);
        });
        return platforms;
    }

    private buildStores(storesRaw: any): Store[] {
        const stores: Store[] = [];
        storesRaw?.forEach((storeRaw: any) => {
            const store: Store = new Store();
            store.id = storeRaw.store.id;
            store.name = storeRaw.store.name;
            store.slug = storeRaw.store.slug;
            store.domain = storeRaw.store.domain;
            store.image = storeRaw.store.image_background;
            stores.push(store);
        });
        return stores;
    }

    private buildDevelopers(developersRaw: any): Developer[] {
        const developers: Developer[] = [];
        developersRaw?.forEach((developerRaw: any) => {
            const developer: Developer = new Developer();
            developer.id = developerRaw.id;
            developer.name = developerRaw.name;
            developer.slug = developerRaw.slug;
            developers.push(developer);
        });
        return developers;
    }

    private buildPublishers(publishersRaw: any): Publisher[] {
        const publishers: Publisher[] = [];
        publishersRaw?.forEach((publisherRaw: any) => {
            const publisher: Publisher = new Publisher();
            publisher.id = publisherRaw.id;
            publisher.name = publisherRaw.name;
            publisher.slug = publisherRaw.slug;
            publishers.push(publisher);
        });
        return publishers;
    }

}
