module.exports = pgPool => {
    return {
        getUser(apiKey) {
            return pgPool.query(`
                select * from users
                where api_key = $1
            `,[apiKey]).then( res => res.rows[0]);
        }
    }
}