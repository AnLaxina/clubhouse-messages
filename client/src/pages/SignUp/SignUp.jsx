// TODO: Work on the pages now. Along with the Log in and View Messages stuff
import { Link } from "react-router";

export default function SignUp() {
  return (
    <section>
      <h2>Sign Up</h2>
      <form action="/sign-up" method="POST">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" required />

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" required />

        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <fieldset>
          <legend>Membership Status</legend>
          <p>
            To see the author and date of each message, enter the membership
            password
          </p>
          <p>
            <label htmlFor="memberCode">
              Membership Password{" "}
              <em>
                (Hint: A famous animal that starts with 'c' and ends in 'n')
              </em>
            </label>
            <input type="password" id="memberCode" name="memberCode" />
          </p>
          <p>
            <label htmlFor="adminCode">Admin Password</label>
            <input type="password" id="adminCode" name="adminCode" />
          </p>
        </fieldset>

        <div className="buttons">
          <Link to="/">Back</Link>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </section>
  );
}
