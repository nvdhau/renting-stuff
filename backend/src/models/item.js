const db = require("../util/database");

module.exports = class Items {
    constructor() {
        // any
    }

    static findAll() {
        return db.execute('SELECT i.* FROM items i ORDER BY i.id DESC;');
    }

    static findByItemId(itemId) {
        return db.execute(
            `SELECT * FROM items i 
            WHERE i.id = ${itemId};`);
    }

    static addItem(params) {
        return db.execute(
            'INSERT INTO items (ownerId, name, description, `condition`, category, imageURLs, tags, lat, lng, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            ,
            [
                params.ownerId, params.name, params.description, params.condition, params.category,
                params.imageURLs, params.tags, params.lat, params.lng, params.price
            ]
        );
    }

    static editItem(params) {
      return db.execute(
        `UPDATE items SET ownerId = ?, name = ?, description = ?, \`condition\` = ?, category = ?, imageURLs = ?, tags = ?, lat = ?, lng = ?, price = ? 
        WHERE id = ?`,
        [
          params.ownerId, params.name, params.description, params.condition, params.category,
          params.imageURLs, params.tags, params.lat, params.lng, params.price, params.id
        ]);
    }

    static findAllItemsOfUser(userId){
        return db.execute(
            `SELECT * FROM items i 
            WHERE i.ownerId = '${userId}' ORDER BY i.id DESC;`);
    }

    static findWishlistOfUser(userId){
        return db.execute(`SELECT * FROM items WHERE id IN (
                SELECT itemId FROM wishlists WHERE ownerId = '${userId}' AND endDate >= CURDATE()
                ) AND isActive = 1;`);
    }
}
