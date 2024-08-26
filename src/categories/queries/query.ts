const entityName = 'category_entity';

export const categoriesQueries = {
  findAll({limit, page}) {
    console.log(limit, page)
    let options = '';
    if (limit) options += `limit ${limit} `;
    if (page) options += `offset ${limit * page}`;
    let query = `SELECT * FROM ${entityName} ORDER BY "createdAt" ASC ${options}`;
    console.log(query)
    return query;
  },
};
