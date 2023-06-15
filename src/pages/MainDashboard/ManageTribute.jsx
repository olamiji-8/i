import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import "./managetribute.css";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import TributeCard from "./TributeCard";
import yar from "../../assets/yar.jpeg";
import Aside from "../../components/Aside";
import { useGetTribute } from "../../api/useGetTribute";
import { useTributeContext } from "../../contexts/TributeContext/TributeContext";
import BackDrop from "../../components/BackDrop";
import EmptyMemorial from "./EmptyMemorial";


function ManageTribute() {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])


  const [isActive, setActive] = useState(false);
  const [editId, seteditId] = useState(false);

  const Toggle = () => {
    setActive(!isActive);
  };

  let navigate = useNavigate();

  const { isLoading, error, isError } = useGetTribute()

  const { tributes } = useTributeContext();

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
      <div onClick={Toggle}  className="sidenav__close-icon-" >
      <AiOutlineCloseCircle />
    </div>

        <Aside onClick={Toggle} />
    </aside>
     
   <section className="main">
   <div className="body_body">
        <div className="myaccount">
          <h1 className="myaccount_text">Tributes</h1>
          <span className="tribute_title">
            Tributes you have written for other memorials
          </span>
        </div>
        {
          tributes?.data?.length === 0 ? 
          <div>
            <EmptyMemorial/>
          </div>
          :
          tributes?.data?.map((tribute, i)=>(
            <TributeCard key={i} 
              editId ={editId}
              seteditId = {seteditId}
              trib_data={tribute}
              image={yar} 
               
              memorialname="Johnson Magbodo" 
                />
          ))
        }

        {/* <TributeCard image={yar} creator="Ryan Adhitama" text="A revolutionary poet who spurned the pedestrian and pedantic
              poetry equally, a brilliant critic and a scholar of Sanskrit, this
              versatile poet has breathed a new vision of modernity to his
              vernacular.Such minds place Telugu on the world map of
              intellectualism. Readers conversant with names like Paul Valery,
              Gauguin, and Dag Hammarskjold will have to add the name of
              Seshendra Sharma the writer from,Johnson Magbodo is one of the
              most outstanding minds of modern Asia. He is the foremost of the
              Telugu poets today who has turned poetry to the gigantic strides
              of human history and embellished literature with the thrills and
              triumphs of the 20th"  memorialname="Johnson Magbodo" date="15 Oct 2021"  initial="RA"   />


        <TributeCard  activeValue={activeRow}
                            bool={!bollean}
                            onClick={() => {
                              setActiveRow("1");
                              setbollean(!bollean);
                            }} image={yar} creator="Ryan Adhitama" text="A revolutionary poet who spurned the pedestrian and pedantic
              poetry equally, a brilliant critic and a scholar of Sanskrit, this
              versatile poet has breathed a new vision of modernity to his
              vernacular.Such minds place Telugu on the world map of
              intellectualism. Readers conversant with names like Paul Valery,
              Gauguin, and Dag Hammarskjold will have to add the name of
              Seshendra Sharma the writer from,Johnson Magbodo is one of the
              most outstanding minds of modern Asia. He is the foremost of the
              Telugu poets today who has turned poetry to the gigantic strides
              of human history and embellished literature with the thrills and
              triumphs of the 20th"  memorialname="Johnson Magbodo" date="15 Oct 2021"  initial="RA"   />


        <TributeCard  activeValue={activeRow}
                            bool={!bollean}
                            onClick={() => {
                              setActiveRow("2");
                              setbollean(!bollean);
                            }} image={yar} creator="Ryan Adhitama" text="A revolutionary poet who spurned the pedestrian and pedantic
              poetry equally, a brilliant critic and a scholar of Sanskrit, this
              versatile poet has breathed a new vision of modernity to his
              vernacular.Such minds place Telugu on the world map of
              intellectualism. Readers conversant with names like Paul Valery,
              Gauguin, and Dag Hammarskjold will have to add the name of
              Seshendra Sharma the writer from,Johnson Magbodo is one of the
              most outstanding minds of modern Asia. He is the foremost of the
              Telugu poets today who has turned poetry to the gigantic strides
              of human history and embellished literature with the thrills and
              triumphs of the 20th"  memorialname="Johnson Magbodo" date="15 Oct 2021"  initial="RA"   />

                          */}
        {/* <TributeCard  activeValue={activeRow} 
                            bool={!bollean}
                            onClick={() => {
                              setActiveRow("3");
                              setbollean(!bollean);
                            }}
        
        image={yar} creator="Ryan Adhitama" text="A revolutionary poet who spurned the pedestrian and pedantic
              poetry equally, a brilliant critic and a scholar of Sanskrit, this
              versatile poet has breathed a new vision of modernity to his
              vernacular.Such minds place Telugu on the world map of
              intellectualism. Readers conversant with names like Paul Valery,
              Gauguin, and Dag Hammarskjold will have to add the name of
              Seshendra Sharma the writer from,Johnson Magbodo is one of the
              most outstanding minds of modern Asia. He is the foremost of the
              Telugu poets today who has turned poetry to the gigantic strides
              of human history and embellished literature with the thrills and
              triumphs of the 20th"  memorialname="Johnson Magbodo" date="15 Oct 2021"  initial="RA"   /> */}
      </div>
   </section>
    </div>
  );
}

export default ManageTribute;
