
const commentAddHandlebar = async (event) => {
    event.preventDefault();

  
    const comment = document.querySelector('#addcomment').value.trim();

    if (comment) {
      const response = await fetch('/topic/:id', {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: { 'Content-Type': 'application/json' },
      })

      if(response.ok) {
        document.location.replace(`${document.URL}/comment`)
      }

    }
  };
  
  document
    .querySelector('.submit')
    .addEventListener('click', commentAddHandlebar);
  