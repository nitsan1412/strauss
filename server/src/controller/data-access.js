const sqlite3 = require("sqlite3");
const path = require("path");
const bcrypt = require("bcryptjs");

// Create a database connection to a SQLite database file
const db = new sqlite3.Database(
  path.join(__dirname, "..", "data", "../db/db.sqlite")
);

const createStringsForQueries = async (data) => {
  const fields = await Object.keys(data);
  const values = await Object.values(data);
  let fieldsString = "";
  let valuesString = "";
  await fields.forEach((field, index) => {
    fieldsString = fieldsString + (index !== 0 ? ", " + field : field);
    valuesString = valuesString + (index !== fields.length - 1 ? "?, " : "? ");
  });

  return { fields, values, fieldsString, valuesString };
};

exports.createItem = async (table, item) => {
  try {
    let newItem = item;
    if (table === "user") {
      const newPassword = await bcrypt.hash(item.password, 10);
      newItem = await { ...item, password: newPassword };
    }
    let { values, fieldsString, valuesString } = await createStringsForQueries(
      newItem
    );
    return await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO ${table} (${fieldsString}) VALUES (${valuesString})`,
        values,
        (err, res) => {
          if (err) {
            console.error("Error in findItem:", err);
            reject(err);
          } else {
            resolve("success");
          }
        }
      );
    });
  } catch (error) {
    console.error("Error in findItem:", error);
    throw error;
  }
};

exports.findItem = async (table, data) => {
  try {
    const { values, fieldsString, valuesString } =
      await createStringsForQueries(data);
    return await new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM ${table} WHERE ${fieldsString} = ${valuesString}`,
        values,
        (err, user) => {
          if (err) {
            console.error("Error in findItem:", err);
            reject(err);
          } else {
            resolve(user);
          }
        }
      );
    });
  } catch (error) {
    console.error("Error in findItem:", error);
    throw error;
  }
};

exports.count = async (table) => {
  try {
    await db.get(`SELECT COUNT(*) as total FROM ${table}`);
  } catch (error) {
    console.error("Error in findItem:", error);
    throw error;
  }
};

exports.getAllData = async (table, limit, offset) => {
  try {
    if (limit !== null) {
      return await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ${table} LIMIT ? OFFSET ?`, [limit, offset || 0]),
          (err, data) => {
            if (err) {
              console.error("Error in findItem:", err);
              reject(err);
            } else {
              resolve(data);
            }
          };
      });
    } else {
      return await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ${table}`),
          (err, data) => {
            if (err) {
              console.error("Error in getAllData:", err);
              reject(err);
            } else {
              resolve(data);
            }
          };
      });
    }
  } catch (error) {
    console.error("Error in findItem:", error);
    throw error;
  }
};

exports.deleteItem = (table, idField) => {
  db.get(`DELETE FROM ${table} WHERE ${Object.keys(idField)[0]} = ? `, [
    Object.values(idField)[0],
  ]).then((err, row) => {
    if (err) return err;
    return row;
  });
};
