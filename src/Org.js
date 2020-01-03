import React, { Component } from "react";
import Search from "./Search";
import backend from "./services/backend";
import Loader from "react-loader-advanced";
import LoadingSpin from "react-loading-spin";

const url = process.env.PUBLIC_URL;

class Home extends Component {
  state = {
    item: {},
    selectedFacets: [],
    show: true
  };

  async fetchData() {
    const { data } = await backend.get(
      "/collections/organization/" + this.props.id + ".json"
    );
    const item = Object.assign(data);
    const selectedFacets = [["org", item.name]];

    this.setState({
      selectedFacets,
      item,
      show: false
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { item, show, selectedFacets } = this.state;
    const searchUrl = `${url}/organization/${this.props.id}`;
    const styles = {
      margin: "30px 30px 0px 30px",
      padding: "0px"
    };

    return (
      <>
        <Navbar className="sa" />
        wtf
        <Loader
          hideContentOnLoad
          backgroundStyle={{ backgroundColor: "#f9fafb" }}
          foregroundStyle={{ backgroundColor: "#f9fafb" }}
          show={show}
          message={
            <LoadingSpin width={"3px"} size="30px" primaryColor={"#007BBC"} />
          }
        >
          <div className="page container-fluid" style={styles}>
            <div className="org-info">
              <h1>{item.name}</h1>
              <p>{item.description}</p>
            </div>
          </div>
          <Search selectedFacets={selectedFacets} url={searchUrl} />
        </Loader>
      </>
    );
  }
}

export default Home;
