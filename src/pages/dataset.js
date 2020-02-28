import React, { useState } from 'react';
// import { DynamicContent } from '@civicactions/data-catalog-components';
import DatasetTemplate from '../templates/dataset';
import Layout from '../components/Layout';
import DynamicContent from '../upstream/DynamicContent';

const Dataset = (props) => {
  const { pageContext } = props;
  const [pageTitle, setPageTitle] = useState(pageContext.item ? pageContext.item.title : "")
  const id = pageContext.item && pageContext.item.identifier ? pageContext.item.identifier : props['*'];
  return (
    <Layout path={props.path} title={pageTitle}>
      <DynamicContent
        item={pageContext.item}
        apiPrefix={`${process.env.DYNAMIC_API_URL}/metastore/schemas/dataset/items`}
        apiSuffix="?show-reference-ids"
        id={id}
        dynamicCallback={(x) => setPageTitle(x.title)}
        updateContent={true}
        buildDate={pageContext.buildDate}
      >
        <DatasetTemplate />
      </DynamicContent>
    </Layout>
  )
}

export default Dataset