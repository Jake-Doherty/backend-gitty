const pool = require('../utils/pool.js');

module.exports = class Post {
  id;
  detail;

  constructor(row) {
    this.id = row.id;
    this.detail = row.detail;
  }

  static async insert(post) {
    const { rows } = await pool.query(
      `
		insert into
			posts (detail)
		values
			($1)
		returning
			*
		`,
      [post.detail]
    );
    return new Post(rows[0]);
  }
};
