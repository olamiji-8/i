import { useQuery } from 'react-query';
import { useDashboardContext } from '../contexts/DashboardContext/Dashboard';
import AuthAxios from '../utils/AuthAxios';
import { Capitalizer } from '../utils/Capitalizer';
import { Local_storage } from '../utils/LocalStorageConfig';


const fetchDashboarddata = async () => {
  const response = await AuthAxios.get(`/user/dashboard`)
  const data = response.data
  return data
}

export const useGetDashboard = () => {
  const { setdashdata } = useDashboardContext();

  return useQuery('fetch dashboard', fetchDashboarddata, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      // update context data
      data.data.user_memorials = data.data.user_memorials.sort((x, y) => y.id - x.id)

      setdashdata(data)
      Local_storage().set("_na_ma", Capitalizer(data?.data?.user_details?.first_name) + " " + Capitalizer(data?.data?.user_details?.last_name))

    }
  })
}