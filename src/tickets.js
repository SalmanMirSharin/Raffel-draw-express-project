const Ticket = require('./Ticket');
const { readFile, writeFile } = require('./utils');

const tickets = Symbol('tickets')

class TicketCollection{
    constructor(){
        (async function (){
            this[tickets] = await readFile();
        }.call(this));
    }
/**
 * 
 * @param {string} username 
 * @param {number} price 
 * @returns {Ticket}
 */
create(username,price){
    const ticket = new Ticket(username, price)
    this[tickets].push(ticket);
    writeFile(this[tickets]);
    return tickets;
}
/**
 * 
 * @param {string} username 
 * @param {number} price 
 * @param {number} quantity 
 * @returns 
 */
createBulk(username, price, quantity){
    const result = []
    for(let i=0; i<quantity; i++){
        const ticket = this.create(username, price)
        result.push(ticket);
    }
    writeFile(this[tickets]);
    return result;
}

find(){
    return this[tickets];
}

findByUsername(username){
    const ticket = this[tickets].filter(
        /**
         * @param {Ticket} ticket
         */
        (ticket)=>ticket.username ==username
    )
    return tickets;
}


findById(id){
    const ticket = this[tickets].find(
        /**
         * @param {Ticket} ticket
         */
        (ticket)=>ticket.id ==id
    )
    return tickets;
}



/**
 * 
 * @param {string} ticketId 
 * @param {{username:string, price: number}} ticketBody 
 * @returns {Ticket}
 */
updateById(ticketId, ticketBody){
    const ticket = this.findById(ticketId)
    if(ticket){
        ticket.username = ticketBody.username ?? ticket.username
        ticket.price = ticketBody.price ?? ticket.price;
    }
    writeFile(this[tickets]);

    return ticket;
}
/**
 * 
 * @param {sting} ticketId 
 * @param {{username: string, price: number}} ticketBody 
 * @returns {Ticket[]}
 */
updateBulk(username, ticketBody){
    const userTickets = this.findByUsername(username)
    const updatedTickets = userTickets.map(
        /**
         * @param {string} ticketId
         * @return {boolean}
         */
        (ticket) =>this.updateById(ticket.id, ticketBody)
    )
    writeFile(this[tickets]);
    return updatedTickets;
}



/**
 * 
 * @param {string} ticketId 
 * @return {boolean}
 */
deleteById(ticketId){
    const index = this[tickets].findIndex(
        /**
         * @param {Ticket} ticket
         */
        (ticket)=> ticket.id == ticketId
    )
    if(index==-1){
        return false
    }else{
        this[tickets].splice(index,1)
        writeFile(this[tickets]);
        return true;
    }

}

/**
 * 
 * @param {*} username 
 * @return {boolean[]}
 */
deleteBulk(username){
    const userTickets = this.findByUsername(username)
    const deletedResult = userTickets.map(
        /**
         * @param {Ticket} ticket
         */
        (ticket) => this.deleteById(ticket.id) 
    )
    writeFile(this[tickets]);
    return deletedResult;
}

/**
 * find winners
 * @param {number} winnerCount 
 */

draw(winnerCount){
    const winnerIndexes = new Array(winnerCount);

    let winnerIndex = 0;
    while(winnerIndex<winnerCount){
        let ticketIndex = Math.floor(Math.random()* this[tickets].length);
        
        if(!winnerIndex.includes(ticketIndex)){
            winnerIndex[winnerIndex++]= ticketIndex
            continue;
        }
    }

    const winners = winnerIndex.map(
        /**
         * @param {number} index
         */
        (index)=> this[tickets][index]
    );
    return winners;
}
}

const ticketCollection = new TicketCollection()
module.exports = ticketCollection;