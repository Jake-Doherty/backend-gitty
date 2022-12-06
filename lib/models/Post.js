const pool = require('../utils/pool.js');

module.exports = class Post {
  id;
  detail;

  constructor(row) {
    this.id = row.id;
    this.detail = row.detail;
  }

  static async insert(post, userId) {
    const { rows } = await pool.query(
      `
		insert into
			posts (detail, user_id)
		values
			($1, $2)
		returning
			*
		`,
      [post.detail, userId]
    );
    return new Post(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(`
		select
			*
		from
			posts
		`);
    return rows.map((row) => new Post(row));
  }
};
