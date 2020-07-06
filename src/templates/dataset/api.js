import React, { Component } from "react";
import { Link } from "gatsby";
import Loader from "react-loader-advanced";
import LoadingSpin from "react-loading-spin";
import {
  ApiDocs,
  Title,
  Organization
} from "@civicactions/data-catalog-components";
import Layout from "../../components/Layout";
import config from "../../assets/config";
import orgs from "../../assets/publishers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import backend from "../../services/backend";

class ApiDocsSpecific extends Component {
  state = {
    item: {
      title: "",
      description: "",
    },
    show: true,
    pageSize: 10
  };

  async fetchData() {
    const id = this.props.pageContext.dataset.identifier;
    const { data } = await backend.get(
      "/metastore/schemas/dataset/items/" + id + "/docs"
    );
    const item = Object.assign(data);

    this.setState({
      item,
      show: false
    });
  }

  componentDidMount() {
    this.fetchData();
    if (typeof window !== undefined) {
      this.setState({ window: true });
    }
  }

  

  render() {
    console.log(process.env.GATSBY_API_URL +
      "/metastore/schemas/dataset/items/" +
      this.props.pageContext.dataset.identifier +
      "/docs")
    const { item, show } = this.state;
    const orgName = "publisher" in this.props.pageContext.dataset
      && this.props.pageContext.dataset.publisher.data
      ? this.props.pageContext.dataset.publisher.data.name : "";

    const orgDetails = orgs.filter(org => orgName === org.name);
    const orgImage = orgDetails.length > 0 && orgDetails[0].imageUrl ? orgDetails[0].imageUrl : null;
    const orgDesc = orgDetails.length > 0 && orgDetails[0].description ? orgDetails[0].description : "";
    let renderOrg;
    if(orgDetails.length > 0 && orgDetails[0].imageUrl) {
      renderOrg = <Organization name={orgName} imageUrl={orgImage} description={orgDesc}/>;
    } else {
      renderOrg = <Organization name={orgName} description={orgDesc}/>;
    }

    return (
      <Layout path={this.props.path} title={item.title}>
        <div className={`dc-dataset-page ${config.container}`}>
          <div className="row">
            <div className="col-md-3 col-sm-12">
              {renderOrg}
              <div className="dc-block-wrapper">
                <FontAwesomeIcon
                  icon={['fas', 'arrow-left']}
                  size="1x"
                  aria-hidden="true"
                  role="presentation"
                />
                Back to the{" "}
                <Link
                  to={`dataset/${this.props.pageContext.dataset.identifier}`}
                >
                  dataset
                </Link>
                .
              </div>
            </div>
            <div className="results-list col-md-9 col-sm-12">
              <h1>{this.props.pageContext.dataset.title}</h1>
              {this.state.window && (
                <Loader
                  backgroundStyle={{ backgroundColor: "#f9fafb" }}
                  foregroundStyle={{ backgroundColor: "#f9fafb" }}
                  show={show}
                  message={
                    <LoadingSpin width={"3px"} primaryColor={"#007BBC"} />
                  }
                >
                  <ApiDocs
                    endpoint={
                      process.env.GATSBY_API_URL +
                      "/metastore/schemas/dataset/items/" +
                      this.props.pageContext.dataset.identifier +
                      "/docs"
                    }
                  />
                </Loader>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default ApiDocsSpecific;
