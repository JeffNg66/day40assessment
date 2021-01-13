const fetch = require('node-fetch')
const withQuery = require('with-query').default

const endPoint = 'https://developers.onemap.sg/commonapi/search'

oneMapSearch = async (req, res) => {
  const searchStr = req.query['q']
  const url = withQuery(
    endPoint,
    {
      searchVal: searchStr,
      returnGeom: 'Y',
      getAddrDetails: 'Y',
    }
  )

  let result = await fetch(url)
  
  try {
    result = await result.json()
    // console.info('result', result)
    res.status(200).send(result)
  } catch (err) {
    // console.error('Error ', err)
    res.error('Error',err)
    // return Promise.reject(e)
  }
}

const oneMap = {
  oneMapSearch: oneMapSearch,
};

module.exports = oneMap;