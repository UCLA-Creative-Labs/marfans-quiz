const query = `
  query {
    quizCollection(limit: 5) {
      items {
        title
        projects
        questions
      }
    }
  }
`;

const fetch = require('node-fetch');
const {writeFileSync, mkdirSync, existsSync} = require('fs');

const url = `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}`;

const query_contentful = async () => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CONTENTFUL_DELIVERY_API}`,
    },
    body: JSON.stringify({query}),
  });
  const {data} = await res.json();
  if (!existsSync(`${__dirname}/../public`)) {
    mkdirSync(`${__dirname}/../public`);
  }
  writeFileSync(`${__dirname}/../public/data.json`, JSON.stringify(data.quizCollection.items[0], null, 2));
};

query_contentful();