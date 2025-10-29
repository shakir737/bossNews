import Breadcrumb from "@/components/Common/Breadcrumb";
import SingleJob from "@/components/Jobs/SingleJob";
import prisma from "@/utils/prismaDB";
import { Category, Job, JobDetail } from "@prisma/client";


import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "All Available Jobs By Category",
  description: "All Available Jobs By Category",
};

type JobList = JobDetail & { category: Category , job: Job } ;

export default async function page  () {
  
const [data, count] = await prisma.$transaction([
     prisma.jobDetail.findMany({
       include: {
        category: true,
        job: true 
       },
     }),
     prisma.jobDetail.count(),
   ]);

  return (
    <>
      <Breadcrumb pageName="All Jobs" />

      <section className="pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            { 
              count > 0 ? (
                <>
                 {data.map((job: any, i:any) => (
              <div key={i} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <SingleJob jobDetail={job} />
              </div>
            ))}
                </>
              ) : (
                <div>
                  <span>No Jobs On Sellected Category</span>
                </div>
              )
            }
           
          </div>
        </div>
      </section>
    </>
  );
};


