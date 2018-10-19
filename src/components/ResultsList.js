
import React from 'react';
import posed from 'react-pose';
import UtilBar from './UtilBar.js';
import { getDistanceBetween } from '../lib/utilities.js';

import '../scss/results-list.scss';



const Drawer = posed.div({
  closed: { 
    height: 0,
    transition: {
      duration: 200,
      ease: 'circOut'
    } 
  },
  open: { 
    height: 'auto',
    transition: {
      duration: 330,
      ease: 'circOut'
    }
  }
});



class ResultsList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      openIndex: false
    };

    this.weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  }

  getDirectionsLink(cols, item) {
    return `https://www.google.com/maps/dir/Current+Location/${item[cols.address_street]} ${item[cols.address_city]}, ${item[cols.address_state]} ${item[cols.address_zip]}`;
  }

  infoToggleHandler(e, index) {
    e.preventDefault();
    if (index === this.state.openIndex) {
      this.setState({openIndex: false});
    } else {
      this.setState({openIndex: index});
    }
  }

  render() {
    const toggleHandler = this.infoToggleHandler.bind(this);
    const cols = this.props.columns;

    const renderItem = (item, i) => {
      const key = 'resultsitem-'+i;
      const distance = getDistanceBetween(this.props.searchpos, {
        lat: item[cols.map_location].lat,
        lng: item[cols.map_location].long
      });
      
      if ( (i + 1) > this.props.count || distance > this.props.radius ) {
        return '';
      }

      return(
        <li className="hubdb-resultsitem" key={key}>
          <div className="hubdb-resultsitem--liner">
            <h4>{item[cols.name]}</h4>
            <address>
              <span>{item[cols.address_street]} <em>{item[cols.address_unit]}</em></span>
              <span>{item[cols.address_city]}, {item[cols.address_state]} {item[cols.address_zip]}</span>
            </address>
            
            <button className="hubdb-resultsitem--btn" onClick={e => toggleHandler(e, i)}>
              <span>{this.state.openIndex === i ? 'Hide Info' : 'More Info'}</span>
            </button>
            <Drawer className="hubdb-drawer" pose={this.state.openIndex === i ? 'open' : 'closed'}>
              <div className="hubdb-resultsitem--info">
                {item[cols.phone] !== 'NULL' &&
                <div className="hubdb-info--phone">
                  <i className="icon-phone" aria-hidden="true"></i>
                  <strong>Phone:</strong> <span>{item[cols.phone]}</span>
                </div>}
                {item[cols.fax] !== 'NULL' && 
                <div className="hubdb-info--fax">
                  <strong>Fax:</strong> <span>{item[cols.fax]}</span>
                </div>}
                {item[cols.email] !== 'NULL' &&
                <div className="hubdb-info--email">
                  <i className="icon-envelope-letter" aria-hidden="true"></i>
                  <strong>Email:</strong> <a href={'mailto:'+item[cols.email]}><span>{item[cols.email]}</span></a>
                </div>}
                
                {item[cols.hours_weekday] !== 'NULL' &&
                <div className="hubdb-info--hours">
                  <h5>
                    <i className="icon-clock" aria-hidden="true"></i>
                    <span>Hours:</span>
                  </h5>
                  {this.weekdays.map(day => 
                    <div key={day.toLowerCase()}>
                      <span>{day}</span> <span>{item[cols.hours_weekday]}</span>
                    </div>)}
                </div>}
                {item[cols.hours_saturday] !== 'NULL' &&
                <div className="hubdb-info--wkndhours">
                  <span>Saturday</span> <span>{item[cols.hours_saturday]}</span>
                </div>}
                {item[cols.hours_sunday] !== 'NULL' &&
                <div className="hubdb-info--wkndhours">
                  <span>Saturday</span> <span>{item[cols.hours_sunday]}</span>
                </div>}
              </div>
            </Drawer>
            <div className="hubbdb-resultsitem--distance">
              <h5> 
                <i className="icon-location-pin" aria-hidden="true"></i>
                <span>{distance} Miles</span>
              </h5>
            </div>
            <div className="hubdb-resultsitem--dir">
              <a href={this.getDirectionsLink(cols, item)} target="_blank" style={{color: this.props.color}}>
                <span>Get Directions</span>
                <i className="icon-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </li>
      );
    }; //end render item

    return(
      <div className="hubdb-resultslist">
        <div className="hubdb-resultslist--liner">
          <ul>
            {this.props.locations.map((location, i) => renderItem(location, i))}
          </ul>
        </div>
        <UtilBar />
      </div>
    );
  }
};


export default ResultsList;