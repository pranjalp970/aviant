import { redirect } from "next/navigation";
import { MobileNav, Sidebar } from "@/components/portal/PortalNav";
import { ratingById } from "@/content/acs";
import { getSession } from "@/lib/auth/session";

export default async function PortalLayout({ children }: LayoutProps<"/portal">) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!session.onboarded) redirect("/onboarding"); // build their personalized plan first
  const rating = ratingById(session.rating).short;

  return (
    <div className="flex min-h-dvh">
      <Sidebar name={session.name} ratingLabel={rating} />
      <div className="min-w-0 flex-1">
        <MobileNav name={session.name} ratingLabel={rating} />
        <main className="mx-auto w-full max-w-[1120px] px-5 pb-28 pt-8 sm:px-8 lg:pb-20 lg:pt-14">{children}</main>
      </div>
    </div>
  );
}
