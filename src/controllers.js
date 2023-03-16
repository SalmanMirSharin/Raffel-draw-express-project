const ticketCollection = require('./tickets');

exports.sellSingleTicket = (req, res, next)=>{
    const {username, price} = req.body;
    const ticket = ticketCollection.create(username, price)
    res.status(201).json({
        message: 'Ticket created Successfully',
        ticket,

    });
}


exports.sellBulkTicket = (req, res, next)=>{
    const {username, price, quantity} = req.body;
    const tickets = ticketCollection.createBulk(username, price, quantity);
    res.status(201).json({
        message: 'Ticket created successfully',
        tickets,
    })

}


//Find tickets controller

exports.findAll = (req, res)=>{
    const tickets = ticketCollection.find();
    console.log({tickets})
    res.status(200).json({items: tickets, total: tickets.length})
}


exports.findById = (req, res)=>{
    const id = req.params.id;
    const ticket = ticketCollection.findById(id)
    if(!ticket){
        return res.status(404).json({message: '404 not found'})
    }
    res.status(200).json(ticket);
}


exports.findByUsername = (req, res)=>{
    const username = req.params.username;
    const tickets = ticketCollection.findByUsername(username)
    res.status(200).json({item: tickets, total: tickets.length})
}



// update controllers
exports.updateById = (req, res)=>{
    const id = req.params.id;
    const ticket = ticketCollection.updateById(id,req.body)
    if(!ticket){
        return res.status(404).json({message: '404 not found'})
    }
    res.status(200).json(ticket);
}


exports.updateByUsername = (req, res)=>{
    const username = req.params.username;
    const ticket = ticketCollection.updateBulk(username, req.body);
    res.status(200).json({item: ticket, total: ticket.length})

}



//delete Controllers

exports.deleteById = (req, res)=>{
    const id = req.params.id;
    const isDeleted = ticketCollection.deleteById(id);
    if(isDeleted){
        return res.status(204).send();
    }

    res.status(400).json({message: 'Delete oparation failed'})
    
}

exports.deleteByUsername = (req, res)=>{
    const username = req.params.username;
    ticketCollection.deleteBulk(username)
    res.status(204).send();

}


//Draw Controllers

exports.drawWinners = (req, res)=>{
    const wc = req.query.wc ?? 3;
    const winners = ticketCollection.draw(wc)
    res.status(200).json(winners)
}