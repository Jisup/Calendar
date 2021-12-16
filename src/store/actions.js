import axios from "@/lib/axios.js";

export async function getRecruitmentData() {
  const url =
    "https://frontend-assignments.s3.ap-northeast-2.amazonaws.com/job_postings.json";
  return await axios.get(url);
}
