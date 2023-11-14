import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs, tempFilter } from "../../redux/actions";
import LoadingPage from "../LoadingPage/LoadingPage";
import Cards from "../Cards/Cards";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getDogs());
      dispatch(tempFilter(""));
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="homePage">{loading ? <LoadingPage /> : <Cards />}</div>
  );
}
