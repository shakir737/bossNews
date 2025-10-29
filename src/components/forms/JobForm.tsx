"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { jobSchema, JobSchema,} from "@/utils/formValidationSchemas";
import { createJob} from "@/utils/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
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
  } = useForm<JobSchema>({
    resolver: zodResolver(jobSchema),
  });

  // AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, formAction] = useActionState(
    type === "create" ? createJob : createJob,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Job has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { category } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold flex items-center justify-center">
        {type === "create" ? "Create A New Job" : "Update The Job"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="companyName"
          name="companyName"
          defaultValue={data?.companyName}
          register={register}
          error={errors?.companyName}
        />
         <InputField
          label="City"
          name="city"
          defaultValue={data?.city}
          register={register}
          error={errors?.city}
        />
         <InputField
          label="email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
          type="email"
        />
    
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
