import React, { Component } from "react";
import { Link } from "gatsby";
import Loader from "react-loader-advanced";
import LoadingSpin from "react-loading-spin";
import { Title, Organization } from "interra-data-catalog-components";
import Layout from "../../components/Layout";
import backend from "../../services/backend";
import ApiDocs from "../../components/ApiDocs";

class ApiDocsSpecific extends Component {

  state = {
    item: {
      title: "",
      description: "",
      publisher: {
        name: "Example Publisher"
      }
    },
    show: true,
    pageSize: 10
  }

  async fetchData() {
    const id = this.props.pageContext.dataset.identifier;
    const { data } = await backend.get("/dataset/" + id + "?values=both");
    const item = Object.assign(data);

    this.setState({
      item,
      show: false
    });
  }

  componentDidMount() {
    this.fetchData();
    if(typeof window !== undefined) {
      this.setState({window: true})
    }
  }

  render() {
    const { item, show } = this.state;
    const orgName = 'publisher' in item && item.publisher.data ? item.publisher.data.name : "";
    const orgImage = 'publisher' in item && item.publisher.data ? item.publisher.data.image : "";
    const orgDesc = 'publisher' in item && item.publisher.data ? item.publisher.data.description : "";

    return (
      <Layout path={this.props.path} title={item.title}>
        <div className="dataset-page container-fluid">
          <div className="row">
            <div className="col-md-3 col-sm-12 p-5">
              <Organization name={orgName} image={orgImage} description={orgDesc} />
              <div className="block-wrapper">
                Back to the <Link to={`dataset/${item.identifier}`}>dataset</Link>.
              </div>
            </div>
            <div className="results-list col-md-9 col-sm-12 p-5">
              <Title title={item.title} />
              {this.state.window &&
              <Loader backgroundStyle={{backgroundColor: "#f9fafb"}} foregroundStyle={{backgroundColor: "#f9fafb"}} show={show} message={<LoadingSpin width={"3px"} primaryColor={"#007BBC"}/>}>
                <ApiDocs uuid={this.props.pageContext.dataset.identifier} />
              </Loader>
              }
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default ApiDocsSpecific;
