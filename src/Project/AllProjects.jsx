import axios from '../axios'
import "../App.css"
import React, { useState, useEffect } from "react";
import TextTruncate from 'react-text-truncate';
// import ReactMarkdown from 'react-markdown'
import Loader from '../Loader'
import Nav from "../Nav/Nav"

export default function HomePageProject(props) {
  const [responses, setResponses] = useState();
  const [loader, setloader] = useState(<div className="d-flex justify-content-center pb-3"><Loader></Loader></div>);

  var sampleproject = [];

  async function getSampleProject() {
    await axios.get('/api/Projects', {
      headers: {
        'Content-Type': 'application/json'
     }
    }).then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        var hreflink = "/project/"+res.data[i].id
        sampleproject[i] = 
        <div className='col'>
        <a className='linknoeffect' href={hreflink}>
        <div className='card mb-3'>
        <h3 className="card-header">Project: {res.data[i].id}</h3>
        <div className="card-body">
          <h5 className="card-title">{res.data[i].name}</h5>
          <h6 className="card-subtitle text-muted">Created By: {res.data[i].creator}</h6>
        </div>
        <div className="rounded mx-auto d-block p-2 border">
        <img width="100vh" src="https://user-images.githubusercontent.com/76911582/196771457-2c0b15c0-bb27-4f73-a1b6-2120f2dfbca4.png" />
        </div>
        <div className="card-body">
        {/* <ReactMarkdown children={}/> */}
        <TextTruncate line={2} text={res.data[i].description} className="card-text" />
        </div>
        <div className="card-body">
          <a href="#like" className="card-link">Like</a>
          <a href="#report" className="card-link">Report</a>
        </div>
        <div className="card-footer text-muted">
          Likes: {res.data[i].likes}
        </div>
      </div>
      </a>
      </div>
      }
      setResponses(sampleproject);
      console.log(res.data)
      setloader();
    });
  }

  useEffect(() => {
    getSampleProject();
  }, []);

  return (
    <>
      <Nav/>
      <div className="p-1">
        <div className="border p-3 mt-5" style={{ borderRadius: "18px" }}>
          <h2 className="row pb-2">
            <div className="pb-2 d-flex justify-content-around">
              <h2 className="">All Projects !</h2>
            </div>
            <hr />
          </h2>
          {loader}
          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-4 row-cols-sm-2 g-3">
            {responses}
          </div>
        </div>
      </div>
    </>
  )
}