export default function Home() {
  return (
    <section className="bg-primary-light grid md:grid-cols-2">
      <div className="text-center md:text-start">
        <p className="mb-6">LOGO</p>
        <h1>Stop wasting food, start tracking it</h1>
        <p>
          Track your inventory, act before things expire, and see exactly how
          much you're wasting each month.
        </p>
        <div>
          <button className="btn-primary">Get started free</button>
          <button className="btn-outline">Log in</button>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center">
        <div className="card"></div>
      </div>
    </section>
  );
}
