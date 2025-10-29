"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, JSX, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";
import CategoryForm from "./forms/CategoryForm";


const JobForm = dynamic(() => import("./forms/JobForm"), {
  loading: () => <h1>Loading...</h1>,
});
const JobDetailForm = dynamic(() => import("./forms/JobDetailForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any,
    user?:any,
    jobId?: any
  ) => JSX.Element;
} = {
  job: (setOpen, type, data, relatedData) => (
    <JobForm
    type={type}
    data={data}
    setOpen={setOpen}
    relatedData={relatedData}
    />
  ),

  category:(setOpen,type, data, relatedData) => (
    <CategoryForm 
    type={type}
    setOpen={setOpen}
    data={data}
    relatedData={relatedData}/>
  ),
    jobDetail:(setOpen,type, data, relatedData) => (
    <JobDetailForm 
    type={type}
    setOpen={setOpen}
    data={data}
    relatedData={relatedData}/>
  ),
}

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
  user,
  jobId
}: FormContainerProps & { relatedData?: any }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
   
    const router = useRouter();

    // useEffect(() => {
    //   if (state.success) {
    //     toast(`${table} has been deleted!`);
    //     setOpen(false);
    //     router.refresh();
    //   }
    // }, [state, router]);

    return type === "delete" && id ? (
      <form className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" value={id} hidden />
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="bg-black text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](setOpen, type, data, relatedData,user, jobId)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>{
      table === "registration" ? (
        <>
      <button onClick={() => setOpen(true)} className="cursor-pointer flex justify-center gap-1 text-lg font-medium ml-2 py-3 px-10 transition duration-150 ease-in-out rounded-full hover:bg-semiblueviolet hover:text-white bg-Blueviolet" >
      Apply
      </button> </>
      ) : (
        <>
         <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
        </>
      )
    }
     
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
