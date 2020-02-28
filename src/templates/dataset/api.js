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
import backend from "../../services/backend";

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
  };

  async fetchData() {
    const id = this.props.pageContext.item.identifier;
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
    const { item, show } = this.state;
    const orgName =
      "publisher" in item && item.publisher.data
        ? item.publisher.data.name
        : "";
    const orgImage =
      "publisher" in item && item.publisher.data
        ? item.publisher.data.image
        : "";
    const orgDesc =
      "publisher" in item && item.publisher.data
        ? item.publisher.data.description
        : "";

    return (
      <Layout path={this.props.path} title={item.title}>
        <div className="dataset-page container-fluid">
          <div className="row">
            <div className="col-md-3 col-sm-12 p-5">
              <Organization
                name={orgName}
                image={orgImage}
                description={orgDesc}
              />
              <div className="block-wrapper">
                Back to the{" "}
                <Link
                  to={`dataset/${this.props.pageContext.dataset.identifier}`}
                >
                  dataset
                </Link>
                .
              </div>
            </div>
            <div className="results-list col-md-9 col-sm-12 p-5">
              <Title title={this.props.pageContext.dataset.title} />
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
