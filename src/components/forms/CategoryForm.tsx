"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  CategorySchema,
  categorySchema
} from "@/utils/formValidationSchemas";
import { toast } from "react-toastify";
import { createCategory } from "@/utils/actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

const CategoryForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
  });

 // const [img, setImg] = useState<any>();s
  const [loading, setLoading] = useState(false);
      const [state, formAction] = useFormState(
        type === "create" ? createCategory : createCategory,
        {
        success: false,
        error: false,
       }
     );
     const router = useRouter();
  const onSubmit = (async (data:CategorySchema) => {

    setLoading(true);
    const responce = await createCategory(state, data);
    if(responce.success){
      toast(`Category has been ${type === "create" ? "created" : "updated"}!`)
      setOpen(false);
      router.refresh();
    } else {
      toast(`Error In ${type === "create" ? "creating" : "updatin"} Category!`)
      setOpen(false);
      router.refresh();
    }
   
  });

  // const router = useRouter();

  //  useEffect(() => {
  //     if (state.success) {
  //       toast(`Category has been ${type === "create" ? "created" : "updated"}!`);
  //       setOpen(false);
  //       router.refresh();
  //    }
  // }, [state]);

  
  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold flex justify-center items-center">
        {type === "create" ? "Category Creation Form" : "Category updation Form"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Category Data
      </span>
     
        
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Category Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Category Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors.description}
        />
       
      <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Category Type</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("categoryType")}
            defaultValue={data?.categoryType}
          >
            <option value="NEWS">NEWS</option>
            <option value="BLOG">BLOG</option>
            <option value="JOB">JOB</option>
          </select>
          {errors.categoryType?.message && (
            <p className="text-xs text-red-400">
              {errors.categoryType?.message.toString()}
            </p>
          )}
        </div>       
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
    </div>
      {/* {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}  */}
      <button className="bg-black text-white p-2 rounded-md" disabled={loading} >
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default CategoryForm;
