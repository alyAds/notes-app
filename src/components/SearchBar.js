import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      inputClass: '',
    };

    this.onSearchNoteEventHandler = this.onSearchNoteEventHandler.bind(this);
  }

  onSearchNoteEventHandler(e) {
    const keyword = e.target.value
    const inputClass = (keyword.length > 0) ? 'filled' : '';

    this.setState({
      search: keyword,
      inputClass: inputClass,
    });

    this.props.filterNotes(keyword);
  }

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          value={this.state.search}
          className={this.state.inputClass}
          onChange={this.onSearchNoteEventHandler}
          placeholder="Search note..."
        />
        <div className="close-search">
          <a href="/#" className="btn-close-search">
            <svg viewBox="0 0 42 42" fill="none">
              <path
                d="M19.32 30.24C13.272 30.24 8.39999 25.368 8.39999 19.32C8.39999 13.272 13.272 8.39999 19.32 8.39999C25.368 8.39999 30.24 13.272 30.24 19.32C30.24 25.368 25.368 30.24 19.32 30.24ZM19.32 10.08C14.196 10.08 10.08 14.196 10.08 19.32C10.08 24.444 14.196 28.56 19.32 28.56C24.444 28.56 28.56 24.444 28.56 19.32C28.56 14.196 24.444 10.08 19.32 10.08Z"
                fill="black"
              />
              <path
                d="M27.4529 26.2643L34.9961 33.8075L33.8083 34.9952L26.2651 27.452L27.4529 26.2643Z"
                fill="black"
              />
            </svg>
          </a>
        </div>
      </div>
    );
  }
}

export default SearchBar;
