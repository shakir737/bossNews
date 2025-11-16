import Breadcrumb from "@/components/Common/Breadcrumb";
import SingleJob from "@/components/Jobs/SingleJob";
import UserSelectionForm from "@/components/Search";
import SelectField from "@/components/Select";
import prisma from "@/utils/prismaDB";
import { Category, Job, JobDetail, Prisma } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/utils/settings";

import { Metadata } from "next";
import Pagination from "@/components/Pagination";


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


export default async function page  ({ params, searchParams }: Props) {
   const resolvedParams = await params;
 const resolvedSearchParams = await searchParams;

const { page, ...queryParams } = resolvedSearchParams;
  const {city} = queryParams;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION
  const relationFilter: any = {};
  const query: Prisma.JobDetailWhereInput = {};
  
if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
           case "category":
            query.categoryId = { contains: value, mode: "insensitive" };
          
          break;
          case "city":
          // Assuming 'job' is a related model
          query.city = { contains: value, mode: "insensitive"};
          break;
          default:
            break;
        }
      }
    }
  }
const [data, count] = await prisma.$transaction([
     prisma.jobDetail.findMany({
       where:  query,
       include: {
        category: true,
        job: true 
       },
       take: ITEM_PER_PAGE,
       skip: ITEM_PER_PAGE * (p - 1),
     }),
     prisma.jobDetail.count({ where: query}),
   ]);

   const [category, categoryCount] = await prisma.$transaction([
     prisma.category.findMany(),
     prisma.category.count(),
   ]);
  return (
    <>
      <Breadcrumb pageName="All Jobs" />

      <section className="pb-10 pt-10 lg:pb-10 lg:pt-[12px]">
        <div>
         <UserSelectionForm categories={category}/>
        </div>
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
         { 
              count > 0 ? (
                <>
             <Pagination page={p} count={count} />
                </>
              ) : (
                <div>
                </div>
              )
            }
      </section>
    </>
  );
};


