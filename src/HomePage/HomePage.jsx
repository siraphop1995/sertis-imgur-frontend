import React from 'react';
import ImgCard from './ImgCard';
import axios from 'axios';
import decode from 'jwt-decode';
import './HomePage.css';
import withAuth from '../components/withAuth';
import HelperMethods from '../Helpers/HelperMethods';

class HomePage extends React.Component {
  Helper = new HelperMethods();
  constructor(props) {
    super(props);

    let token = localStorage.getItem('token');
    var { user } = decode(token);

    this.state = {
      imgCards: [],
      previewImage: require('../Assets/preview.png'),
      selectedImage: undefined,
      user: user,
      uploading: false
    };
  }

  componentDidMount() {
    const { user } = this.state;
    axios
      .get('/user_images/' + user._id)
      .then(res => {
        // console.log(res)
        this.setState({
          imgCards: res.data
        });
      })
      .catch(err => {
        this.Helper.errorHandler(err)
      });
  }

  handleSelect(e) {
    let imageFormObj = new FormData();

    imageFormObj.append('imageName', 'test name');
    imageFormObj.append('description', 'test desc');
    imageFormObj.append('imageData', e.target.files[0]);

    this.setState({
      previewImage: URL.createObjectURL(e.target.files[0]),
      selectedImage: imageFormObj
    });
  }

  handleUpload = async () => {
    try {
      if (typeof this.state.selectedImage !== 'undefined') {
        this.setState({
          uploading: true
        });
        let imageData = Object.assign(this.state.selectedImage);
        const response = await axios.post(
          '/uploadhandler/' + this.state.user._id,
          imageData
        );

        let imgCards = [...this.state.imgCards];
        let newCards = imgCards.concat(response.data);
        this.setState({
          previewImage: require('../Assets/preview.png'),
          selectedImage: undefined,
          imgCards: newCards,
          uploading: false
        });
      } else {
        alert('no image selected');
      }
    } catch (err) {
      this.Helper.errorHandler(err);    }
  };

  handleDelete = async imageData => {
    try {
      const res = await axios.post(
        '/deletehandler',
        imageData
      );
      const newCards = this.state.imgCards.filter(i => i._id !== res.data.id);
      this.setState({
        imgCards: newCards
      });
    } catch (err) {
      this.Helper.errorHandler(err);    }
  };

  handleDownload = async imageData => {
    try {
      console.log(imageData);
      axios({
        url: '/downloadhandler/' + imageData.gcloudObject, //your url
        method: 'GET',
        responseType: 'blob' // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', imageData.gcloudObject);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      });
    } catch (err) {
      this.Helper.errorHandler(err);    }
  };

  render() {
    return (
      <div className="home-container">
        <h3 className="mt-5">Welcome</h3>
        <div className="row align-items-center">
          <img
            src={this.state.previewImage}
            alt="upload"
            className="process_image"
            style={{ width: '150px', margin: '10px' }}
          />
          <div className="col-6">
            <input
              type="file"
              className="process_upload-btn"
              onChange={e => this.handleSelect(e)}
            />
            <button
              onClick={this.handleUpload}
              className="btn btn-primary btn-block my-3 col-6"
              style={{ width: '110px' }}
              disabled={this.state.uploading}
            >
              {this.state.uploading === true && (
                <span
                  className="spinner-border spinner-border-sm mr-2"
                  role="status"
                  aria-hidden="true"
                />
              )}
              Upload
            </button>
          </div>
        </div>
        <div>
          <div className="row">
            {this.state.imgCards.map(imgCard => (
              <ImgCard
                key={imgCard._id}
                imgCard={imgCard}
                onDelete={this.handleDelete}
                onDownload={this.handleDownload}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export const AuthHomePage = withAuth(HomePage);
