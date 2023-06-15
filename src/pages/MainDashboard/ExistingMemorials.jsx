import "./ExistingMemorials.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Capitalizer } from "../../utils/Capitalizer";
import { useEffect } from "react";
import { Local_storage } from "../../utils/LocalStorageConfig";

function ExistingMemorials({ data }) {
  let navigate = useNavigate();


  // useEffect(() => {

  //   console.log(data, 'dataaaaaaaa')


  // }, []);


  return (
    <div className="existing__memorials__home">
      {data?.map((x, i) => {
        return (
          <Card style={{
            width: "100%",
            position: "relative",
            boxShadow: 'none',
            border: '1px solid #E6E7E9'
          }} key={i} >

            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="264px"
                width="100%"
                object-fit="cover"
                image={`${x?.image}`}
              />

              <Box
                sx={{
                  position: "absolute",
                  zIndex: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  top: 0,
                  right: 0,
                  margin: "10px 10px",
                }}
              >
                <Typography
                  className={`${x.status === "active"
                    ? "state__active"
                    : x.state === "Expiring Soon"
                      ? "state__expiring"
                      : x.state === "Expired"
                        ? "state__expired"
                        : x.status === "saved"
                          ? "state__save"
                          :
                          x.status === "suspended"
                            ? "state__suspend"


                            : ""
                    } `}
                  variant="h6"
                >
                  {Capitalizer(x.status)}
                </Typography>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "264px",
                  bgcolor: "rgba(0, 0, 0, 0.54)",
                  color: "white",
                  padding: "10px",
                }}
              >
              </Box>
            </Box>

            <CardActions>
              <Button onClick={() => {
                return (
                  window.open(`/memorial/${x?.slug}`,
                    "_blank"


                  ),

                  Local_storage().set(
                    "nodi_data",
                    `${JSON.stringify({ x })}`
                  ),


                  // Local_storage().set(
                  //   "nodi",
                  //   `${JSON.stringify({x})}`
                  // ),
                  // console.log(x, 'xxxxx'),
                  localStorage.setItem('testObject', JSON.stringify(x))
                )
              }


              } sx={{ textTransform: 'none' }} size="small" className="learnmore">
                Visit Memorial <MdOutlineArrowForwardIos />{" "}
              </Button>
            </CardActions>

            <div className="memo_ca">
              <div className="memorial__name" >{x?.fullname}</div>
              <div className="memorial__date" >{x?.date_of_birth}- {x?.date_of_death}</div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default ExistingMemorials;
