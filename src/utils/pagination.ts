
export const pagination = (pageQuery: string, limitQuery: string)=>{
    const page = parseInt(pageQuery as string, 10) || 1; // Página actual
    const limit = parseInt(limitQuery as string, 10) || 10; // Tamaño de página
    const startIndex = (page - 1) * limit;
    //obtener las 24 horas del dia
    //getFullYear():obtiene el año,getMonth():el mes,getDate():el dia
    //endofday tiene que ser un dia mas , ya que marca el limite de la fecha
    return { page, limit, startIndex  };
}