// src/utils/dateUtils.ts
export const getStartAndEndOfDay = (date: string): { startOfDay: Date, endOfDay: Date } => {
    const dateList = new Date(date);
    const startOfDay = new Date(Date.UTC(dateList.getUTCFullYear(), dateList.getUTCMonth(), dateList.getUTCDate()));
    const endOfDay = new Date(Date.UTC(dateList.getUTCFullYear(), dateList.getUTCMonth(), dateList.getUTCDate() + 1));
    
    return { startOfDay, endOfDay };
  };