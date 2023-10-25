const fetchData =async ()=> {
    try {
      const response = await fetch("http://localhost:9000/videos?tags_like=javascript&tags_like=react");
      const data = await response.json(); 
      return data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  

  fetchData()
  .then((data) => {
     const sortedVideo = data.sort((a,b)=> parseFloat(b.views)-parseFloat(a.views))
     console.table(sortedVideo)
  });
  