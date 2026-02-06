import pool from "./pool.js";
import bcrypt from "bcryptjs";

export async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM users;");
  return rows;
}

export async function getUser(userId) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);
  return rows[0];
}

export async function addUser(
  firstName,
  lastName,
  username,
  password,
  memberCode,
  adminCode,
) {
  let memberStatus = false;
  let adminStatus = false;

  if (memberCode.toLowerCase() === "pikachu") {
    memberStatus = true;
  }
  if (adminCode.toLowerCase() === "chicken") {
    memberStatus = true;
    adminStatus = true;
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO users (first_name, last_name, username, password, membership_status, is_admin)
                    VALUES ($1, $2, $3, $4, $5, $6);`,
    [
      firstName,
      lastName,
      username.trim(),
      hashPassword,
      memberStatus,
      adminStatus,
    ],
  );
}

export async function getAllMessages() {
  const { rows } = await pool.query(`
    SELECT * FROM messages
    ORDER BY added_at DESC;`);
  return rows;
}

export async function addMessage(userId, title, text, addedAt = new Date()) {
  await pool.query(
    `INSERT INTO messages (user_id, title, text, added_at) VALUES ($1, $2, $3, $4);`,
    [userId, title, text, addedAt],
  );
}

export async function deleteMessage(messageId) {
  await pool.query(`DELETE FROM messages WHERE id = $1;`, [messageId]);
}

export async function editMessage(messageId, newTitle, newText) {
  await pool.query(
    `UPDATE messages
        SET title = $1,
            text = $2
        WHERE id = $3;`,
    [newTitle, newText, messageId],
  );
}

export async function editStatus(userId, memberCode, adminCode) {
  let memberStatus = false;
  let adminStatus = false;

  if (memberCode.toLowerCase() === "pikachu") {
    memberStatus = true;
  }
  if (adminCode.toLowerCase() === "chicken") {
    memberStatus = true;
    adminStatus = true;
  }

  await pool.query(
    `UPDATE users
                    SET membership_status = $1,
                        is_admin = $2
                    WHERE id = $3;`,
    [memberStatus, adminStatus, userId],
  );
}
