
import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/utils/prismaDB";
import { ITEM_PER_PAGE } from "@/utils/settings";
import { Category, Prisma} from "@prisma/client";
import Image from "next/image";
 // Define your specific route parameters if needed
    type MyPageParams = {
    
    };
        // Define the props for your server component
    type Props = {
      params: Promise<MyPageParams>; // params are now promises
      searchParams: Promise<{ [key: string]: string  | undefined }>; // searchParams are also promises
    };

type CategoryList = Category 

export default async function CategoryListPage   ({ params, searchParams }: Props)  {
 const resolvedParams = await params;
 const resolvedSearchParams = await searchParams;



  const columns = [
    {
      header: "Category Type",
      accessor: "categoryType",
      className: "hidden md:table-cell ml-5",
    },
    {
      header: "Category Name",
      accessor: "name",
    },
    {
      header: "Category Description",
      accessor: "description",
      className: "hidden md:table-cell ml-5",
    }, 
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (item: CategoryList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
        <td className="hidden md:table-cell">
       {item.categoryType}
      </td>

      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">
       {item.description}
      </td>
        
      <td>
        <div className="flex items-center gap-2">
          {"admin" === "admin" && (
            <>
              <FormContainer table="category" type="update" data={item} />
              <FormContainer table="category" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = resolvedSearchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.CategoryWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

   const [data, count] = await prisma.$transaction([
     prisma.category.findMany({
       where: query,
     
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
     }),
     prisma.category.count({ where: query }),
   ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Categories</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
           
              <FormContainer table="category" type="create" />
           
          </div>
        </div>
      </div>
      { count > 0 ? (
        <>
         {/* LIST */}
       <Table columns={columns} renderRow={renderRow} data={data} /> 
      {/* PAGINATION */}
       <Pagination page={p} count={count} /></>
      ) : (
        <p>No Data found</p>
      )

      }
      
    </div>
  );
};


