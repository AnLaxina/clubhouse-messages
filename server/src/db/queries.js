import pool from "./pool.js";

export async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
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
  } else if (adminCode.toLowerCase() === "chicken") {
    memberStatus = true;
    adminStatus = true;
  }

  await pool.query(
    `INSERT INTO users (first_name, last_name, username, password, membership_status, is_admin)
                    VALUES ($1, $2, $3, $4, $5, $6);`,
    [firstName, lastName, username, password, memberStatus, adminStatus],
  );
}
