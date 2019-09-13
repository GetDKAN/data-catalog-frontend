import React, {useState, useEffect} from 'react';
import { Link } from "gatsby";
import { 
  Resource,
  Title,
  Text,
  Organization,
  NavBar
} from "@civicactions/data-catalog-components";
import Layout from "../../components/Layout";
import links from "../../assets/menu.json";


const Dataset = ({pageContext, path}) => {
  const [hasWindow, checkForWindow] = useState(false);
  useEffect(() => {
    if (window !== undefined) {
      checkForWindow(true);
    }
  }, []);

  const { dataset } = pageContext;
  const orgName = 'publisher' in dataset && dataset.publisher.data ? dataset.publisher.data.name : "";
  const orgImage = 'publisher' in dataset && dataset.publisher.data ? dataset.publisher.data.image : "";
  const orgDesc = 'publisher' in dataset && dataset.publisher.data ? dataset.publisher.data.description : "";
  const theme = 'theme' in dataset ? dataset.theme : [];
  const Topic = () => {
    return theme.map(t => {
      const topicLink = `<a className="theme" href="../search?theme=${t.data}">${t.data}</a>`;
      return <Text key={t.data} value={topicLink} />;
    });
  };
  return(
    <Layout path={path} title={dataset.title}>
      <NavBar
        navItems={links.main.map((item) => (<Link activeClassName="active" to={item.url}>{item.label}</Link>))}
        customClasses="container-fluid main-navigation"  
      />
      <div className="dataset-page container-fluid">
        <div className="row">
          <div className="col-md-3 col-sm-12 p-5">
            <Organization name={orgName} image={orgImage} description={orgDesc} />
            <div className="block-wrapper">
              The information on this page is also available via the <Link to={`dataset/${dataset.identifier}/api`}>API</Link>.
            </div>
          </div>
          <div className="results-list col-md-9 col-sm-12 p-5">
            <Title title={dataset.title} />
            <div className="theme-wrapper">
              { Topic() }
            </div>
            <Text value={dataset.description} />
            {hasWindow &&
            <>
              {dataset.distribution.map((item) => (
                <Resource
                  key={item.identifier}
                  datasetId={dataset.identifier}
                  data={item}
                  includeInfoTable={true}
                  infoTableTitle="What's in this Dataset?"
                />
              ))}
              </>
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dataset;
