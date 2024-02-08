import React from "react";
import PropTypes from "prop-types";

class CustomComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
    };

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth });
  }

  render() {
    const { title1, title2, title3, textColor1, textColor2, alignItems, display1, display2 } = this.props;
    const { windowWidth } = this.state;

    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: windowWidth < 769 ? "center" : alignItems || "start",
      gap: "3",
    };

    const titleStyle1 = {
      textTransform: "uppercase",
      fontSize: "14px",
      fontWeight: "600",
      color: textColor1,
      display: display1,
    };

    const titleStyle2 = {
      textTransform: "uppercase",
      fontSize: "14px",
      fontWeight: "600",
      color: textColor2,
    };

    const headingStyle = {
      fontWeight: "bold",
      fontSize: "18px",
      color: textColor2,
      display: display2,
    };

    return (
      <div style={containerStyle} className="custom-component">
        <span style={titleStyle1}>{title1}</span>
        <h1 style={headingStyle}>{title2}</h1>
        <h1 style={headingStyle}>{title3}</h1>
      </div>
    );
  }
}

CustomComponent.propTypes = {
  title1: PropTypes.string.isRequired,
  title2: PropTypes.string.isRequired,
  title3: PropTypes.string.isRequired,
  textColor1: PropTypes.string.isRequired,
  textColor2: PropTypes.string.isRequired,
  alignItems: PropTypes.string,
  display1: PropTypes.string,
  display2: PropTypes.string,
};

export default CustomComponent;
