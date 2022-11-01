import React from "react";
import PropTypes from "prop-types";

const path = (object) => {
  const path1 = !object.props.archived
    ? "M21.706 5.291L18.707 2.293C18.6143 2.19996 18.5041 2.12617 18.3828 2.07589C18.2614 2.0256 18.1313 1.99981 18 2H6C5.86866 1.99981 5.73857 2.0256 5.61724 2.07589C5.4959 2.12617 5.38571 2.19996 5.293 2.293L2.294 5.291C2.20057 5.38368 2.12647 5.49398 2.076 5.61552C2.02553 5.73705 1.9997 5.8674 2 5.999V19C2 20.103 2.897 21 4 21H20C21.103 21 22 20.103 22 19V5.999C22.0003 5.8674 21.9745 5.73705 21.924 5.61552C21.8735 5.49398 21.7994 5.38368 21.706 5.291V5.291ZM6.414 4H17.586L18.585 4.999H5.415L6.414 4ZM4 19V6.999H20L20.002 19H4Z"
    : "M21.706 5.292L18.707 2.293C18.6143 2.19996 18.5041 2.12617 18.3828 2.07589C18.2614 2.0256 18.1313 1.99981 18 2H6C5.86866 1.99981 5.73857 2.0256 5.61724 2.07589C5.4959 2.12617 5.38571 2.19996 5.293 2.293L2.294 5.292C2.20057 5.38468 2.12647 5.49498 2.076 5.61652C2.02553 5.73805 1.9997 5.8684 2 6V19C2 20.103 2.897 21 4 21H20C21.103 21 22 20.103 22 19V6C22.0003 5.8684 21.9745 5.73805 21.924 5.61652C21.8735 5.49498 21.7994 5.38468 21.706 5.292ZM6.414 4H17.586L18.586 5H5.414L6.414 4ZM4 19V7H20L20.002 19H4Z";
  const path2 = !object.props.archived
    ? "M15 12H9V10H7V14H17V10H15V12Z"
    : "M7 14H10V17H14V14H17L12 9L7 14Z";

  return { path1, path2 };
}

class ArchiveIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = path(this);

    this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState === this.state) {
      this.setState(path(this));
    }
  }

  onArchiveNoteHandler(e, id) {
    if (!this.props.archived) {
      this.setState({
        path1:
          "M21.706 5.292L18.707 2.293C18.6143 2.19996 18.5041 2.12617 18.3828 2.07589C18.2614 2.0256 18.1313 1.99981 18 2H6C5.86866 1.99981 5.73857 2.0256 5.61724 2.07589C5.4959 2.12617 5.38571 2.19996 5.293 2.293L2.294 5.292C2.20057 5.38468 2.12647 5.49498 2.076 5.61652C2.02553 5.73805 1.9997 5.8684 2 6V19C2 20.103 2.897 21 4 21H20C21.103 21 22 20.103 22 19V6C22.0003 5.8684 21.9745 5.73805 21.924 5.61652C21.8735 5.49498 21.7994 5.38468 21.706 5.292ZM6.414 4H17.586L18.586 5H5.414L6.414 4ZM4 19V7H20L20.002 19H4Z",
        path2: "M7 14H10V17H14V14H17L12 9L7 14Z",
      });

      this.props.onArchiveNote(e, id, true)
    } else {
      this.setState({
        path1:
          "M21.706 5.291L18.707 2.293C18.6143 2.19996 18.5041 2.12617 18.3828 2.07589C18.2614 2.0256 18.1313 1.99981 18 2H6C5.86866 1.99981 5.73857 2.0256 5.61724 2.07589C5.4959 2.12617 5.38571 2.19996 5.293 2.293L2.294 5.291C2.20057 5.38368 2.12647 5.49398 2.076 5.61552C2.02553 5.73705 1.9997 5.8674 2 5.999V19C2 20.103 2.897 21 4 21H20C21.103 21 22 20.103 22 19V5.999C22.0003 5.8674 21.9745 5.73705 21.924 5.61552C21.8735 5.49398 21.7994 5.38368 21.706 5.291V5.291ZM6.414 4H17.586L18.585 4.999H5.415L6.414 4ZM4 19V6.999H20L20.002 19H4Z",
        path2: "M15 12H9V10H7V14H17V10H15V12Z",
      });
      
      this.props.onArchiveNote(e, id, false)
    }
  }

  render() {
    return (
        <a href="/#" onClick={(e) => this.onArchiveNoteHandler(e, this.props.id)}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d={this.state.path1} />
            <path d={this.state.path2} />
          </svg>
        </a>
      );
  }
}

ArchiveIcon.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onArchiveNote: PropTypes.func.isRequired,
}

export default ArchiveIcon;