import React from 'react';

function Root() {
return (
    <div className="App">
      {/* <Header className="App-header" /> */}
      
      <h1>WELCOME TO TRAVELOG</h1>
      <p> Fun travel companion app</p>

      <div className='appDetailContainer'>
        <div className='contentContainer'>
          <p> Save your memories and photos of all your trips</p>
          <img src="https://artsy-media-uploads.s3.amazonaws.com/Vh32w6QvOHlefKS_tzjbfQ%2FScreen+Shot+2019-06-18+at+4.56.12+PM.png" className='rootImages'/>
        </div>
      </div>

      <div className='appDetailContainerPurple'>
        <div className='contentContainer'>
          <p className='contentFont'> Keep track of all your Visited/Bucketlist locations</p>
          <img src="https://www.rd.com/wp-content/uploads/2020/04/GettyImages-489556478-scaled.jpg?fit=700,467" className='rootImages'/>
        </div>
      </div>

      <div className='appDetailContainer'>
        <div className='contentContainer'>
          <p> Linked with Google Maps for Restaurants/Store Informations</p>
          <img src="https://osatech.ch/wp-content/uploads/2020/02/google_map_segnali-1.jpg" className='rootImages'/>
        </div>
      </div>
      

    </div>
  );

}

export default Root