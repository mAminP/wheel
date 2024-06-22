import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import HomePage from "@/app/(main)/_components/HomePage";
export const dynamic = 'force-dynamic'
export default async function Home() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}