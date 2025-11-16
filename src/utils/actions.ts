"use server";
import { parse } from "path";
import {
  CategorySchema,
  JobDetailSchema,
  JobSchema,
} from "./formValidationSchemas";
import Prisma from "./prismaDB";
import bcrypt from "bcryptjs";

type CurrentState = { success: boolean; error: boolean };


export const createJob = async (
  currentState: CurrentState,
  data: JobSchema
) => {
  try {
    await Prisma.job.create({
      data: {
       companyName: data.companyName,
       city: data.city,
       email: data.email,
      },
    });

    
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createJobDetail = async (
  currentState: CurrentState,
  data: JobDetailSchema
) => {
  try {
    await Prisma.jobDetail.create({
      data: {
       jobTitle: data.jobTitle,
       jobDescription: data.jobDescription,
       jobEducation: data.jobEducation,
       jobRequirment: data.jobRequirment,
       keyPoints: data.keyPoints,
       salary: data.salary,
       niceToHave: data.niceToHave,
       jobId: data.jobId,
       expires: data.expires,
       categoryId: data.categoryId,
       city: data.city,
       endDate: data.endDate
      },
    });

    
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateJobDetail = async (
  currentState: CurrentState,
  data: JobDetailSchema
) => {
  try {
    await Prisma.jobDetail.update({
       where: {
                // The unique identifier for the record to be updated
                id: data.id,
        },
      data: {
       jobTitle: data.jobTitle,
       jobDescription: data.jobDescription,
       jobEducation: data.jobEducation,
       jobRequirment: data.jobRequirment,
       keyPoints: data.keyPoints,
       salary: data.salary,
       niceToHave: data.niceToHave,
       jobId: data.jobId,
       expires: data.expires,
       categoryId: data.categoryId,
       city: data.city,
       endDate: data.endDate
      },
    });

    
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createCategory = async (
  currentState: CurrentState,
  data: CategorySchema
) => {
  try {
    await Prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        categoryType: data.categoryType
       
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }}
