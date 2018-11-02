
import React from 'react';
import posed from 'react-pose';
import ClassNames from 'classnames';
import anime from 'animejs';

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
    this.listRef = React.createRef();
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

  doBackToTop() {
    anime({
      targets: this.listRef.current,
      scrollTop: 0,
      duration: 900,
      easing: 'easeOutCirc'
    });
  }

  render() {
    const toggleHandler = this.infoToggleHandler.bind(this);
    const backToTop = this.doBackToTop.bind(this);

    const cols = this.props.columns;
    
    const renderItem = (item, i) => {
      const key = 'resultsitem-'+i;
      const distance = getDistanceBetween(this.props.searchpos, {
        lat: item[cols.map_location].lat,
        lng: item[cols.map_location].long
      });
      const itemClasses = ClassNames({
        'hubdb-resultsitem': true,
        'is-focused': this.props.focused === i
      });
      if ( (i + 1) > this.props.count || distance > this.props.radius ) {
        return '';
      }
      return(
        <li className={itemClasses} key={key} onClick={e => this.props.itemFocus(i)}>
          <div className="hubdb-resultsitem--liner">
            <h4>{item[cols.name]}</h4>
            <p>{item[cols.products].replace(';', ',')}</p>
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
                  <i className="icon-call-out" aria-hidden="true"></i>
                  <strong>Phone: </strong> 
                  <span>{item[cols.phone]}</span>
                </div>}
                {item[cols.fax] !== 'NULL' && 
                <div className="hubdb-info--fax">
                  <i className="icon-printer" aria-hidden="true"></i>
                  <strong>Fax: </strong> 
                  <span>{item[cols.fax]}</span>
                </div>}
                {item[cols.email] !== 'NULL' &&
                <div className="hubdb-info--email">
                  <i className="icon-envelope-letter" aria-hidden="true"></i>
                  <strong>Email: </strong> 
                  <a href={'mailto:'+item[cols.email]} style={{color: this.props.color}}><span>{item[cols.email]}</span></a>
                </div>}
                
                {item[cols.hours_weekday] !== 'NULL' &&
                <div className="hubdb-info--hours">
                  <h5>
                    <i className="icon-clock" aria-hidden="true"></i>
                    <span>Hours:</span>
                  </h5>
                  <div className="hubdb-info--wkdayhours">
                    <span>{item[cols.hours_weekday]}</span>
                  </div>
                  
                  /*{item[cols.hours_saturday] !== 'NULL' &&
                  <div className="hubdb-info--wkndhours">
                    <span>Saturday</span> <span>{item[cols.hours_saturday]}</span>
                  </div>}
                  {item[cols.hours_sunday] !== 'NULL' &&
                  <div className="hubdb-info--wkndhours">
                    <span>Saturday</span> <span>{item[cols.hours_sunday]}</span>
                  </div>}*/
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
              <a href={this.getDirectionsLink(cols, item)} target="_blank" rel="noopener noreferrer" 
                 style={{color: this.props.color}}>
                <span>Get Directions</span>
                <i className="icon-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </li>
      );
    }; //end render item

    const renderList = () => {
      if (this.props.locations.length) {
        return <ul>{this.props.locations.map((location, i) => renderItem(location, i))}</ul>;
      } else {
        return(
          <div className="hubdb-empty-resultmsg">
            <p>Enter a city, state, or zipcode above and hit <code>enter</code> to find your closest locations!</p>
          </div>
        );
      }
    };

    return(
      <div className="hubdb-resultslist" ref={this.listRef}>
        <div className="hubdb-resultslist--liner">
          {renderList()}
        </div>
        {this.props.locations.length > 5 && <UtilBar backToTop={backToTop} />}
      </div>
    );
  }
};


export default ResultsList;