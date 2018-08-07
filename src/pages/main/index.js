import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MapGL, { Marker } from 'react-map-gl';
import Modal from 'react-responsive-modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../../store/ducks/users';

import {
  Avatar, ListContainer, Item, Form,
} from './styles';

class Main extends Component {
  static defaultProps = {
    users: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          username: PropTypes.string,
          avatar: PropTypes.string,
        }),
      ),
    }),
  };

  static defaultProps = {
    users: {
      data: [],
    },
  };

  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -23.5439948,
      longitude: -46.6065452,
      zoom: 14,
    },
    open: false,
    username: 'lucasdu4rte',
    latitude: '',
    longitude: '',
  };

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleMapClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    console.log('latitude',latitude);
    console.log('longitude',longitude);

    this.setState({
      latitude,
      longitude,
    });
    this.onOpenModal();
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const { latitude, longitude, username } = this.state;
    this.props.addUserRequest({
      latitude,
      longitude,
      username,
    });
    this.onCloseModal();
    this.setState({
      username: '',
      latitude: '',
      longitude: '',
    });
  };

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  render() {
    const { open } = this.state;
    return (
      <Fragment>
        <ListContainer>
          {this.props.users.data.map(user => (
            <Item key={user.id}>
              <img src={user.avatar_url} alt={user.login} />
              <div className="infos">
                <span className="name">
                  {user.name}
                </span>
                <span className="username">
                  {user.login}
                </span>
              </div>
              <div className="buttons">
                <button
                  type="button"
                  className="text-danger"
                  onClick={() => this.props.removeUser(user.id)}
                >
                  <i className="fas fa-times-circle" />
                </button>
                <button type="button" className="text-muted" onClick={() => {}}>
                  <i className="fas fa-angle-right" />
                </button>
              </div>
            </Item>
          ))}
        </ListContainer>
        <MapGL
          {...this.state.viewport}
          onClick={this.handleMapClick}
          mapStyle="mapbox://styles/mapbox/basic-v9"
          mapboxApiAccessToken="pk.eyJ1IjoiZGllZ28zZyIsImEiOiJjamh0aHc4em0wZHdvM2tyc3hqbzNvanhrIn0.3HWnXHy_RCi35opzKo8sHQ"
          onViewportChange={viewport => this.setState({ viewport })}
        >
          {this.props.users.data.map(user => (
            <Marker
              latitude={user.latitude}
              longitude={user.longitude}
              onClick={this.handleMapClick}
              captureClick
              key={user.id}
            >
              <Avatar src={user.avatar_url} alt={user.login} />
            </Marker>
          ))}
        </MapGL>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div style={{ width: 320 }}>
            <h2>
Adicionar novo Usuário
            </h2>
            <Form onSubmit={this.handleOnSubmit}>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Digite o usuário do GitHub"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
              />
              <button type="submit">
Adicionar
              </button>
            </Form>
          </div>
        </Modal>
        <ToastContainer />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
