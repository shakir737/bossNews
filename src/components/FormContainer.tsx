import prisma from "@/utils/prismaDB";
import FormModal from "./FormModal";


export type FormContainerProps = {
  table:
    | "category"
    | "job"
    | "registration"
    | "jobDetail"
  type: "create" | "update" | "delete";
  data?: any;
  id?:  string;
  user?: any;
  jobId?: any;
};

const FormContainer = async ({ table, type, data, id, user, jobId}: FormContainerProps) => {
  let relatedData = {};


  if (type !== "delete") {
    switch (table) {
       case "jobDetail":
       
         const [companyList, categoryList ] = await prisma.$transaction([
          prisma.job.findMany(),
          prisma.category.findMany({
          where: { categoryType: "JOB"}
         }),
        ]);
       relatedData = { companies: companyList, categories: categoryList};
       break;

      //    case "job":
      //    const category = await prisma.category.findMany({
      //     where: {
      //           categoryType: "JOB"
      //       },
      //     select: { id: true, name: true},
      //   });
      //    relatedData = { category: category };
      //  break;
      //  case "teacher":
      //    const teacherSubjects = await prisma.subject.findMany({
      //      select: { id: true, name: true },
      //    });
      //    relatedData = { subjects: teacherSubjects };
      //  break;
      
       
       
    
        // const examLessons = await prisma.lesson.findMany({
        //   where: {
        //     ...("teacher" === "teacher" ? { teacherId: currentUserId! } : {}),
        //   },
        //   select: { id: true, name: true },
        // });
        // relatedData = { lessons: examLessons };
      

      default:
        break;
    }
  }

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
        user={user}
        jobId={jobId}
      />
    </div>
  );
};

export default FormContainer;
