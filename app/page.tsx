import Link from "next/link";
import {
  TbPackage,
  TbClockExclamation,
  TbChartPie,
  TbBolt,
} from "react-icons/tb";

export default function Home() {
  return (
    <>
      {/* hero section */}
      <section className="bg-primary-light px-6 py-12 text-center">
        <div className="mx-auto w-full max-w-[800px] px-4">
          <div className="grid md:grid-cols-2 md:items-center">
            <div className="md:text-start max-w-[300px] mx-auto md:mx-0">
              <p className="mb-5 text-center md:text-start">LOGO</p>
              <hgroup>
                <h1 className="text-2xl md:text-3xl font-bold mb-4 max-w-[250px] md:max-w-[300px] mx-auto">
                  Stop wasting food, start tracking it
                </h1>
                <p className="text-sm md:text-base mb-5">
                  Track your inventory, act before things expire, and see
                  exactly how much you're wasting each month.
                </p>
              </hgroup>

              <div className="flex flex-col md:flex-row gap-3">
                <Link href="/signup" className="btn-primary w-full md:w-auto">
                  Get started
                </Link>
                <Link href="/login" className="btn-outline w-full md:w-auto">
                  Log in
                </Link>
              </div>
            </div>

            <div className="hidden md:block justify-self-center w-[230px] bg-card border rounded-lg p-4">
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

      {/* what can you do section */}
      <section className="px-4 py-8">
        <div className="mx-auto w-full max-w-[800px] px-4">
          <h2 className="section-title mb-5"> What you can do</h2>
          <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
            <li className="card flex items-start gap-4">
              <div className="text-primary-light-foreground bg-primary-light p-2 rounded-md">
                <TbPackage size={24} />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-semibold">
                  Full inventory control
                </h3>
                <p className="text-[13px] md:text-sm text-muted-foreground">
                  Track everything across fridge, freezer and panttry with
                  expiration dates and partial quantty support.
                </p>
              </div>
            </li>
            <li className="card flex items-start gap-4">
              <div className="text-destructive bg-destructive-light p-2 rounded-md">
                <TbClockExclamation size={24} />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-semibold">
                  See what's expiring
                </h3>
                <p className="text-[13px] md:text-sm text-muted-foreground">
                  Your dashboard highlights items expiring soon so you can act
                  before they go to waste.
                </p>
              </div>
            </li>
            <li className="card flex items-start gap-4">
              <div className="text-primary-light-foreground bg-primary-light p-2 rounded-md">
                <TbChartPie size={24} />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-semibold">
                  Waste insights
                </h3>
                <p className="text-[13px] md:text-sm text-muted-foreground">
                  See your monthly waste trends. Track consumed vs wasted over
                  time.
                </p>
              </div>
            </li>
            <li className="card flex items-start gap-4">
              <div className="text-primary-light-foreground bg-primary-light p-2 rounded-md">
                <TbBolt size={24} />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-semibold">
                  Quick actions
                </h3>
                <p className="text-[13px] md:text-sm text-muted-foreground">
                  Consume, discard, move or open items in seconds. Filter and
                  search your inventory instantly.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* how it works section */}
      <section className="px-4 pb-8">
        <div className="mx-auto w-full max-w-[800px] px-4">
          <h2 className="section-title mb-5">How it works</h2>
          <ol className="grid md:grid-cols-3 gap-6 md:gap-8">
            <li className="flex md:flex-col gap-4 md:gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-card text-sm md:text-base font-bold shrink-0">
                1
              </span>
              <div>
                <h3 className="text-sm md:text-base font-semibold md:mb-1">
                  Add your food
                </h3>
                <p className="text-[13px] md:text-sm text-muted-foreground">
                  Set the name, category, quantity and expiration date.
                </p>
              </div>
            </li>
            <li className="flex md:flex-col gap-4 md:gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-card text-sm md:text-base font-bold shrink-0">
                2
              </span>
              <div>
                <h3 className="text-sm md:text-base font-semibold md:mb-1">
                  Act before it expires
                </h3>
                <p className="text-[13px] md:text-sm text-muted-foreground">
                  Your dashboard shows what needs attention. Log what you
                  consume or waste.
                </p>
              </div>
            </li>
            <li className="flex md:flex-col gap-4 md:gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-card text-sm md:text-base font-bold shrink-0">
                3
              </span>
              <div>
                <h3 className="text-sm md:text-base font-semibold md:mb-1">
                  See your habits
                </h3>
                <p className="text-[13px] md:text-sm text-muted-foreground">
                  Monthly stats show where your waste is coming from so you can
                  improve over time.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
