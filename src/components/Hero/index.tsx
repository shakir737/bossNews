import Image from "next/image";
import Link from "next/link";

export default async function Hero () {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden bg-primary pt-[120px] md:pt-[130px] lg:pt-[160px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4">
              <div
                className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-6 text-3xl font-bold text-white sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]">
                  AI Powered Job Search Plateform To Hire Right Persons For The Right Job.
                </h1>
                <p className="mx-auto mb-9 max-w-[600px] text-base font-medium text-white sm:text-lg sm:leading-[1.44]">
                  The main point of this AI powered application is to trained yourself in any skill
                  where you want to get success or apply for a job or prepare yourself for upcoming interviews.Through this
                  application you can create your own courses, no matter you are at any level of carrier
                  and prepare them at your own pace.
                </p>
                <ul className="mb-10 flex flex-wrap items-center justify-center gap-5">
                  <li>
                    <Link
                      href="/courses/create"
                      className="inline-flex items-center justify-center rounded-md bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2"
                    >
                      Create course Now
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/courses/demo"
                      target="_blank"
                      className="flex items-center gap-4 rounded-md bg-white/[0.12] px-6 py-[14px] text-base font-medium text-white transition duration-300 ease-in-out hover:bg-white hover:text-dark"
                    >
                      Book A Demo Class
                    </Link>
                  </li>
                </ul>

              
              </div>
            </div>

        
          </div>
        </div>
      </section>
    </>
  );
};


