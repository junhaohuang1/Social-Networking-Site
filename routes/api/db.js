var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'password',
  database : '6083project'
});

db.connect();

exports.sendFR = (sender_id, receiver_id, status) => {
    return db.query('INSERT INTO friendships (sender_id, receiver_id, status) VALUES (?,?,?) RETURNING *', [sender_id, receiver_id, status])
}



exports.acceptFR = (sender_id, receiver_id) => {
    return db.query(`UPDATE friendships
                    SET status = 2
                    WHERE status = 1
                    AND ((sender_id = ? AND receiver_id = ?)
                    OR (sender_id = ? AND receiver_id = ?))`, [sender_id, receiver_id, receiver_id, sender_id])
}

exports.rejectFR = (sender_id, receiver_id) => {
    return db.query(`UPDATE friendships
                    SET status = 5
                    WHERE status = 1
                    AND ((sender_id =? AND receiver_id = ?)
                    OR (sender_id = ? AND receiver_id = ?))`, [sender_id, receiver_id, receiver_id, sender_id])
}

exports.deleteFR = (sender_id, receiver_id) => {
    return db.query(`UPDATE friendships
                    SET status = 4
                    WHERE status = 2
                    AND ((sender_id = ? AND receiver_id = ?)
                    OR (sender_id = ? AND receiver_id = ?))`, [sender_id, receiver_id, receiver_id, sender_id])
}

exports.getUsersbyName = (name) => {
    return db.query('SELECT * FROM users WHERE first ILIKE '%?%' OR username ILIKE '%?%'', [name, name])
}

exports.listFR = (id) => {
    return db.query(`
        SELECT users.id, first, last, status, receiver_id, sender_id
        FROM friendships
        JOIN users
        ON (status = ? AND receiver_id = ? AND sender_id = users.id)
        OR (status = ? AND receiver_id = ? AND sender_id = users.id)
        OR (status = ? AND sender_id = ? AND receiver_id = users.id)
    `, [id, id, id, id, id, id])
}
