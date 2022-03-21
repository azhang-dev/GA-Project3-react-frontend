
import SinglePlaceMap from './Map/SinglePlaceMap';
import './Dashboard.css'

function Dashboard(){

  return(
      <div>
          
          <div className='map-container'>
              <SinglePlaceMap />
          </div>
      </div>
  )
}

export default Dashboard