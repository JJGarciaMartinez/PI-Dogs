import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs, getTemperaments } from "../../redux/actions";
import LoadingPage from "../LoadingPage/LoadingPage";
import Cards from "../Cards/Cards";
import dog from "../../assets/dog.svg";

import "./Home.css";
import Footer from "../Footer/Footer";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getDogs());
      dispatch(getTemperaments());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className="homePage">
        {loading ? <LoadingPage /> : <Cards />}
        <figure className="background"></figure>
      </div>
    </>
  );
}
