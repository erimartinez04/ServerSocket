
const {io} = require('../index');
const Band = require('./models/band');
const Bands = require('./models/bands');

const bands = new Bands();
bands.addBand(new Band('Guns Roses'))
bands.addBand(new Band('Santana'))
bands.addBand(new Band('Linkin Park'))
bands.addBand(new Band('Eminem'))
bands.addBand(new Band('Queen'))
console.log(bands);
// Sockets
io.on('connection', client => {
    console.log('cliente conectado')

    client.emit('activeBands', bands.getBands()); 

    client.on('disconnect', () => { 
        console.log('cliente desconectado')
    });
    client.on('vote-band', (payload) => { 
        console.log(payload);
        bands.voteBand(payload.id);
        io.emit('activeBands', bands.getBands()); 

    });
    client.on('deleteBand', (payload) => { 
        console.log(payload);
        bands.deleteBand(payload.id);
        io.emit('activeBands', bands.getBands()); 

    });
    /* client.on('message', ( payload )=>{
        console.log('mensaje', payload);
        io.emit('message',{ admin:'Nuevo mensaje' })
    }) */
    client.on('addBand', ( payload )=>{
        console.log('banda: ', payload);
        bands.addBand(new Band(payload.name));
        io.emit('activeBands', bands.getBands()); 
    })
    client.on('Flutter_emit', ( payload )=>{
        console.log('Server_Receive', payload);
       
    })
  });