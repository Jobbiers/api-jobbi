export const ratingsQuery = {
  findByProfessionalId(id: number) {
    let query = '';
    if (id) {
      query += `SELECT s.profesionalId, AVG(r.rating_value) AS promedio_rating
            FROM ratings r
            JOIN services s ON r.service_id = s.id
            WHERE s.profesionalId = ${id}
            GROUP BY s.profesionalId;`;
    }
    return query;
  },
};
