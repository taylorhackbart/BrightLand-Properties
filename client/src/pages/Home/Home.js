import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./home.css"
function HomePage() {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [load, setLoad] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    loadProperties();
    setLoad(false);
      setTimeout(() => {
        if (counter >= state.length-1 || index >= state.length-1 ) {
          setIndex(0);
          setCounter(1);
        console.log(index, counter, state.length);
      } else {
        setIndex(index + 1);
        setCounter(index);
        console.log(index, counter);
      }
    }, 5000);
  }, [counter]);

  const loadProperties = () => {
    API.getProperty().then((res) => {
      setState(res.data);
      if (res === undefined){
        return(
          <div>
            No properties have been uploaded
          </div>
        )
      }
      setLoading(false);
    });
  };

  const checkNumber = (number) => {
    if (number > state.length - 1) {
      return 0;
    }
    if (number < 0) {
      return state.length - 1;
    }
    return number;
  };
  const nextPhoto = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };

  const prevPhoto = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };
 
 
  return (
    <>
      {load === false && (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 center-me">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <>
                      {loading === true ? (
                        <></>
                      ) : (
                        <>
                          <a href={"/properties/name/" + state[index].location}>
                            <img
                              src={state[index].imageUrl[0].src}
                              className="d-block w-100 large-photo"
                              alt="..."
                            />
                          </a>
                          <h2 className="descriptionArr">
                            {" "}
                            {state[index].location}
                          </h2>
                        </>
                      )}
                    </>
                  </div>
                  {/* </div> */}
                </div>

                <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-bs-slide="prev"
                  onClick={prevPhoto}
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden"></span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-bs-slide="next"
                  onClick={nextPhoto}
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default HomePage;
