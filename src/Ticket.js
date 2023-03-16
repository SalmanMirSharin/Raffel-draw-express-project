const shortid = require('shortid');

class Ticket{
    /**
     * Ticked constructor will receive username and price
     * @param {string} username 
     * @param {number} price 
     */
    constructor(username,price){
        this.id = shortid.generate();
        this.username = username;
        this.price = price;
        this.createdAt = new Data();
        this.updatedAt = new Data();
    }
}

module.exports = Ticket;
