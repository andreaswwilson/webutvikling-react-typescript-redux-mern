"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../database");
const Router_1 = require("../Router");
Router_1.Router.instance.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield database_1.DB.Models.Movie.find({ _id: req.params.id });
        if (!movie)
            throw Error('No record found');
        res.status(200).json({ totalCount: 1, data: movie });
    }
    catch (error) {
        res.status(400).json({ id: req.params.id, msg: error.message });
    }
}));
Router_1.Router.instance.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {};
        if (req.query.title) {
            query['Title'] = new RegExp(req.query.title, 'i');
        }
        if (req.query.year) {
            query['Year'] = new RegExp(req.query.year, 'i');
        }
        let sort = {};
        if (req.query.sortByYear) {
            if (req.query.sortByYear === 'ascending') {
                sort = { Year: 1 };
            }
            if (req.query.sortByYear === 'descending') {
                sort = { Year: -1 };
            }
        }
        if (req.query.genre) {
            let re = '';
            let genres = req.query.genre;
            genres.forEach((genre) => {
                re += '(?=.*' + genre + ')';
            });
            query['Genre'] = new RegExp(re, 'i');
        }
        const totalCount = yield database_1.DB.Models.Movie.find(query)
            .countDocuments()
            .exec();
        let page = 1;
        if (req.query.page && typeof req.query.page === 'string') {
            page = parseInt(req.query.page);
            page = Math.max(1, page);
        }
        let limit = 4;
        if (req.query.limit && typeof req.query.limit === 'string') {
            limit = parseInt(req.query.limit);
        }
        const startIndex = Math.max((page - 1) * limit, 0);
        const movies = yield database_1.DB.Models.Movie.find(query)
            .limit(limit)
            .skip(startIndex)
            .sort(sort)
            .exec();
        if (!movies)
            throw Error('No items');
        res.status(200).json({ totalCount: totalCount, data: movies });
    }
    catch (e) {
        res.status(400).json({ msg: e.message });
    }
}));
Router_1.Router.instance.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedMovie = new database_1.DB.Models.Movie(req.body);
        const movie = yield database_1.DB.Models.Movie.replaceOne({ _id: req.params.id }, updatedMovie);
        if (movie) {
            res.status(200).json({ success: true });
        }
    }
    catch (e) {
        res.status(400).json({ msg: e.message, success: false });
    }
}));
exports.default = Router_1.Router.instance;
//# sourceMappingURL=movies.js.map