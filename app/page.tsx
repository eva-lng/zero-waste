import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* hero section */}
      <section className="bg-primary-light px-6 py-12 text-center">
        {/* wrapper large */}
        <div className="mx-auto w-full max-w-[760px]">
          <p className="mb-5 text-center md:text-start">LOGO</p>
          {/* grid container */}
          <div className="grid md:grid-cols-2">
            <div className="md:text-start max-w-[300px] mx-auto">
              <hgroup>
                <h1 className="text-2xl md:text-3xl font-bold mb-4 max-w-[250px] md:max-w-[300px] mx-auto">
                  Stop wasting food, start tracking it
                </h1>
                <p className="text-sm md:text-base mb-5">
                  Track your inventory, act before things expire, and see
                  exactly how much you're wasting each month.
                </p>
              </hgroup>

              <div className="flex gap-3 flex-wrap">
                <Link href="/signup">
                  <button className="btn-primary w-full md:w-auto">
                    Get started
                  </button>
                </Link>
                <Link href="/login">
                  <button className="btn-outline w-full md:w-auto">
                    Log in
                  </button>
                </Link>
              </div>
            </div>

            <div className="hidden md:block self-start justify-self-center w-[230px] bg-card border rounded-lg p-4">
              <div className="flex justify-between border-b pb-1">
                <p className="text-[13px] font-semibold text-warning">
                  Expiring soon
                </p>
                <span className="text-xs font-medium">3 items</span>
              </div>
              <div className="text-xs flex justify-between pt-1.5">
                <span>Eggs</span>
                <span className="text-warning">Tomorrow</span>
              </div>
              <div className="text-xs flex justify-between pt-1.5">
                <span>Yoghurt</span>
                <span className="text-warning">In 2 days</span>
              </div>
              <div className="text-xs flex justify-between pt-1.5">
                <span>Eggs</span>
                <span className="text-warning">In 3 days</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
