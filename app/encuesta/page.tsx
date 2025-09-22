// src/app/page.tsx

import Footer from "../footer";
import Navbar from "../navbar";
import SatisfactionForm from "./SatisfactionForm";


export default function HomePage() {
  return (
    <main className="">
      <Navbar />
      <div className="py-48">

      <SatisfactionForm />
      </div>
    <Footer />
    </main>
  );
}