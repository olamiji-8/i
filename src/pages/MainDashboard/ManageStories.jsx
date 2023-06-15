import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import "./managetribute.css";

import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import TributeCard from "./TributeCard";
import yar from "../../assets/yar.jpeg";
import Aside from "../../components/Aside";
import { useStoryContext } from "../../contexts/StoryContext/StoryContext";
import { useGetStories } from "../../api/useGetStories";
import BackDrop from "../../components/BackDrop";
import EmptyMemorial from "./EmptyMemorial";

function ManageStories() {

  const [isActive, setActive] = useState(false);
  const Toggle = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  

  const { isLoading, error, isError } = useGetStories()

  const { stories } = useStoryContext();

  const [editId, seteditId] = useState('')

  if(isLoading) {
    return (
    <BackDrop open={isLoading}/>
    )
  }

  return (
    <div className="grid-container">
      <div className="menu-icon" onClick={Toggle}>
        <AiOutlineMenu className="header__menu" />
      </div>

      <aside className={` sidenav ${isActive ? " active" : null}`}>
        <div onClick={Toggle} className="sidenav__close-icon-" >
          <AiOutlineCloseCircle />
        </div>

        <Aside onClick={Toggle} />
      </aside>

      <section className="main">
        <div className="body_body">
          <div className="myaccount">
            <h1 className="myaccount_text">Stories</h1>
            <span className="tribute_title">
              Stories you have written for other memorials
            </span>
          </div>
          {
          stories?.data?.length === 0 ? 
          <div>
            <EmptyMemorial/>
          </div>
          :
          stories?.data?.map((story, i)=>(
            <TributeCard 
              editId ={editId}
              seteditId = {seteditId}
              key={i}
              story_data={story}
              stories
             />
          ))}
        </div>
      </section>
    </div>
  )
}

export default ManageStories