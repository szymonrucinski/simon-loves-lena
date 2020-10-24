const handleImageUpload = event => {
    const files = event.target.files
    const formData = new FormData()
    formData.append('myFile', files[0])
  
    fetch('/http://192.168.8.175:3000/brighter/23', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.path)
    })
    .catch(error => {
      console.error(error)
    })
  }
  
  document.querySelector('#fileUpload').addEventListener('change', event => {
    handleImageUpload(event)
  })