import React from "react";
import "./Section.css";

class Section extends React.Component {
  render() {
    let heading;
    if(this.props.titleH1) {
      heading = <h1 className="section__title">{this.props.titleH1}</h1>
    } else {
      heading = <h2 className="section__title section__title_size_mini">{this.props.titleH2}</h2>
    }

    return (
      <section className="section">
        <div className="section__heading">
          {heading}
          <p className="section__subtitle">
            {this.props.subtitle}
          </p>
        </div>
        {this.props.children}
      </section>
    );
  }
}

export default Section;