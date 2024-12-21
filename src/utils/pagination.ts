
export const pagination = (pageQuery: string, limitQuery: string)=>{
    const page = parseInt(pageQuery as string, 10) || 1; 
    const limit = parseInt(limitQuery as string, 10) || 10; 
    const startIndex = (page - 1) * limit;
    return { page, limit, startIndex  };
}