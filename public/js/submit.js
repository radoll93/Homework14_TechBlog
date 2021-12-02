
const dashboardAddHandler = async (event) => {
    event.preventDefault();

    console.log('click')
  
    const topic = document.querySelector('#topic-title').value.trim();
    const content = document.querySelector('#topic-content').value.trim();
    const date = document.querySelector('#topic-date').value.trim();
  
    if (topic && content && date) {
      const response = await fetch('/dashboard/add', {
        method: 'POST',
        body: JSON.stringify({ topic, content, date }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
  document
    .querySelector('.addtopic')
    .addEventListener('submit', dashboardAddHandler);
  