"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = (pageQuery, limitQuery) => {
    const page = parseInt(pageQuery, 10) || 1;
    const limit = parseInt(limitQuery, 10) || 10;
    const startIndex = (page - 1) * limit;
    return { page, limit, startIndex };
};
exports.pagination = pagination;
