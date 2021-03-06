import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Order() {
  const useparams = useParams("id");

  const navigate = useNavigate();
  const [userData, setUserData] = useState([])


  const rr = (e) => {
    e.preventDefault();
    navigate(`/dashboard/${useparams.id}`);
  }

  const tt = (e) => {
    e.preventDefault();
    navigate(`/cart/${useparams.id}`);
  }
  const pass = (e) => {
    e.preventDefault();
    navigate(`/ship/${useparams.id}`);
  }

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    console.log(useparams)
    const pk = {
      username: useparams.id
    }
    axios.post("http://localhost:8000/orderdata", pk).then((data) => {
      console.log(data)
      setUserData(data.data)
    }).catch((err) => {
      console.log(err)
      alert("something went to wrong")
    })
  }

  if (userData === null) {
    console.log("data not found");
  } else {
    console.log(userData)
  }

  return (
    <div>

      <nav className="nav-wraper indigo">
        <div className="container">
          <div>
            <a href="/rr" className="brand-logo left">Devship</a>
            <button className='btn indigo right style11' onClick={rr}>Dashboard</button>&nbsp;
            <button className='btn indigo right style13' onClick={tt}>Cart</button>
            <button className='btn indigo right style23' onClick={pass}>Shipping</button>
          </div>
        </div>
      </nav>
      <ul className="sidenav indigo" id="resposive"><br /><br />
        <h4 className='center' style={{ color: "white" }}>DevShip</h4>
        <div className='style6'>
        </div>
      </ul>

      {userData !== null ? (<div>

        <div className='container'>
          <div className='row s12'>
            {userData.map((datas) => {
              console.log(datas.photo)
              return (<>
                <div className='col s3'>
                  <div className='card'>
                    <div class="card-image">
                      <img src={datas.photo} style={{ height: "200px", width: "200px" }} alt="..." />
                    </div>
                    <div className='card-content'>
                      <p> name  :&nbsp;&nbsp;&nbsp;{datas.name}</p>

                      <p>Product prize : Rs.&nbsp;&nbsp;&nbsp;<span className='style20'>{datas.prize} /-</span></p>
                    <p>Offer Prize : Rs. {datas.offerprize}/-</p>
                    <p>Total Prize : Rs . {datas.totalprize} /-</p><hr/>
                    <p className='center'>Status : <span style={{color : "green",size : "20px"}}>{datas.Approved}</span></p><br/>
                    <p>Deleivery Details &nbsp; :<a href = "" onClick = {pass} >Click here</a></p>
                    </div>
                    <div className='card-action center'>
                      <button className='btn' onClick={() => {
                        axios.post(`http://localhost:8000/orderdel/${datas._id}`).then((data) => {
                          console.log(data);
                          getData()
                          // navigate(`/dashboard/${useparams.id}`)
                        }).catch((err) => {
                          console.log(err)
                        })
                      }}>Cancel</button>
                    </div>
                  </div>
                </div>
              </>
              )
            })}
          </div>
        </div>
      </div>) : (<div>data not found</div>)}



    </div>
  )
}

export default Order