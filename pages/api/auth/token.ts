
export default async function handler(req, res) {
  // const options = {
  //   method: 'POST',
  //   url: 'https://dev-vnl-k5hs.us.auth0.com/oauth/token',
  //   headers: {'content-type': 'application/x-www-form-urlencoded'},
  //   data: new URLSearchParams({
  //     grant_type: 'client_credentials',
  //     client_id: process.env.AUTH0_CLIENT_ID<String>,
  //     client_secret: process.env.AUTH0_CLIENT_SECRET,
  //     audience: process.env.AUTH0_AUDIENCE,
  //   })
  // };

  //const data = JSON.stringify()

    //console.log(data);

  const result = await fetch(`https://dev-vnl-k5hs.us.auth0.com/oauth/token`, {
    method: 'POST',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    body: `audience=${process.env.AUTH0_AUDIENCE}&grant_type=client_credentials&client_id=${process.env.AUTH0_CLIENT_ID}&client_secret=${process.env.AUTH0_CLIENT_SECRET}`
  }).then(async (response) => {
    return response.json();
  }).catch(function (error) {
    console.error(error);
    return error;
  });

  res.send(result)
}
