
const dashboardAddHandler = async (event) => {
    event.preventDefault();

  
    const topic = document.querySelector('#topic-title').value.trim();
    const content = document.querySelector('#topic-content').value.trim();
  
    if (topic && content) {
      const response = await fetch('/dashboard/add', {
        method: 'POST',
        body: JSON.stringify({ topic, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to add.');
      }
    }
  };
  
  document
    .querySelector('.addtopic')
    .addEventListener('submit', dashboardAddHandler);
  