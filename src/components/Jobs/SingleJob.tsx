import Link from "next/link";
import { Category, Job, JobDetail } from '@prisma/client';

type JobList = JobDetail & { category: Category , job: Job } ;
const SingleJob = async ({ jobDetail }: { jobDetail: JobList }) => {
  const { jobTitle, jobDescription, jobEducation, keyPoints, id, job, openingDate, category } = jobDetail;
  openingDate?.setMonth(openingDate.getMonth() + 1)
  return (
    <div className="mb-10 border border-indigo-600 bg-indigo-600 rounded-md">
      <div className="p-7 bg-white dark:text-black">
        <h3>
          <Link
            href={`/jobs/${id}`}
            className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-black dark:hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
          >
            {jobTitle}
          </Link>
        </h3>
        <div className="flex flex-col">
          <div>
            Date: <span className="">
          {openingDate?.getDate()}/{openingDate?.getMonth()}/{openingDate?.getFullYear()}
        </span>
          </div>
          <div>
            Category: <span> {category.name} </span>
          </div>
          <div>
            Company:  <span>{job.companyName}</span>
          </div>
          <div>
              <p className="truncate text-base text-body-color mt-3 dark:text-dark-6">{jobDescription}</p>
          </div>
         
        </div>
       
      </div>
    </div>
  );
};

export default SingleJob;
