import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import MemorialCard from './MemorialCard'
import "./Memorials.css"
import RecentCard from './RecentCard'
import { createSearchParams, useNavigate } from 'react-router-dom'
import IconButton from '../../components/IconButton/IconButton'
import { BsPlusLg, BsSearch } from 'react-icons/bs'
import SearchResCard from './SearchResCard'
import { useMostViewMemorial, useUserMemo } from '../../api/useMemorial'
import SignedInNavbar from '../../components/Navbar/SignedInNavbar'
import { useLocation } from "react-router-dom";
import { Local_storage } from '../../utils/LocalStorageConfig'
import { Axios } from '../../utils/Axios'
import BackDrop from '../../components/BackDrop'


function UserMemorials() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const useNavigateSearch = () => {
    const navigate = useNavigate();
    return (pathname, params) =>
      navigate(`${pathname}?${createSearchParams(params)}`);
  };

  const navigateSearch = useNavigateSearch()

  const [show_search, setshow_search] = useState(false)

  let location = useLocation();

  var host = window.location.protocol + "//" + window.location.host;



  let navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [searchResponse, setsearchResponse] = useState([])

  const handelSearch = (e) => {
    if (e.target.value.length === 0) {
      setshow_search(false)
    }
    setSearch(e.target.value)
    navigateSearch('/user/memorials', { memorial: e.target.value })
  }

  const SearchNow = (e) => {
    e.preventDefault();
    Axios.post('/search/memorial', {
      "search_param": search
    }).then((res) => {
      // console.log(res)
      setsearchResponse(res.data.data)
    })
      .catch((err) => {
        // console.log('err')
      })
      .finally(() => {
        console.log("finally")
        setshow_search(true)
      })
    // console.log('gghegehhegh')
  }

  const [mostMemorials, setMostMemorials] = useState()

  const onSuccesMost = (data) => {
    setMostMemorials(data.data.data)
    // console.log(data.data.data, "most")
  }
  const onErrorMost = (err) => {
    console.log(err)
  }

  const { data, isLoading } = useUserMemo()

  const { isLoading: mostLoading, isFetching: mostFetching, refetch: mostRefetch } = useMostViewMemorial(onSuccesMost, onErrorMost)

  if (isLoading) {
    return (
      <BackDrop open={isLoading} />
    )
  }
  return (
    <div>


      <SignedInNavbar />

      <div className="memorial_container">
        <div className="home_max_width">
          {/* //search memorial input start here */}
          <div className="searchMemo">
            <div className="createLine">
              <h3>Memorials</h3>
              <div className="showDesktop">
                <div className="sidedBtn" onClick={() => navigate('/sign-up')}>
                  <IconButton bg="#FFE0C4" width="32px" height="32px" icon={<BsPlusLg color='var(--main)' size={18} />} onClick={() => console.log('clicked')} />
                  <span>Create Memorial</span>
                </div>
              </div>

              <div className="showMobile">
                <div className="sidedBtn" onClick={() => navigate('/sign-up')}>
                  <IconButton bg="#FFE0C4" width="22px" height="22px" icon={<BsPlusLg color='var(--main)' size={10} />} onClick={() => console.log('clicked')} />
                  <span>Create Memorial</span>
                </div>
              </div>

            </div>
            <div>
              <form className='searchArea' onSubmit={SearchNow}>
                <input
                  placeholder='Search public memorials'
                  type="text"
                  name="search_memo" id="search_memo"
                  value={search}
                  onChange={handelSearch}
                />
                <BsSearch onClick={SearchNow} className='search' color='#717171' size={18} />
              </form>
            </div>
          </div>
          {/* //search memorial input end here */}
          {
            !show_search ?
              <div className="memorial_body">
                <div className="memo_cards_container">
                  <div className="memo_cards">
                    {
                      data?.data?.data?.map((memo, i) => (
                        <MemorialCard key={i} memorial={memo} link_to_share={`${host}/memorial/${memo.uuid}`} />
                      ))
                    }
                  </div>
                  <div className="most_viewed">
                    <div className="most_title">
                      Most Viewed Memorials
                    </div>
                    <RecentCard memorial={mostMemorials} />
                    {/* <RecentCard/>
                  <RecentCard/> */}
                  </div>
                </div>
              </div>
              :
              <div className="memorial_search_res_body">
                <div className="most_title">Search result for “ {search}”</div>
                {
                  searchResponse.length === 0 ?
                    <div>no item found</div>
                    :
                    searchResponse.map((res) => (
                      <SearchResCard data={res} key={res?.uuid} />
                    ))
                }
              </div>
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UserMemorials