import { Outlet } from "react-router";
export default function Home() {
  return (
    <>
      <header>
        <h1>Welcome to the Clubhouse!</h1>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <p>2026 AnLaxina</p>
      </footer>
    </>
  );
}
