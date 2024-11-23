const db = require("../db/connect");
const util = require("util");
//const { default: axios } = require("axios");

const query = async (statement, values) => {
  return new Promise((resolve, reject) => {
    db.query(
      {
        sql: statement,
        values,
      },
      function (err, rows, fields) {
        // Connection is automatically released when query resolves
        if (err) {
          return reject(new Error(err));
        }
        return resolve(rows);
      }
    );
  });
};

// const query2 = async (statement, values) => {
//   return new Promise(async (resolve, reject) => {
//     try {

//       const res = await axios({
//         method: "post",
//         url: process.env.BRIDGE,
//         data: {
//           sql: statement,
//           values: values
//         },
//         headers: {
//           'Origin': 'https://impulse-backend-qltrc.digitalisnhoceantorensder.app',
//           'key': process.env.APIKEY
//         }

//       }).catch((err) => {
//         return reject(new Error(err.data));
//       });

//       return resolve(res.data.data);

//     } catch (error) {
//       return reject(new Error(error.message));
//     }

//   });
// };

db.getConnection = util.promisify(db.getConnection);

module.exports = { query, conn: db };

