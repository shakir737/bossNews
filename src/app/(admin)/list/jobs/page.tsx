
import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/utils/prismaDB";
import { ITEM_PER_PAGE } from "@/utils/settings";
import { Category, Job, JobDetail, Prisma} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
 
    // Define your specific route parameters if needed
    type MyPageParams = {
    
    };
        // Define the props for your server component
    type Props = {
      params: Promise<MyPageParams>; // params are now promises
      searchParams: Promise<{ [key: string]: string  | undefined }>; // searchParams are also promises
    };
type JobList = JobDetail & { category: Category , job: Job } ;

export default async function SubjectListPage  ({ params, searchParams }: Props)  {
 const resolvedParams = await params;
 const resolvedSearchParams = await searchParams;


  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Category",
      accessor: "category",
    },
    {
      header: "Company Name",
      accessor: "company",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (item: JobList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-2 p-3">{item.jobTitle}</td>
     
      <td className="hidden md:table-cell">
       {item.category.name}
      </td>
       <td className="hidden md:table-cell">
       {item.job.companyName}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {"admin" === "admin" && (
            <>
              <FormContainer table="jobDetail" type="update" data={item} />
              <FormContainer table="jobDetail" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

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
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
     }),
     prisma.jobDetail.count({ where: query }),
   ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Jobs</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
           
              <FormContainer table="jobDetail" type="create" />
           
          </div>
        </div>
      </div>
      {
        count > 0 ? (
          <>
           {/* LIST */}
       <Table columns={columns} renderRow={renderRow} data={data} /> 
      {/* PAGINATION */}
       <Pagination page={p} count={count} /> 
          </>
        ) : (
          <p>Empty Records</p>
        )
      }
    </div>
  );
};


