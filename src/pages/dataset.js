import React, { useState } from 'react';
import { DynamicContent } from '@civicactions/data-catalog-components';
import Dataset from '../templates/dataset';
import Layout from '../components/Layout';

const DatasetPage = (props) => {
  const { pageContext } = props;
  const [pageTitle, setPageTitle] = useState(pageContext.dataset ? pageContext.dataset.title : "")
  const id = pageContext.dataset && pageContext.dataset.identifier ? pageContext.dataset.identifier : props['*'];
  return (
    <Layout path={props.path} title={pageTitle}>
      <DynamicContent
        item={pageContext.dataset}
        apiPrefix={`${process.env.DYNAMIC_API_URL}/metastore/schemas/dataset/items`}
        apiSuffix="?show-reference-ids"
        id={id}
        dynamicCallback={(x) => setPageTitle(x.title)}
        updateVar="modified"
      >
        <Dataset />
      </DynamicContent>
    </Layout>
  )
}

export default DatasetPage