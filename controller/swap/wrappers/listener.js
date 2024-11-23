const { query } = require('../../../model/query');
const { getPairInfo } = require('./helper');
const cron = require('node-cron');

const updatePair = async() => {
    try {
 
        //loop through active pairs

        const list = await query(`SELECT * FROM pair where active = ?`, [true]);
        //get current reserve
        for (let pair of list) {
            // Await each async operation within the loop
            const res = await getPairInfo(pair.address)
            //update DB
            await query(`UPDATE pair SET reserveA = ?, reserveB = ?, totalSupply = ? where address = ?`, [Number(res.reserve0), Number(res.reserve1), Number(res.total_supply), pair.address]).catch((e) => { throw Error(e.message) })
          }

        
    } catch (error) {
        console.log(error.message);
    }

    

}

cron.schedule('*/0.09 * * * *', () => {
    updatePair();
});