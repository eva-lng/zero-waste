export default function Home() {
  return (
    <section className="bg-primary-light">
      <p className="mb-5 text-center md:text-start">LOGO</p>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="text-center md:text-start md:max-w-[300px]">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Stop wasting food, start tracking it
          </h1>
          <p className="text-sm md:text-base mb-5">
            Track your inventory, act before things expire, and see exactly how
            much you're wasting each month.
          </p>
          <div className="w-full">
            <button className="btn-primary mr-3">Get started</button>
            <button className="btn-outline">Log in</button>
          </div>
        </div>

        <div className="hidden md:block card max-w-300px">
          <div className="flex justify-between items-center border-b pb-1">
            <p className="card-title text-warning">Expiring soon</p>
            <span className="text-[13px] md:text-sm font-medium">3 items</span>
            <div className="card-body flex flex-col gap-2 pt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
