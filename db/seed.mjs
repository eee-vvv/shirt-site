import pg from 'pg'
import dbSecrets from './dbSecrets.js'

const { Client } = pg;
const clientSecrets = dbSecrets

const choose = (arr) => {
    return arr[Math.floor(Math.random() * (arr.length))];
}

const nameOptions1 = ['Off-Beat ','Virtue Signaling ', 'Alt ', 'Post-Ironic ', 'Self-Conscious ', 'Hand-Crafted ', 'Equity-Free ', 'Just Dropped: '];
const nameOptions2 = ['T-Shirt','Novelty Shoelace', 'Toteless Bag', 'Portable Olive Holder', ';DROP TABLE;'];
const measurementOptions1 = ['Disconcertingly ', 'Ironically ', 'Effortlessly ', 'Exactly ', 'Uncomfortably ', 'Overton-Window-Pushingly '];
const measurementOptions2 = ['Small', 'Medium', 'Large', 'Saggy', 'Snug', 'Floppy', 'Constricting'];



const randProduct = () => {
    const desc = `This is the number ${Math.floor(Math.random() * 1000000)} description in the world.`
    return (
        {
            'name' : choose(nameOptions1) + choose(nameOptions2),
            'price' : Math.floor(Math.random() * 20000),
            'measurements' : choose(measurementOptions1) + choose(measurementOptions2),
            'description' : desc,
            'sold' : choose([true, false]),
            'imagesId' : (Math.random() + 1).toString(36).substring(7)   
        }
    )
}


async function seed(numProducts) {
    try {

        const client = new Client(clientSecrets());

        await client.connect();

        await client.query(`DROP TABLE IF EXISTS product;`)

        await client.query(`CREATE TABLE product (
            id serial PRIMARY KEY,
            name varchar(500),
            price integer,
            measurements varchar(500),
            description text,
            sold boolean,
            imagesId varchar(5004)
            );`);
        
        for (let num = 0; num < numProducts; num ++){
            let p = randProduct();
            let values = [p.name, p.price, p.measurements, p.description, p.sold, p.imagesId]
            await client.query(
                `INSERT INTO product (
                name,
                price,
                measurements,
                description,
                sold,
                imagesId
                )
                VALUES ($1, $2, $3, $4, $5, $6)
                ;`, 
                values);
        }
        
        const res = await client.query(`SELECT * from product`);
        console.log(res.rows)
        await client.end(); 

    } catch(e) {

        console.log(e)

    }
}
seed(10);