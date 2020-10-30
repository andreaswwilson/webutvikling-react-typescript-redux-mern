"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Movie {
    constructor() {
        const schema = new mongoose_1.default.Schema({
            Title: String,
            Year: String,
            Rated: String,
            Released: String,
            Genre: String,
            Director: String,
            Writer: String,
            Actors: String,
            Plot: String,
            Language: String,
            Country: String,
            Awards: String,
            Poster: String,
            Ratings: Array,
            Metascore: String,
            imdbRating: String,
            imdbVotes: String,
            imdbID: String,
            Type: String,
            DVD: String,
            BoxOffice: String,
            Production: String,
            Website: String,
            Favorite: Boolean,
            Runtime: String,
            Reviews: Array,
        });
        this._model = mongoose_1.default.model('movies', schema);
    }
    get model() {
        return this._model;
    }
}
exports.Movie = Movie;
//# sourceMappingURL=Movie.js.map