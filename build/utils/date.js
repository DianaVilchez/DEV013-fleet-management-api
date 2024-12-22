"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartAndEndOfDay = void 0;
// src/utils/dateUtils.ts
const getStartAndEndOfDay = (date) => {
    const dateList = new Date(date);
    const startOfDay = new Date(Date.UTC(dateList.getUTCFullYear(), dateList.getUTCMonth(), dateList.getUTCDate()));
    const endOfDay = new Date(Date.UTC(dateList.getUTCFullYear(), dateList.getUTCMonth(), dateList.getUTCDate() + 1));
    return { startOfDay, endOfDay };
};
exports.getStartAndEndOfDay = getStartAndEndOfDay;
