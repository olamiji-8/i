import React, { useEffect, useRef, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import MemorialCard from './MemorialCard'
import "./Memorials.css"
import RecentCard from './RecentCard'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import IconButton from '../../components/IconButton/IconButton'
import { BsPlusLg, BsSearch } from 'react-icons/bs'
import SearchResCard from './SearchResCard'
import { useMemorial, useMostViewMemorial } from '../../api/useMemorial'
import { useLocation } from "react-router-dom";
import { useMemorialContext } from '../../contexts/MemorialContext/MemorialContext'
import { Axios } from '../../utils/Axios'
import BackDrop from '../../components/BackDrop'
import { debounce } from "lodash"
import { InView } from "react-intersection-observer";
import { ClipLoader } from "react-spinners";
import { Helmet } from 'react-helmet'
import { Local_storage } from '../../utils/LocalStorageConfig'

function Memorial() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  // useEffect(() => {
  //   return () => {
  //     debouncedSearch.cancel();
  //   };
  // }, [debouncedSearch])


  const useNavigateSearch = () => {
    const navigate = useNavigate();
    return (pathname, params) =>
      navigate(`${pathname}?${createSearchParams(params)}`);
  };

  const navigateSearch = useNavigateSearch()

  const [show_search, setshow_search] = useState(false)

  let location = useLocation()
  var host = window.location.protocol + "//" + window.location.host;
  // var hostname = window.location.hostname;

  let navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [searchResponse, setsearchResponse] = useState([])

  const handelSearch = (e) => {
    if (e.target.value.length === 0) {
      setshow_search(false);
      navigateSearch('/memorials')
      setSearch(e.target.value);
    } else {
      SearchNow(e);
      setSearch(e.target.value);
      navigateSearch('/memorials', { memorial: e.target.value })
    }
  }

  const ExecuteSearch = (val) => {

    Axios.post('/search/memorial', {
      "search_param": val
    }).then((res) => {
      // console.log(res)
      setsearchResponse(res.data.data)
    })
      .catch((err) => {
        // console.log('err')
      })
      .finally(() => {
        setshow_search(true)
      })
    // console.log('called')
  }

  const debouncedSearch = useRef(
    debounce(async (criteria) => {
      await ExecuteSearch(criteria);
    }, 500)
  ).current;


  const SearchNow = async (e) => {
    e.preventDefault();
    debouncedSearch(e.target.value)
    // console.log('gghegehhegh')
  }



  // observer();

  const [mostMemorials, setMostMemorials] = useState()

  const onSuccesMost = (data) => {
    setMostMemorials(data.data.data)
    // console.log(data.data.data, "most")
  }
  const onErrorMost = (err) => {
    console.log(err)
  }
  const { isLoading, data, fetchNextPage, isFetching, isFetchingNextPage } = useMemorial()

  const { isLoading: mostLoading, isFetching: mostFetching, refetch: mostRefetch } = useMostViewMemorial(onSuccesMost, onErrorMost)

  const fetchNext = (e) => {
    if (data.pages[data.pages.length - 1].data.pagination.next_page_url !== null) {
      if (e && !isFetchingNextPage) {
        fetchNextPage()
      }
    }
  }


  if (isLoading || mostLoading) {
    return (
      <BackDrop open={isLoading} />
    )
  }
  return (
    <div>
      <Helmet>
        <title>Memorials - Create Tribute</title>
      </Helmet>
      <Navbar mobilebgColor="white" bgColor="white" iconColor="#76797F" />
      <div className="memorial_container">
        <div className="home_max_width">
          {/* //search memorial input start here */}
          <div className="searchMemo">
            <div className="createLine">
              <h3>Memorials</h3>
              <div className="showDesktop">
                <div className="sidedBtn" onClick={() => {
                  Local_storage().get("_utk") !== "" ?
                    navigate('/create-memorial')
                    :
                    navigate('/sign-up')
                }}>
                  <IconButton bg="#FFE0C4" width="32px" height="32px" icon={<BsPlusLg color='var(--main)' size={18} />} onClick={() => console.log('clicked')} />
                  <span>Create Memorial</span>
                </div>
              </div>

              <div className="showMobile">
                <div className="sidedBtn" onClick={() => {
                  Local_storage()?.get("_utk") !== "" ?
                    navigate('/create-memorial')
                    :
                    navigate('/sign-up')
                }}>
                  <IconButton bg="#FFE0C4" width="22px" height="22px" icon={<BsPlusLg color='var(--main)' size={10} />} onClick={() => console.log('clicked')} />
                  <span>Create Memorial</span>
                </div>
              </div>

            </div>
            <div>
              <form className='searchArea'>
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
            !show_search || search === '' ?
              <div className="memorial_body">
                <div className="memo_cards_container">
                  <div className="memo_cards">
                    {
                      data.pages.map(page => (
                        page?.data?.data?.sort((x, y) => new Date(y.created_at) - new Date(x.created_at))?.map((memo, i) => (
                          <MemorialCard key={i} memorial={memo} link_to_share={`${host}/memorial/${memo?.slug}`} />
                        ))
                      ))

                    }
                    <InView onChange={fetchNext}>
                      {({ ref, inView }) => (
                        <div ref={ref}>
                          {
                            isFetchingNextPage ?
                              <div style={{ textAlign: 'center' }}>
                                <ClipLoader color="var(--main)" loading={isFetchingNextPage} speedMultiplier={1} size={48} />
                              </div>
                              :
                              <h2 style={{ textAlign: 'center' }}>No More data to load</h2>
                          }
                        </div>
                      )}
                    </InView>
                    <div>
                    </div>
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
                    searchResponse?.map((res) => (
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

export default Memorial