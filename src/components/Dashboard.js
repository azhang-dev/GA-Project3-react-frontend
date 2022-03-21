
import SinglePlaceMap from './Map/SinglePlaceMap';
import './Dashboard.css'

function Dashboard(){

  return(
      <div>
          {/* <h1 className='page-title'>DASHBOARD</h1> */}
          <div className='map-container'>
              <SinglePlaceMap />
          </div>
      </div>
  )
}

export default Dashboard