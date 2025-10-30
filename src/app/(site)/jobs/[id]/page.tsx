import Newsletter from "@/components/Blog/Newsletter";
import Breadcrumb from "@/components/Common/Breadcrumb";
import SingleJob from "@/components/Jobs/SingleJob";
import prisma from "@/utils/prismaDB";

type Props = {
  params: Promise<{ id: string }>;
};


export default async function Post({ params }: Props) {
 const { id } = await params;
  
const [data, count, allJobs] = await prisma.$transaction([
     prisma.jobDetail.findMany({
       where: {id: id},
       include: {
        category: true,
        job: true 
       },
     }),
     prisma.jobDetail.count(),
     prisma.jobDetail.findMany(
      {
        include: {
        category: true,
        job: true 
       },
      }
     ),
   ]);

  return (
    <>
      <Breadcrumb pageName="Job Details" />

      <section className="pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4">
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 lg:w-8/12">
                  <div className="blog-details xl:pr-10">
                    <div>{
                      count > 0 ? (
                        <div className="flex flex-col">
                            <div  className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-black dark:hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">
                              {data[0].jobTitle}
                            </div>
                             <div className="flex  md:justify-between">
                             <div>
                                 Date: <span className="">
                                {data[0].openingDate?.getDate()}/10/2025
                                 </span>
                              </div>
                              <div>
                               Category: <span> {data[0].category?.name} </span>
                              </div>
                               <div>
                                 Company:  <span>{data[0].job?.companyName}</span>
                              </div>
                          </div>
                           <div>
                                   <p className="text-base text-body-color mt-3 dark:text-dark-6">{data[0].jobDescription}</p>
                           </div>
                           <div>
                                   <p className="text-base text-body-color mt-1 dark:text-dark-6">{data[0].jobEducation}</p>
                           </div>
                            <div>
                                   <p className="text-base text-body-color mt-1 dark:text-dark-6">{data[0].jobRequirment}</p>
                           </div>
                           <div>
                                   <p className="text-base text-body-color mt-1 dark:text-dark-6">{data[0].keyPoints}</p>
                           </div>
                            <div>
                                   <p className="text-base text-body-color mt-1 dark:text-dark-6">{data[0].niceToHave}</p>
                           </div>
                            <div>
                                   <p className="text-base text-body-color mt-1 dark:text-dark-6">{data[0].salary}</p>
                           </div>
                           <div>
                            <span>To Apply Against This Job Please Send Your Resume At: {data[0].job?.email}</span>
                           </div>
                        </div>
                      ) : (
                        <>
                        <span>No Jobs Are Listed Against This Category </span>
                        </>
                      )
                      }
                      </div>
                  </div>
                </div>
                <div className="w-full px-4 lg:w-4/12">
                  <div>
                    <Newsletter />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap">
            <div
              className="wow fadeInUp mt-14 w-full px-4"
              data-wow-delay=".2s"
            >
              <h2 className="relative pb-5 text-2xl font-semibold text-dark dark:text-white sm:text-[28px]">
                Related Articles
              </h2>
              <span className="mb-10 inline-block h-[2px] w-20 bg-primary"></span>
            </div>

             {count > 0 && allJobs.slice(0, 3).map((job:any, key) => (
              <div key={key} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <SingleJob jobDetail={job} />
              </div>
            ))} 
          </div>
        </div>
      </section>
    </>
  );
}
