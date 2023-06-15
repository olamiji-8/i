import { useEffect, useState } from "react";
import { Axios } from '../utils/Axios';
import { useMemorialContext } from "../contexts/MemorialContext/MemorialContext";


function useMemorialV2(url) {

  const {memorial, setMemorial} = useMemorialContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(memorial === null){
    setLoading(true);
    Axios
      .get(url)
      .then((response) => {
        setMemorial(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, [url]);

  const refetch = () => {
    setLoading(true);
    Axios
      .get(url)
      .then((response) => {
        setMemorial(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { memorial, loading, error, refetch };
}

export default useMemorialV2;