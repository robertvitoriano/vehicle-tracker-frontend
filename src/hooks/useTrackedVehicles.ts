import { useInfiniteQuery } from "@tanstack/react-query";
import { getVehicles, getVehiclesQueryKey, LocationVehicle, Vehicle } from "@/api/get-vehicles";

export function useTrackedVehicles() {
  const getNextPage = (lastPage: any) => {
    const currentPage = lastPage.content.page;
    const totalPages = lastPage.content.totalPages;
    return currentPage < totalPages ? currentPage + 1 : undefined;
  };

  const queryFn = ({ pageParam = 1 }) =>
    getVehicles({ type: "tracked", page: pageParam, perPage: 20 });

  const query = useInfiniteQuery({
    queryKey: [getVehiclesQueryKey, { type: "tracked", perPage: 20 }],
    queryFn,
    initialPageParam: 1,
    getNextPageParam: getNextPage,
  });

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
