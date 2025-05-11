import { useInfiniteQuery } from "@tanstack/react-query";
import { getVehicles, getVehiclesQueryKey, LocationVehicle, Vehicle } from "@/api/get-vehicles";
import { useEffect } from "react";

export function useVehicleData(vehicleType: "tracked" | "others") {
  const getNextPage = (lastPage: any) => {
    const currentPage = lastPage.content.page;
    const totalPages = lastPage.content.totalPages;
    return currentPage < totalPages ? currentPage + 1 : undefined;
  };

  const queryFn = ({ pageParam = 1 }) =>
    getVehicles({ type: vehicleType, page: pageParam, perPage: 20 });

  const query = useInfiniteQuery({
    queryKey: [getVehiclesQueryKey, { type: vehicleType, perPage: 20 }],
    queryFn,
    initialPageParam: 1,
    getNextPageParam: getNextPage,
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      await query.refetch();

      let hasNextPage = query.hasNextPage;

      while (hasNextPage) {
        const result = await query.fetchNextPage();
        hasNextPage = result.hasNextPage ?? false;
      }
    }, 120_000);

    return () => clearInterval(interval);
  }, [query]);

  const trackedVehicles: LocationVehicle[] = query.data
    ? query.data.pages.flatMap((p) => p.content.locationVehicles)
    : [];

  const vehicles: Vehicle[] = query.data
    ? query.data.pages.flatMap((p) => p.content.vehicles)
    : [];

  return {
    ...query,
    trackedVehicles,
    vehicles,
  };
}
