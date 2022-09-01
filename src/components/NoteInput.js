import React from "react";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastSaved: '',
      formGroupClassTitle: "form-group tooltip",
      formGroupClassBody: "form-group tooltip",
      titleTooltipRemainder: `Judul Catatan tersisa 50 karakter`,
      bodyTooltipRemainder: `Isi Catatan tersisa 1000 karakter`,
    }

    this.onChangeTitleHandler = this.onChangeTitleHandler.bind(this);
    this.onChangeBodyHandler = this.onChangeBodyHandler.bind(this);
    this.onFocusTitleHandler = this.onFocusTitleHandler.bind(this);
    this.onBlurTitleHandler = this.onBlurTitleHandler.bind(this);
    this.onFocusBodyHandler = this.onFocusBodyHandler.bind(this);
    this.onBlurBodyHandler = this.onBlurBodyHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.createdAt !== this.props.createdAt) {
      const lastSaved = (this.props.createdAt) ? "Last saved at " + this.props.createdAt : "";
      this.setState({
        lastSaved,
        titleTooltipRemainder: `Judul Catatan tersisa ${50 - this.props.title.length} karakter`,
        bodyTooltipRemainder: `Isi Catatan tersisa ${1000 - this.props.body.length} karakter`,
      });
    }
  }

  onChangeTitleHandler(e) {
    const titleLength = e.target.value.length;
    let formGroupClassTitle = this.state.formGroupClassTitle.includes("form-group-keyup") ? this.state.formGroupClassTitle : "form-group tooltip form-group-keyup"
    let remainder = 50 - titleLength;
    remainder = (remainder < 1) ? "Maksimal 50 karakter!" : `Judul Catatan tersisa ${remainder} karakter`

    this.setState((prevState) => {
      return {
        formGroupClassTitle,
        titleTooltipRemainder: remainder
      }
    })

    this.props.onChangeTitle(e);
  }

  onChangeBodyHandler(e) {
    const bodyLength = e.target.value.length;
    let formGroupClassBody = this.state.formGroupClassBody.includes("form-group-keyup") ? this.state.formGroupClassBody : "form-group tooltip form-group-keyup"
    let remainder = 1000 - bodyLength;
    remainder = (remainder < 1) ? "Maksimal 1000 karakter!" : `Isi Catatan tersisa ${remainder} karakter`

    this.setState((prevState) => {
      return {
        formGroupClassBody,
        bodyTooltipRemainder: remainder
      }
    })

    this.props.onChangeBody(e);
  }

  onBlurTitleHandler(e) {
    this.setState({formGroupClassTitle: "form-group tooltip"})
  }

  onFocusTitleHandler(e) {
    let formGroupClassTitle = this.state.formGroupClassTitle.includes("form-group-keyup") ? this.state.formGroupClassTitle : "form-group tooltip form-group-keyup"

    this.setState({
      formGroupClassTitle,
      titleTooltipRemainder: `Judul Catatan tersisa ${50 - e.target.value.length} karakter`,
    });
  }

  onBlurBodyHandler(e) {
    this.setState({formGroupClassBody: "form-group tooltip"})
  }

  onFocusBodyHandler(e) {
    let formGroupClassBody = this.state.formGroupClassBody.includes("form-group-keyup") ? this.state.formGroupClassBody : "form-group tooltip form-group-keyup"
    
    this.setState({
      formGroupClassBody,
      bodyTooltipRemainder: `Judul Catatan tersisa ${1000 - e.target.value.length} karakter`,
    });
  }

  render() {
    return (
      <form
        action="/#"
        method="post"
        className="form-add-note"
        onSubmit={this.props.onSubmitNote}
      >
        <div className={this.state.formGroupClassTitle} data-tooltip={this.state.titleTooltipRemainder}>
          <input
            type="text"
            id="form-note-title"
            value={this.props.title}
            onChange={this.onChangeTitleHandler}
            onFocus={this.onFocusTitleHandler}
            onBlur={this.onBlurTitleHandler}
            maxLength="50"
            placeholder="Judul Catatan"
            className="form-input form-input-title"
            autoComplete="off"
          />
        </div>
        <div className={this.state.formGroupClassBody} data-tooltip={this.state.bodyTooltipRemainder}>
          <textarea
            id="form-note-body"
            value={this.props.body}
            onChange={this.onChangeBodyHandler}
            onFocus={this.onFocusBodyHandler}
            onBlur={this.onBlurBodyHandler}
            maxLength="1000"
            className="form-input form-input-body"
            cols="100"
            rows="9"
            placeholder="Isi catatan..."
          />
        </div>
        <div className="form-footer">
          <div className="form-auto-save">{this.state.lastSaved}</div>
          <div className="action-save">
            <button>
              <span>Save &nbsp;</span>
              <svg viewBox="0 0 32 32" fill="none">
                <path
                  d="M1.5 1.5V31H19.9142L31 19.9142V1.5H1.5ZM3.5 3.5H29V17H17V29H3.5V3.5ZM19.0858 29H19V19H29V19.0858L19.0858 29Z"
                  fill="#fff"
                />
                <path d="M13 18V13H18V11H13V6H11V11H6V13H11V18H13Z" fill="#fff" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default NoteInput;
