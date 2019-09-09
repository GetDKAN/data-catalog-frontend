import React, { Component } from "react";
import { Link } from "gatsby";
import Loader from "react-loader-advanced";
import LoadingSpin from "react-loading-spin";
import { 
  Title,
  Text,
  Organization,
  FileDownload,
  NavBar,
  Table } from "interra-data-catalog-components";
import Tags from "../../components/Tags";
import Layout from "../../components/Layout";
import DataTable from "../../components/DataTable";
import backend from "../../services/backend";
import datastore from "../../services/datastore";
import links from "../../assets/menu.json";

class Dataset extends Component {

  state = {
    item: {
      title: "",
      description: "",
      publisher: {
        name: "Example Publisher"
      }
    },
    resources: [],
    show: true,
    pageSize: 10
  }

  async pageChange(page) {
    let index=0;
    const resources = Object.assign([], this.state.resources);
    resources[index].values = [];
    this.setState({
     resources
    });
    const resource = this.state.resources[index] ? this.state.resources[index] : [];
    const res = new datastore['file'](resource.downloadURL);
    await res.fetch();
    const queried = await res.query(resource.filter,null,null, resource.pageSize, page, resource.sort);
    resources[index].values = queried;
    resources[index].page = page;
    this.setState({
      resources
    });
  }

  async filterChange(filter) {
    let index=0;
    const resources = Object.assign([], this.state.resources);
    resources[index].values = [];
    this.setState({
      resources
    });
    const resource = this.state.resources[index] ? this.state.resources[index] : [];
    const res = new datastore['file'](resource.downloadURL);
    await res.fetch();
    const queried = await res.query(filter,null,null, resource.pageSize, resource.page, resource.sort);
    resource.pages = Math.ceil(queried.length / resource.pageSize);
    resources[index].values = queried;
    resources[index].filter = filter;
    this.setState({
      resources
    });
  }

  async sortedChange(sort) {
    let index=0;
    const resources = Object.assign([], this.state.resources);
    resources[index].values = [];
    this.setState({
      resources
    });
    const resource = this.state.resources[index] ? this.state.resources[index] : [];
    const res = new datastore['file'](resource.downloadURL);
    await res.fetch();
    const queried = await res.query(resource.filter,null,null, resource.pageSize, resource.page, sort);
    resources[index].values = queried;
    resources[index].sort = sort;
    this.setState({
      resources
    });
  }

  async fetchData() {
    const id = this.props.pageContext.dataset.identifier;
    const { data } = await backend.get("/dataset/" + id + "?values=both");
    const item = Object.assign(data);

    this.setState({
      item,
      show: false
    });
    const resources = item.distribution;
    this.setState({
      resources
    });
    Promise.all(resources.map(async (resource) => {
      

      if ('format' in resource.data ) {
        const file = new datastore['file'](resource.data.downloadURL);
        const data = await file.fetch();
        
        resource.pageSize = 10;
        resource.pages = Math.ceil(data.length / this.state.pageSize);
        resource.values = data;
        resource.page = 0;
        resource.columns = this.prepareColumns(data[0]);
      }
      return resource;
    })).then((resources) => {
      this.setState({
        resources
      });
    })
  }

  prepareColumns(item) {
    return Object.keys(item).map((i) => {
      return {
        Header: i,
        accessor: i
      }
    });
  }

  componentDidMount() {
    this.fetchData();
    if(typeof window !== undefined) {
      this.setState({window: true})
    }
  }

