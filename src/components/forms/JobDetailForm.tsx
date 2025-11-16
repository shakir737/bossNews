"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { JobDetailSchema, jobDetailSchema} from "@/utils/formValidationSchemas";
import { createJob, createJobDetail, updateJobDetail} from "@/utils/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const JobForm = ({
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
  } = useForm<JobDetailSchema>({
    resolver: zodResolver(jobDetailSchema),
  });

  // AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, formAction] = useFormState(
    type === "create" ? createJobDetail : updateJobDetail,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((result) => {
    formAction(result);
    if(type === "update"){
     const id = data.id
     const updateData = {...result, id};
     formAction(updateData);
    }
  
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Job has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { companies, categories } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold flex items-center justify-center">
        {type === "create" ? "Create A New Job" : "Update The Job"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="job Title"
          name="jobTitle"
          defaultValue={data?.jobTitle}
          register={register}
          error={errors?.jobTitle}
        />
         <InputField
          label="job Description"
          name="jobDescription"
          defaultValue={data?.jobDescription}
          register={register}
          error={errors?.jobDescription}
        />
         <InputField
          label="job Education"
          name="jobEducation"
          defaultValue={data?.jobEducation}
          register={register}
          error={errors?.jobEducation}
        />
        <InputField
          label="Job Requirement"
          name="jobRequirment"
          defaultValue={data?.jobRequirment}
          register={register}
          error={errors?.jobRequirment}
        />
        <InputField
          label="Job Main Point"
          name="keyPoints"
          defaultValue={data?.keyPoints}
          register={register}
          error={errors?.keyPoints}
        />
        <InputField
          label="nice To Have"
          name="niceToHave"
          defaultValue={data?.niceToHave}
          register={register}
          error={errors?.niceToHave}
        />
        
         <InputField
          label="Salary"
          name="salary"
          defaultValue={data?.salary}
          register={register}
          error={errors?.salary}
        />
        <InputField
          label="City"
          name="city"
          defaultValue={data?.city}
          register={register}
          error={errors?.city}
        />
       <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Job Category</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("categoryId")}
            defaultValue={data?.categoryId}
          >
            {categories.map(
              (category: { id: string; name: string; }) => (
                <option
                  value={category.id}
                  key={category.id}
                  selected={data && category.id === data.categoryId}
                >
                  {category.name }
                </option>
              )
            )}
          </select>
          {errors.categoryId?.message && (
            <p className="text-xs text-red-400">
              {errors.categoryId.message.toString()}
            </p>
          )}

      </div>
      <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Company</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("jobId")}
            defaultValue={data?.jobId}
          >
            {companies.map(
              (company: { id: string;  companyName: string; }) => (
                <option
                  value={company.id}
                  key={company.id}
                  selected={data && company.id === data.categoryId}
                >
                  {company.companyName }
                </option>
              )
            )}
          </select>
          {errors.jobId?.message && (
            <p className="text-xs text-red-400">
              {errors.jobId?.message.toString()}
            </p>
          )}

      </div>
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default JobForm;
