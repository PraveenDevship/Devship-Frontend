import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Mobiles() {


  const useparams = useParams("id");
  console.log(useparams)

  const [userdata, setuserData] = useState([]);
  const [Search, setSearch] = useState();


  const navigate = useNavigate();

  const Values = localStorage.getItem('initial');
  console.log(Values)



  const rr = (e) => {
    e.preventDefault();
    navigate(`/dashboard/${useparams.id}`);
  }

  const tt = (e) => {
    e.preventDefault();
    navigate(`/cart/${useparams.id}`);
  }

  useEffect(() => {

    axios.get("http://localhost:8000/data").then((data) => {
      setuserData(data.data);
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const passed = (e) => {
    alert(`you Don't have a Account Please Register`);
    navigate('/')
  }


  return (
    <div>

      <nav class="nav-wraper indigo">
        <div className="container">
          <div>
            <a href="/rr" className="brand-logo left">Devship</a>
            <button className='btn indigo right style10' onClick={tt} >cart</button>
            <button className='btn indigo right style11' onClick={rr}>Dashboard</button>
          </div>
        </div>
      </nav>
      <ul className="sidenav indigo" id="resposive"><br /><br />
        <h4 className='center' style={{ color: "white" }}>DevShip</h4>
        <div className='style6'>
        </div>
      </ul>


      {/* <div className='container'>
        <h4 className='center'>Mobiles</h4>
        <input type="text" placeholder = "enter item" onChange={(e) => setSearch(e.target.value)}/>
        <div className='row s12'>
          {userdata.filter((product) => {
            if(Search == "") {
              return product
            }else if (
              product.name.toLowerCase().includes(Search.toLowerCase())
              )
              return product
          })
          .map((product) => {
            <h5>{}</h5>
          })
          }
        </div>
      </div> */}


      <div className='container'>
        <h4 className='center'>Mobiles</h4>
        <div className='row s12'>
          {userdata.map((datas) => {
            console.log(datas.photo)
            return (<>
              <div className='col s3'>
                <div className='card'>
                  <div className='card-content'>
                    <img src={`http://localhost:8000/${datas.photo}`} style={{ height: "200px", width: "200px" }} alt="..." />
                    <p>Mobile name  :&nbsp;&nbsp;&nbsp;{datas.name}</p>
                    <p>Mobile prize :&nbsp;&nbsp;&nbsp;{datas.prize}</p>
                  </div>
                  <div className='card-action center'>
                    {Values === useparams.id ? (<div>

                      <button className='btn' onClick={() => {
                        const pp = {
                          username: useparams.id,
                          name: datas.name,
                          prize: datas.prize,
                          photo: `http://localhost:8000/${datas.photo}`
                        }

                        axios.post(`http://localhost:8000/addcart/${useparams.id}`, pp).then((data) => {
                          console.log(data);
                          alert('posted')
                        }).catch((err) => {
                          console.log(err)
                        })
                      }}>AddCart</button>
                    </div>) : (<div>
                      <button className='btn center' onClick={() => {
                          window.localStorage.setItem("name", datas.name);
                          window.localStorage.setItem("prize", datas.prize);
                          window.localStorage.setItem("photo", datas.photo);
                          alert("data added please login")
                      }}>AddCart</button>
                    </div>)}
                    &nbsp;
                  </div>
                </div>
              </div>
            </>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default Mobiles