  render() {
    const { item, show, resources } = this.state;
    const orgName = 'publisher' in item && item.publisher.data ? item.publisher.data.name : "";
    const orgImage = 'publisher' in item && item.publisher.data ? item.publisher.data.image : "";
    const orgDesc = 'publisher' in item && item.publisher.data ? item.publisher.data.description : "";
    const tag = 'keyword' in item ? item.keyword : [];
    const theme = 'theme' in item ? item.theme : [];
    const num_rows = 'datastore_statistics' in item ? item.datastore_statistics.rows : "";
    const num_columns = 'datastore_statistics' in item ? item.datastore_statistics.columns : "";
    const columns = 'columns' in item ? item.columns : [];

    const Resources = () => {
      return resources.map((r, i) => {

        const values = 'values' in r.data ? r.data.values : [];
        const data = values.slice(0,10);
        const columns = 'columns' in r ? r.data.columns : [];
        const dataKey = `${r.data.title}-${r.data.format}`;
        const show = values.length > 0 ? false : true;
        const pageSize = values.length === 0 || values.length > 10 ? 10  : values.length + 1;
        const pages = r.data.pages;
        if ('format' in r.data ) {
          return <div key={dataKey}>
              <FileDownload resource={r.data} key={r.title}/>
              <strong>Rows:</strong> {values.length}
                <DataTable
                  index={i}
                  key={dataKey}
                  loading={show}
                  pageSize={pageSize}
                  pages={pages}
                  data={data}
                  sortedChange={this.sortedChange.bind(this)}
                  filterChange={this.filterChange.bind(this)}
                  pageChange={this.pageChange.bind(this)}
                  columns={columns} />
            </div>;
        }
        return <div key={dataKey}><FileDownload resource={r.data} key={r.title}/></div>;
      });
    };

    const Topic = () => {
      return theme.map(t => {
        const topicLink = `<a className="theme" href="../search?theme=${t.data}">${t.data}</a>`;
        return <Text key={t.data} value={topicLink} />;
      });
    };

    // Process content for 'What's in this Dataset' table.
    const labelsT1 = {
      rows: {
        label: num_rows
      }
    }
    const valuesT1 = {
      rows: num_columns
    }

    // Process content for 'Columns in this Dataset' table.
    const labelsT2 = {}
    const valuesT2 = {}

    columns.forEach((value, index) => {
      labelsT2[index] = {"label": value}
      valuesT2[index] = "String"
    })

    // Process content for 'Additional Information' table.
    const labelsT3 = {}
    const valuesT3 = {}

    if (orgName && orgName.length > 0) {
      labelsT3.publisher = { label: "Publisher" };
      valuesT3.publisher = orgName;
    }
    if ('identifier' in item && item.identifier) {
      labelsT3.identifier = { label: "Identifier" };
      valuesT3.identifier = item.identifier;
    }
    if ('issued' in item && item.issued) {
      labelsT3.issued = { label: "Issued" };
      valuesT3.issued = item.issued;
    }
    if ('modified' in item && item.modified) {
      labelsT3.modified = { label: "Last Update" };
      valuesT3.modified = item.modified;
    }
    if ('contactPoint' in item && item.contactPoint && item.contactPoint.fn) {
      labelsT3.contact = { label: "Contact" };
      valuesT3.contact = item.contactPoint.fn;
    }
    if ('contactPoint' in item && item.contactPoint && item.contactPoint.hasEmail) {
      labelsT3.email = { label: "Contact E-mail" };
      valuesT3.email = `<a href="${item.contactPoint.hasEmail}">${item.contactPoint.hasEmail}</a>`;
    }
    if ('accessLevel' in item && item.accessLevel) {
      labelsT3.access = { label: "Public Access Level"};
      valuesT3.access = item.accessLevel;
    }
    if ('landingPage' in item && item.landingPage) {
      labelsT3.homepage = { label: "Homepage URL"};
      valuesT3.homepage = `<a href="${item.landingPage}">${item.landingPage}</a>`;
    }

    return (
      <Layout path={this.props.path} title={item.title}>
        <NavBar
          navItems={links.main.map((item) => (<Link activeClassName="active" to={item.url}>{item.label}</Link>))}
          customClasses="container-fluid main-navigation"  
        />
        <div className="dataset-page container-fluid">
          <div className="row">
            <div className="col-md-3 col-sm-12 p-5">
              <Organization name={orgName} image={orgImage} description={orgDesc} />
              <div className="block-wrapper">
                The information on this page is also available via the <Link to={`dataset/${item.identifier}/api`}>API</Link>.
              </div>
            </div>
            <div className="results-list col-md-9 col-sm-12 p-5">
              <Title title={item.title} />
              {this.state.window &&
                <Loader backgroundStyle={{backgroundColor: "#f9fafb"}} foregroundStyle={{backgroundColor: "#f9fafb"}} show={show} message={<LoadingSpin width={"3px"} primaryColor={"#007BBC"}/>}>
                  <div className="theme-wrapper">
                    { Topic() }
                  </div>
                  <Text value={item.description} />
                  { Resources() }
                  <Tags tags={tag} path="/search?keyword=" />
                  <Table configuration={labelsT1} data={valuesT1} title="What's in this Dataset?" th1="Rows" th2="Columns" tableclass="table-one" />
                  <Table configuration={labelsT2} data={valuesT2} title="Columns in this Dataset" th1="Column Name" th2="Type" tableclass="table-two" />
                  <Table configuration={labelsT3} data={valuesT3} tableclass="table-three" />
                </Loader>
              }
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Dataset;
