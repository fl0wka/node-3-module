document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;
    remove(id).then(event.target.closest('li').remove());
  }
  if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id;
    const title = event.target.closest('li').firstChild.textContent.trim();
    const newTitle = prompt('Enter a new value', title);
    if (newTitle !== null && newTitle !== title) {
      edit(id, newTitle).then(
        (event.target.closest('li').firstChild.textContent = newTitle)
      );
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' });
}
async function edit(id, title) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
}
