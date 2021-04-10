const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// GraphQL スキーマ 言語 を 記述 し て スキーマ を 構築 する
const schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int):[Int]
  } 
`);


// リゾルバ 関数
// リゾルバ 関数 とは 特定 の フィールド の データ を 返す 関数（ メソッド） で あり、 実際 の データ 操作 を 行う 部分
const root = {
  rollDice: ({numDice,numSides}) => {
    let output = [];
    for(var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides  || 6)));
    }
    return output;
  }
};

// Express で サーバー を 立て ます
// graphiql: true と し た ので、 GraphQL を 利用 できる

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000); 
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
