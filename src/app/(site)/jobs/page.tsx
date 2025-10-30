import Breadcrumb from "@/components/Common/Breadcrumb";
import SingleJob from "@/components/Jobs/SingleJob";
import prisma from "@/utils/prismaDB";
import { Category, Job, JobDetail, Prisma } from "@prisma/client";


import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "All Available Jobs By Category",
  description: "All Available Jobs By Category",
};
  // Define your specific route parameters if needed
    type MyPageParams = {
    
    };
        // Define the props for your server component
    type Props = {
      params: Promise<MyPageParams>; // params are now promises
      searchParams: Promise<{ [key: string]: string  | undefined }>; // searchParams are also promises
    };
type JobList = JobDetail & { category: Category , job: Job } ;

export default async function page  ({ params, searchParams }: Props) {
   const resolvedParams = await params;
 const resolvedSearchParams = await searchParams;

const { page, ...queryParams } = resolvedSearchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.JobDetailWhereInput = {};

if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.jobDescription = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

const [data, count] = await prisma.$transaction([
     prisma.jobDetail.findMany({
       where: query,
       include: {
        category: true,
        job: true 
       },
     }),
     prisma.jobDetail.count({ where: query}),
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


