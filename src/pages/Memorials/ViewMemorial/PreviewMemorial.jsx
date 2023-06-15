import React, { useEffect, useState } from 'react'
import { useViewMemorial } from '../../../api/useMemorial'
import PreviewBody from '../../../components/ViewBody/PreviewBody'
import ViewHeader from '../../../components/ViewHeader/ViewHeader'
import { useLocation, useParams } from 'react-router-dom'
import moment from 'moment'
import SignedInBack from '../../../components/Navbar/SignedInBack'
import BackDrop from '../../../components/BackDrop'

function PreviewMemorial() {

  let location = useLocation();

  var retrievedObject = localStorage.getItem('testObject');



  const getData = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("https://geolocation-db.com/json/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        return (
          //
          // console.log(JSON?.parse(result),  'result'),
          setIp(JSON?.parse(result))
        )
      })
      .catch((error) => console.log("error", error));
  };


  useEffect(() => {
    window.scrollTo(0, 0)

    // console.log(location, 'location')
    getData();
    // console.log(uuid, 'uuid')

  }, [])

  const { uuid } = useParams()

  const [activeTab, setactiveTab] = useState("About")
  const [memorial, setMemorial] = useState([])
  const [ip, setIp] = useState();

  const onSucces = (data) => {
    setMemorial(data.data.data)
  }
  const onError = (err) => {
    console.log(err)
  }
  const { isLoading, data, isError, error, isFetching, refetch } = useViewMemorial(onSucces, onError, uuid, ip?.IPv4)

  if (isLoading || isFetching) {
    return (
      <BackDrop open={isLoading || isFetching} />
    )
  }

  return (
    <div>
      <div>
        <ViewHeader
          image={memorial?.image}
          name={memorial?.fullname}
          date={
            moment(memorial?.date_of_birth).format("DD/MM/YYYY")
            + " - " +
            moment(memorial?.date_of_death).format("DD/MM/YYYY")
          }
          activeTab={activeTab} setactiveTab={setactiveTab} />
        <PreviewBody memorial={memorial} activeTab={activeTab} />
      </div>
    </div>
  )
}

export default PreviewMemorial