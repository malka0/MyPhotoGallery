import Head from 'next/head'


function Home() {
  const user = true;  

  // React.useEffect(() => {
  //   getProducts();
  // }, []);

  // async function getProducts() {
  //   const url = "http://localhost:3000/api/products";
  //   const response = await axios.get(url);
  //   console.log(response.data);
  // }

  // TODO: home screen with users latest public photos

  return (
    <>
    </>
  )
}

Home.getInitialProps = ({ res }) => {
  if (res) {
    res.writeHead(307, {
      Location: '/photos'
    });
    res.end();
  }
  return {};
};

export default Home;
