import { useEffect } from "react";
export function TabRemainSame(
  setTabChangeKey,
  setPagination,
  pagination,
  location,
  history,
) {
  useEffect(() => {
    const { state } = location;

    const status = String(state).split("=")[1];

    if (status === "undefined") {
      setTabChangeKey("1");
      setPagination({
        ...pagination,
        status: undefined,
      });
    } else if (status === "true") {
      setTabChangeKey("2");
      setPagination({
        ...pagination,
        status: true,
      });
    } else {
      setTabChangeKey("3");
      setPagination({
        ...pagination,
        status: false,
      });
    }
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.append("status", pagination?.status);
    history.push({
      state: `status=${searchParams.get("status")}`,
    });
  }, [pagination]);
}
