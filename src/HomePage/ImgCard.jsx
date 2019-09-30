import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class ImgCard extends React.Component {
  state = {
    deleting: false
  };
  onDelete = () => {
    this.setState({
      deleting: true
    });
    this.props.onDelete(this.props.imgCard);
  };
  render() {
    const { imgCard } = this.props;
    return (
      // <div className="card" style={{width: "18rem"}}>
      //   <img className="card-img-top" src="" alt="Card image cap" />
      //   <div className="card-body">
      //     <h5 className="card-title">Card title</h5>
      //     <p className="card-text">
      //       Some quick example text to build on the card title and make up the
      //       bulk of the card's content.
      //     </p>
      //     <a href="#" className="btn btn-primary">
      //       Go somewhere
      //     </a>
      //   </div>
      // </div>
      <Card style={{ width: '300px', margin: '10px' }}>
        <Card.Img variant="top" src={imgCard.url} />
        <Card.Body>
          <Card.Title>{imgCard.description}</Card.Title>
          {/* <Card.Text>
            {imgCard.description}
          </Card.Text> */}
          <Button
            variant="danger"
            onClick={this.onDelete}
            disabled={this.state.deleting}
          >
            {this.state.deleting === true && (
              <span
                className="spinner-border spinner-border-sm mr-2"
                role="status"
                aria-hidden="true"
              />
            )}
            Delete
          </Button>
          <Button
            variant="warning"
            onClick={() => this.props.onDownload(this.props.imgCard)}
            className="mx-3"
          >
            Download
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default ImgCard;
