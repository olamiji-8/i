import { useEffect, useState } from "react";
import { Axios } from '../utils/Axios';
import { useUserSingleMemorialContext } from "../contexts/MemorialContext/UserSingleMemorialContext";


function useSingleUserMemo(url) {

  const {user_memorial, setUser_memorial} = useUserSingleMemorialContext()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(user_memorial === null){
    setLoading(true);
    Axios
      .get(url)
      .then((response) => {
        setUser_memorial(response.data);
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
        setUser_memorial(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { user_memorial, loading, error, refetch };
}

export default useSingleUserMemo;