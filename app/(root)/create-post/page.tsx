import CircuitPost from "@/components/forms/CircuitPost";
import { fetchUser } from "@/lib/actions/users.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user?.id);
  
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Circuit Post</h1>
      <CircuitPost userId={userInfo?._id?.toString()}/>
    </>
  );
}

export default Page;
