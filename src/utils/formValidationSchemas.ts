import { z } from "zod";

export const registrationSchema = z.object({
  id: z.coerce.number().optional(),
  userId: z.string(),
  jobId: z.string(),
  AppliedDate: z.coerce.date({ message: "Application Date is required!" }),
  ApplicationStatus: z.enum(["APPLIED", "REVIEW", "REJECTED", "COMPLETED", "SUCCESSFULL"], { message: "Status is required!" }),
})
export type RegistrationSchema = z.infer<typeof registrationSchema>;

export const jobSchema = z.object({
  id: z.string().optional(),
  companyName: z.string().min(3, { message: "company name is required!" }),
  city: z.string().min(5, { message: "city is required!" }),
  email: z.string()
});

export type JobSchema = z.infer<typeof jobSchema>;

export const jobDetailSchema = z.object({
  id: z.string().optional(),
  jobTitle: z.string().min(5, { message: "jobTitle is required!" }),
  jobDescription: z.string().min(5, { message: "jobDescription is required!" }),
  jobEducation: z.string().min(5, { message: "jobEducation is required!" }),
  jobRequirment: z.string().min(5, { message: "jobRequirement is required!" }),
  keyPoints: z.string().min(5, { message: "Key points is required!" }),
  niceToHave: z.string().min(5, { message: "niceToHave is required" }),
  salary: z.string().min(4, { message: "Salary is required" }),
  expires: z.string().optional(),
  city: z.string().optional(),
  endDate: z.string().optional(),
  categoryId: z.string(),
  jobId: z.string(),
});

export type JobDetailSchema = z.infer<typeof jobDetailSchema>;

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Category name is required!" }),
  description: z.string().min(5, { message: "Description is required!" }),
  categoryType: z.enum(["NEWS", "BLOGS", "JOB"], { message: "category Type is required!" }),
});

export type CategorySchema = z.infer<typeof categorySchema>;



export const courseSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  description: z.string().min(1, { message: "Subject description is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity is Required" }),
  requirement: z.string().min(1, { message: "Requirement is required!" }),
  whoTakes: z.string().min(1, { message: "who Takes is required!" }),
  mainPoints: z.string().min(1, { message: "main points is required!" }),
  startDate: z.coerce.date({ message: "Strart Time is required!" }),
  endDate: z.coerce.date({ message: "End Time is required!" }),
  supervisorId: z.string().optional(),
  categoryId: z.string().optional(),
});

export type CourseSchema = z.infer<typeof courseSchema>;

export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string(),
  address: z.string(),
  secure_url: z.string().optional(),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  gender: z.enum(["MALE", "FEMALE"], { message: "gender is required!" }),
  qualification: z.string(),
  specialization: z.string().min(5, { message: "Specialization is required!" }),
  subjects: z.string().optional(), // subject ids
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" }),
  phone: z.string(),
  address: z.string(),
  url: z.string().optional(),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  gender: z.enum(["MALE", "FEMALE"], { message: "gender is required!" }),
  classId: z.string().optional()
});

export type StudentSchema = z.infer<typeof studentSchema>;

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title name is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  lessonId: z.coerce.number({ message: "Lesson is required!" }),
});

export type ExamSchema = z.infer<typeof examSchema>;
